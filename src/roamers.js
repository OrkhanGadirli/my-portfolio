import { agents, characterMarkup } from './characters.js'
import { setExpression } from './expressions.js'

const roamingIds = [0, 6, 4, 7, 1, 2, 3, 5]

export function startRoamers() {
  const layer = document.createElement('div')
  layer.className = 'roaming-layer'
  layer.setAttribute('aria-label', 'Səhifədə gəzən agentlər')
  layer.innerHTML = `
    ${roamingIds.map((index) => {
      const agent = agents[index]
      return `<button class="roamer" type="button" data-agent="${index}" data-facing="right" style="--idle-delay:${-index * .71}s" aria-label="${agent.name}: ${agent.task}">
        <span class="roamer-tip" aria-hidden="true">${agent.task}</span>
        ${characterMarkup(agent)}
      </button>`
    }).join('')}
    <button class="roam-control" type="button" aria-pressed="false">Agentləri gizlət</button>
  `
  document.querySelector('#app').append(layer)

  const movers = [...layer.querySelectorAll('.roamer')]
  const control = layer.querySelector('.roam-control')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const timers = movers.map(() => null)
  const positions = movers.map(() => ({ x: 0, y: 0 }))
  let onDuty = new Set()
  let dutyOffset = 0
  let rotationTimer
  let hidden = false
  let paused = reducedMotion.matches
  let studioVisible = false
  let conceptsVisible = false

  const isActive = (index) => {
    return onDuty.has(index) && !hidden && !studioVisible && !conceptsVisible && !paused && !reducedMotion.matches && !document.hidden
  }

  const bounds = () => ({
    xMin: window.innerWidth <= 600 ? 38 : 72,
    xMax: window.innerWidth - (window.innerWidth <= 600 ? 38 : 72),
    yMin: Math.round(window.innerHeight * .64),
    yMax: Math.round(window.innerHeight * .78),
  })

  const place = (index, x, y, duration = 0) => {
    const button = movers[index]
    button.style.setProperty('--roam-duration', `${duration}ms`)
    button.style.left = `${x}px`
    button.style.top = `${y}px`
    positions[index] = { x, y }
  }

  const chooseTarget = (index) => {
    const { xMin, xMax, yMin, yMax } = bounds()
    for (let attempt = 0; attempt < 20; attempt += 1) {
      const edge = Math.random() < .65
      const x = edge
        ? (Math.random() < .5 ? xMin + Math.random() * Math.min(140, (xMax - xMin) / 3) : xMax - Math.random() * Math.min(140, (xMax - xMin) / 3))
        : xMin + Math.random() * (xMax - xMin)
      const y = yMin + Math.random() * Math.max(20, yMax - yMin)
      const farFromSelf = Math.hypot(x - positions[index].x, y - positions[index].y) > 110
      const farFromOthers = [...onDuty].every((other) => other === index || Math.hypot(x - positions[other].x, y - positions[other].y) > (window.innerWidth <= 600 ? 80 : 130))
      if (farFromSelf && farFromOthers) return { x, y }
    }
    return { x: xMin + Math.random() * (xMax - xMin), y: yMin + Math.random() * (yMax - yMin) }
  }

  const schedule = (index, delay = 1400 + Math.random() * 3200) => {
    window.clearTimeout(timers[index])
    if (isActive(index)) timers[index] = window.setTimeout(() => walk(index), delay)
  }

  const walk = (index) => {
    if (!isActive(index)) return
    const button = movers[index]
    const target = chooseTarget(index)
    const distance = Math.hypot(target.x - positions[index].x, target.y - positions[index].y)
    const duration = Math.max(1400, Math.min(10000, distance / 75 * 1000))
    button.dataset.facing = target.x < positions[index].x ? 'left' : 'right'
    button.querySelector('.puppet-rig')?.style.setProperty('--look-x', `${target.x < positions[index].x ? -1.7 : 1.7}px`)
    button.style.setProperty('--step-duration', `${Math.max(.48, Math.min(.76, duration / distance * 48 / 1000)).toFixed(2)}s`)
    button.classList.remove('is-working')
    button.classList.add('is-traveling')
    place(index, target.x, target.y, duration)
    timers[index] = window.setTimeout(() => {
      button.classList.remove('is-traveling')
      button.classList.add('is-working')
      setExpression(button, Math.random() < .6 ? 'happy' : 'curious', 1800)
      schedule(index, 1800 + Math.random() * 3600)
    }, duration)
  }

  const refresh = () => {
    timers.forEach(window.clearTimeout)
    movers.forEach((_, index) => schedule(index, 500 + Math.random() * 1800))
  }

  const reposition = () => {
    const { xMin, xMax, yMin, yMax } = bounds()
    const anchors = [
      [.12, .70], [.88, .74], [.78, .68], [.22, .76],
      [.42, .73], [.65, .69], [.35, .77], [.58, .75],
    ]
    movers.forEach((button, index) => {
      const x = Math.min(xMax, Math.max(xMin, positions[index].x || window.innerWidth * anchors[index][0]))
      const y = Math.min(yMax, Math.max(yMin, positions[index].y || window.innerHeight * anchors[index][1]))
      button.classList.remove('is-traveling')
      place(index, x, y)
    })
  }

  movers.forEach((button, index) => button.addEventListener('click', () => {
    button.classList.add('is-speaking')
    setExpression(button, 'happy', 3500)
    button.querySelector('.roamer-tip').textContent = agents[roamingIds[index]].detail
    window.setTimeout(() => {
      button.classList.remove('is-speaking')
      button.querySelector('.roamer-tip').textContent = agents[roamingIds[index]].task
    }, 3500)
  }))

  const rotateDuty = () => {
    const count = window.innerWidth <= 600 ? 2 : 4
    onDuty = new Set(Array.from({ length: count }, (_, index) => (dutyOffset + index) % movers.length))
    dutyOffset = (dutyOffset + count) % movers.length
    movers.forEach((button, index) => button.classList.toggle('is-on-duty', onDuty.has(index)))
    refresh()
  }

  const scheduleRotation = () => {
    window.clearTimeout(rotationTimer)
    rotationTimer = window.setTimeout(() => {
      if (!hidden && !studioVisible && !conceptsVisible && !document.hidden) rotateDuty()
      scheduleRotation()
    }, 24000)
  }

  control.addEventListener('click', () => {
    hidden = !hidden
    layer.classList.toggle('roamers-hidden', hidden)
    control.setAttribute('aria-pressed', String(hidden))
    control.textContent = hidden ? 'Agentləri göstər' : 'Agentləri gizlət'
    refresh()
  })

  document.addEventListener('visibilitychange', refresh)
  window.addEventListener('resize', () => { reposition(); rotateDuty() })
  reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; refresh() })
  const studioObserver = new IntersectionObserver(([entry]) => {
    studioVisible = entry.isIntersecting
    layer.classList.toggle('roamers-in-showcase', studioVisible || conceptsVisible)
    refresh()
  }, { threshold: 0.1 })
  studioObserver.observe(document.querySelector('.studio-scene'))
  const conceptObserver = new IntersectionObserver(([entry]) => {
    conceptsVisible = entry.isIntersecting
    layer.classList.toggle('roamers-in-showcase', studioVisible || conceptsVisible)
    refresh()
  }, { threshold: 0.1 })
  conceptObserver.observe(document.querySelector('.gpt-concepts'))
  reposition()
  rotateDuty()
  scheduleRotation()

  return {
    setPaused(value) {
      paused = value
      movers.forEach((button) => button.classList.toggle('is-paused', value))
      refresh()
    },
  }
}
