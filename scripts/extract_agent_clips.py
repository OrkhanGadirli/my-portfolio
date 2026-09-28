"""Extract source-quality audio and scene clips from the supplied reference video."""

import sys
from pathlib import Path

import av
import numpy as np


source = Path(sys.argv[1])
output = Path(sys.argv[2])
output.mkdir(parents=True, exist_ok=True)

# Remux the AAC stream unchanged, preserving the original sound.
with av.open(str(source)) as original, av.open(str(output / "original-audio.m4a"), "w") as audio_only:
    input_stream = original.streams.audio[0]
    output_stream = audio_only.add_stream_from_template(input_stream)
    for packet in original.demux(input_stream):
        if packet.dts is None:
            continue
        packet.stream = output_stream
        audio_only.mux(packet)

# Decode once at the source rate for accurate scene boundaries.
parts = []
with av.open(str(source)) as original:
    input_stream = original.streams.audio[0]
    resampler = av.AudioResampler(format="s16p", layout="stereo", rate=44100)
    for frame in original.decode(input_stream):
        for converted in resampler.resample(frame):
            parts.append(converted.to_ndarray())
    for converted in resampler.resample(None):
        parts.append(converted.to_ndarray())
samples = np.concatenate(parts, axis=1)

scenes = [
    ("agent-care", 5.0, 11.0),
    ("agent-working", 11.0, 16.0),
    ("agent-phone", 15.3, 20.1),
    ("agent-chaos", 19.5, 24.0),
    ("agent-ending", 25.0, 31.1),
]

for name, start, end in scenes:
    clip = samples[:, int(start * 44100):int(end * 44100)]
    target = output / f"{name}.mp3"
    with av.open(str(target), "w", format="mp3") as container:
        stream = container.add_stream("libmp3lame", rate=44100)
        stream.bit_rate = 96000
        stream.layout = "stereo"
        for offset in range(0, clip.shape[1], 1152):
            part = clip[:, offset:offset + 1152]
            if part.shape[1] < 1152:
                part = np.pad(part, ((0, 0), (0, 1152 - part.shape[1])))
            frame = av.AudioFrame.from_ndarray(part, format="s16p", layout="stereo")
            frame.sample_rate = 44100
            for packet in stream.encode(frame):
                container.mux(packet)
        for packet in stream.encode(None):
            container.mux(packet)
    print(f"{name}: {start:.1f}-{end:.1f}s, {target.stat().st_size} bytes")

# Center-panned narration and music cancel in the side signal. This is an
# alternate effect-focused mix, not a guaranteed isolated character voice.
side = (samples[0].astype(np.float32) - samples[1].astype(np.float32)) / 2
side = side[int(5.0 * 44100):int(24.0 * 44100)]
peak = np.quantile(np.abs(side), 0.999)
if peak > 0:
    side = np.clip(side * (25000 / peak), -32768, 32767)
side = side.astype(np.int16)
target = output / "agent-effects-side.mp3"
with av.open(str(target), "w", format="mp3") as container:
    stream = container.add_stream("libmp3lame", rate=44100)
    stream.bit_rate = 96000
    stream.layout = "mono"
    for offset in range(0, len(side), 1152):
        part = side[offset:offset + 1152]
        if len(part) < 1152:
            part = np.pad(part, (0, 1152 - len(part)))
        frame = av.AudioFrame.from_ndarray(part.reshape(1, -1), format="s16p", layout="mono")
        frame.sample_rate = 44100
        for packet in stream.encode(frame):
            container.mux(packet)
    for packet in stream.encode(None):
        container.mux(packet)
print(f"agent-effects-side: 5.0-24.0s, {target.stat().st_size} bytes")
