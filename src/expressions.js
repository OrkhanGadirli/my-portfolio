const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

export function setExpression(host, mood = 'happy', hold = 1800) {
  const rig = host.querySelector('.puppet-rig')
  if (!rig || reducedMotion.matches) return
  rig.dataset.mood = mood
  if (mood === 'happy' && !host.classList.contains('is-traveling')) {
    rig.classList.remove('is-reacting')
    void rig.offsetWidth
    rig.classList.add('is-reacting')
    window.setTimeout(() => rig.classList.remove('is-reacting'), 650)
  }
  window.clearTimeout(rig.expressionTimer)
  rig.expressionTimer = window.setTimeout(() => { rig.dataset.mood = 'calm' }, hold)
}

export function startExpressions() {
  document.querySelectorAll('.puppet-rig').forEach((rig) => {
    const blink = () => {
      if (!document.hidden && !reducedMotion.matches && !rig.closest('.is-paused')) {
        rig.classList.add('is-blinking')
        window.setTimeout(() => rig.classList.remove('is-blinking'), 140)
      }
      window.setTimeout(blink, 2400 + Math.random() * 4300)
    }
    const glance = () => {
      if (!document.hidden && !reducedMotion.matches && !rig.closest('.is-paused')) {
        rig.style.setProperty('--look-x', `${(Math.random() * 2.4 - 1.2).toFixed(1)}px`)
        rig.style.setProperty('--look-y', `${(Math.random() * 1.5 - .75).toFixed(1)}px`)
        if (Math.random() < .33) setExpression(rig.parentElement, 'curious', 900 + Math.random() * 900)
      }
      window.setTimeout(glance, 3100 + Math.random() * 4000)
    }
    window.setTimeout(blink, 700 + Math.random() * 3900)
    window.setTimeout(glance, 1200 + Math.random() * 2800)
  })
}
