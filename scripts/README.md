# Local audio extraction

`extract_agent_clips.py` takes a user-provided video and writes an unchanged AAC audio track plus scene clips. It requires Python with `av` and `numpy`.

```powershell
python scripts/extract_agent_clips.py "C:\path\to\video.mp4" audio-clips
```

The `audio-clips/` directory is ignored by Git. Scene clips retain the video's music and ambience; `agent-effects-side.mp3` is an experimental stereo-side mix that reduces centered sound, not a guaranteed isolated character voice.
