const agents = [
  { name: 'Kodçu', image: 'coder', task: 'Kod yazır', detail: 'Yeni ideyaları işlək hissələrə çevirir.' },
  { name: 'Bələdçi', image: 'guide', task: 'Zəng edir', detail: 'Komandanın suallarını cavablandırır.' },
  { name: 'Araşdırmaçı', image: 'researcher', task: 'Qeydlər aparır', detail: 'Maraqlı fikirləri tapıb dəftərinə yazır.' },
  { name: 'Rəssam', image: 'artist', task: 'Rəng seçir', detail: 'Səhnəyə yeni rənglər və formalar gətirir.' },
  { name: 'Elçi', image: 'messenger', task: 'Məktub daşıyır', detail: 'Xəbərləri bir iş masasından o birinə aparır.' },
  { name: 'Bağban', image: 'gardener', task: 'Gülə baxır', detail: 'Emalatxananın balaca bitkilərinə qulluq edir.' },
]

const spots = [
  [17, 38], [50, 34], [83, 38],
  [17, 76], [50, 73], [83, 76],
]

export const studioMarkup = `
  <section id="studio" class="studio" aria-labelledby="studio-title">
    <div class="studio-heading">
      <div>
        <p class="eyebrow">Balaca emalatxana / canlı səhnə</p>
        <h2 id="studio-title">Hamı iş başında<span>.</span></h2>
        <p>Altı balaca agent burada öz işi ilə məşğuldur. Birinə toxun, nə etdiyini gör.</p>
      </div>
      <button class="motion-toggle" type="button" aria-pressed="false">Hərəkəti dayandır <span aria-hidden="true">Ⅱ</span></button>
    </div>
    <div class="studio-scene" aria-label="Altı agentin hərəkət etdiyi emalatxana">
      <div class="studio-window studio-window-one" aria-hidden="true"></div>
      <div class="studio-window studio-window-two" aria-hidden="true"></div>
      <div class="studio-shelf" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="studio-rug" aria-hidden="true"></div>
      <div class="studio-table studio-table-left" aria-hidden="true"></div>
      <div class="studio-table studio-table-right" aria-hidden="true"></div>
      ${agents.map((agent, index) => `
        <button class="studio-agent" type="button" data-agent="${index}" style="--x:${spots[index][0]}%;--y:${spots[index][1]}%;--delay:${index * -.38}s" aria-label="${agent.name}: ${agent.task}">
          <span class="agent-task" aria-hidden="true">${agent.task}</span>
          <span class="agent-picture"><img src="${import.meta.env.BASE_URL}mascots/${agent.image}.webp" alt="" draggable="false" /></span>
          <span class="agent-name" aria-hidden="true">${agent.name}</span>
        </button>`).join('')}
    </div>
    <p class="studio-note" id="agent-note" aria-live="polite">Emalatxanada hər agentin öz balaca işi var.</p>
  </section>
`

export function startStudio() {
  const studio = document.querySelector('.studio')
  const scene = studio.querySelector('.studio-scene')
  const buttons = [...scene.querySelectorAll('.studio-agent')]
  const toggle = studio.querySelector('.motion-toggle')
  const note = studio.querySelector('#agent-note')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let step = 0
  let timer
  let visible = false
  let paused = reducedMotion.matches

  const move = () => {
    step = (step + 1) % spots.length
    buttons.forEach((button, index) => {
      const [x, y] = spots[(index + step) % spots.length]
      button.style.setProperty('--x', `${x}%`)
      button.style.setProperty('--y', `${y}%`)
      button.classList.add('is-traveling')
    })
    window.setTimeout(() => buttons.forEach((button) => button.classList.remove('is-traveling')), 3100)
  }

  const schedule = () => {
    window.clearInterval(timer)
    if (visible && !paused && !reducedMotion.matches) timer = window.setInterval(move, 6500)
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
    schedule()
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
    schedule()
  })

  if (paused) {
    scene.classList.add('is-paused')
    toggle.setAttribute('aria-pressed', 'true')
    toggle.textContent = 'Hərəkət cihaz ayarında söndürülüb'
    toggle.disabled = true
  }

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    schedule()
  }, { threshold: 0.1 })
  observer.observe(scene)
}
