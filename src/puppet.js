const symbols = ['⌘', '✦', '✎', '◒', '✉', '❀', '✧', '✓']

export function puppetMarkup(agent, index) {
  const base = import.meta.env.BASE_URL
  const family = agent.family
  return `<span class="puppet-rig" data-mood="calm" aria-hidden="true">
    <span class="rig-shadow"></span>
    <span class="rig-leg rig-leg-left"><img src="${base}puppet/${family}-leg.webp" alt="" draggable="false"></span>
    <span class="rig-leg rig-leg-right"><img src="${base}puppet/${family}-leg.webp" alt="" draggable="false"></span>
    <span class="rig-arm rig-arm-left"><img src="${base}puppet/${family}-arm.webp" alt="" draggable="false"></span>
    <span class="rig-arm rig-arm-right"><img src="${base}puppet/${family}-arm.webp" alt="" draggable="false"></span>
    <span class="rig-body"><img src="${base}puppet/${family}-body.webp" alt="" draggable="false"></span>
    <span class="rig-head">
      <img src="${base}puppet/${family}-head.webp" alt="" draggable="false">
      <svg class="rig-face" viewBox="0 0 160 100" focusable="false" aria-hidden="true">
        <ellipse class="rig-cheek" cx="60" cy="72" rx="9" ry="5"/>
        <ellipse class="rig-cheek" cx="100" cy="72" rx="9" ry="5"/>
        <g class="rig-eye rig-eye-left"><ellipse cx="64" cy="62" rx="4.3" ry="5.7"/><circle cx="62.8" cy="60.3" r="1.3"/></g>
        <g class="rig-eye rig-eye-right"><ellipse cx="96" cy="62" rx="4.3" ry="5.7"/><circle cx="94.8" cy="60.3" r="1.3"/></g>
        <path class="rig-mouth rig-mouth-calm" d="M74 76 Q80 82 86 76"/>
        <path class="rig-mouth rig-mouth-happy" d="M72 75 Q80 88 88 75 Q80 79 72 75"/>
        <ellipse class="rig-mouth rig-mouth-curious" cx="80" cy="78" rx="3.6" ry="4.7"/>
      </svg>
    </span>
    <span class="rig-symbol" aria-hidden="true">${symbols[index]}</span>
  </span>`
}
