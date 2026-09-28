import { agents, characterMarkup } from './characters.js'

const desktopSpots = [
  [12, 28], [36, 27], [63, 27], [88, 28],
  [13, 54], [38, 53], [62, 53], [87, 54],
  [12, 80], [37, 79], [63, 79], [88, 80],
]
const mobileSpots = [
  [18, 17], [50, 17], [82, 17],
  [18, 39], [50, 39], [82, 39],
  [18, 61], [50, 61], [82, 61],
  [18, 83], [50, 83], [82, 83],
]
const starts = [0, 2, 3, 5, 6, 8, 9, 11]

export const studioMarkup = `
  <section id="studio" class="studio" aria-labelledby="studio-title">
    <div class="studio-heading">
      <div>
        <p class="eyebrow">Balaca emalatxana / canlı səhnə</p>
        <h2 id="studio-title">Hamı iş başında<span>.</span></h2>
        <p>Altı mərcan köməkçiyə ChatGPT üçün düşündüyüm iki yeni dost qoşuldu: nanə rəngli Fikir və firuzəyi Yoxlayıcı. Hər biri öz yolunu seçir.</p>
      </div>
      <button class="motion-toggle" type="button" aria-pressed="false">Hərəkəti dayandır <span aria-hidden="true">Ⅱ</span></button>
    </div>
    <div class="studio-scene" aria-label="Səkkiz agentin sərbəst gəzdiyi emalatxana">
      <div class="studio-window studio-window-one" aria-hidden="true"></div>
      <div class="studio-window studio-window-two" aria-hidden="true"></div>
      <div class="studio-shelf" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="studio-rug" aria-hidden="true"></div>
      <div class="studio-table studio-table-left" aria-hidden="true"></div>
      <div class="studio-table studio-table-right" aria-hidden="true"></div>
      ${agents.map((agent, index) => {
        const [x, y] = desktopSpots[starts[index]]
        return `<button class="studio-agent" type="button" data-agent="${index}" data-facing="right" style="--x:${x}%;--y:${y}%;--duration:3s" aria-label="${agent.name}: ${agent.task}">
          <span class="agent-task" aria-hidden="true">${agent.task}</span>
          <span class="agent-picture">${characterMarkup(agent)}</span>
          <span class="agent-name" aria-hidden="true">${agent.name}</span>
        </button>`
      }).join('')}
    </div>
    <p class="studio-note" id="agent-note" aria-live="polite">Bir agentə toxun, nə etdiyini gör.</p>
  </section>
`

export function startStudio(onMotionChange = () => {}) {
  const studio = document.querySelector('.studio')
  const scene = studio.querySelector('.studio-scene')
  const buttons = [...scene.querySelectorAll('.studio-agent')]
  const toggle = studio.querySelector('.motion-toggle')
  const note = studio.querySelector('#agent-note')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const places = [...starts]
  const nextTimers = new Array(agents.length)
  const moving = agents.map(() => false)
  let visible = false
  let paused = reducedMotion.matches

  const spots = () => window.matchMedia('(max-width: 600px)').matches ? mobileSpots : desktopSpots
  const clearNext = () => nextTimers.forEach(window.clearTimeout)
  const canMove = () => visible && !paused && !reducedMotion.matches

  const schedule = (index) => {
    window.clearTimeout(nextTimers[index])
    if (canMove() && !moving[index]) nextTimers[index] = window.setTimeout(() => move(index), 1800 + Math.random() * 4800)
  }

  const move = (index) => {
    if (!canMove()) return
    const points = spots()
    const occupied = new Set(places)
    const from = points[places[index]]
    const free = points.map((_, spot) => spot).filter((spot) => {
      if (occupied.has(spot)) return false
      const candidate = points[spot]
      const dx = Math.abs(candidate[0] - from[0])
      const dy = Math.abs(candidate[1] - from[1])
      return (dx < 3 && dy < 29) || (dy < 3 && dx < 35)
    })
    if (!free.length) return schedule(index)

    const target = free[Math.floor(Math.random() * free.length)]
    const to = points[target]
    const distance = Math.hypot((to[0] - from[0]) * scene.clientWidth / 100, (to[1] - from[1]) * scene.clientHeight / 100)
    const duration = Math.max(2200, Math.min(6200, distance / 88 * 1000))
    const button = buttons[index]
    places[index] = target
    moving[index] = true
    button.dataset.facing = to[0] < from[0] ? 'left' : 'right'
    button.style.setProperty('--duration', `${duration}ms`)
    button.style.setProperty('--x', `${to[0]}%`)
    button.style.setProperty('--y', `${to[1]}%`)
    button.classList.add('is-traveling')
    window.setTimeout(() => {
      moving[index] = false
      button.classList.remove('is-traveling')
      schedule(index)
    }, duration)
  }

  const refresh = () => {
    clearNext()
    if (canMove()) agents.forEach((_, index) => schedule(index))
  }

  const syncLayout = () => {
    const points = spots()
    buttons.forEach((button, index) => {
      button.style.setProperty('--x', `${points[places[index]][0]}%`)
      button.style.setProperty('--y', `${points[places[index]][1]}%`)
    })
  }

  buttons.forEach((button, index) => button.addEventListener('click', () => {
    const agent = agents[index]
    note.textContent = `${agent.name}: ${agent.detail}`
    buttons.forEach((item) => item.classList.toggle('is-selected', item === button))
  }))

  toggle.addEventListener('click', () => {
    paused = !paused
    toggle.setAttribute('aria-pressed', String(paused))
    toggle.innerHTML = paused ? 'Hərəkəti başlat <span aria-hidden="true">▶</span>' : 'Hərəkəti dayandır <span aria-hidden="true">Ⅱ</span>'
    scene.classList.toggle('is-paused', paused)
    onMotionChange(paused)
    refresh()
  })

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      paused = true
      scene.classList.add('is-paused')
      toggle.setAttribute('aria-pressed', 'true')
      toggle.textContent = 'Hərəkət cihaz ayarında söndürülüb'
      toggle.disabled = true
    } else {
      toggle.disabled = false
      toggle.innerHTML = 'Hərəkəti başlat <span aria-hidden="true">▶</span>'
    }
    onMotionChange(paused)
    refresh()
  })

  if (paused) {
    scene.classList.add('is-paused')
    toggle.setAttribute('aria-pressed', 'true')
    toggle.textContent = 'Hərəkət cihaz ayarında söndürülüb'
    toggle.disabled = true
  }

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    refresh()
  }, { threshold: 0.1 })
  observer.observe(scene)
  window.addEventListener('resize', syncLayout)
  syncLayout()
}
