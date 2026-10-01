import './style.css'
import { firebaseReady } from './firebase.js'

const app = document.querySelector('#app')
app.dataset.firebaseReady = String(firebaseReady)
const boyImage = `${import.meta.env.BASE_URL}scene/boy.webp`

app.innerHTML = `
  <div class="site-shell">
    <header class="site-header">
      <a class="brand" href="#top" aria-label="Orxan Qadirli — başlanğıca qayıt">
        <span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span>
        <span>Orxan Qadirli</span>
      </a>
      <nav class="primary-nav" aria-label="Əsas menyu">
        <a href="#portfolio">Portfolio</a>
        <a href="#repolar">Sınadığım repolar</a>
        <a href="#meqaleler">Məqalələr</a>
        <a href="#beledciler">Vizual bələdçilər</a>
      </nav>
      <a class="header-link" href="https://github.com/OrkhanGadirli" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
    </header>

    <main id="top">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-scene" aria-hidden="true">
          <div class="scene-plate"></div>
          <div class="scene-stars"></div>
          <div class="scene-meteor"></div>
          <div class="scene-haze"></div>
          <div class="character">
            <img class="character-body" src="${boyImage}" alt="" width="1024" height="1536" fetchpriority="high" />
            <img class="character-head" src="${boyImage}" alt="" width="1024" height="1536" fetchpriority="high" />
          </div>
          <div class="scene-vignette"></div>
        </div>

        <div class="hero-content">
          <p class="hero-kicker">Orxan Qadirlinin şəxsi saytı</p>
          <h1 id="hero-title">Fikirlərin<br />açıldığı yer.</h1>
          <p class="hero-description">İşlərim, sınadığım açıq mənbə layihələri, yazılarım və addım-addım vizual bələdçilərim burada bir araya gələcək.</p>
          <a class="primary-action" href="#portfolio">Saytı kəşf et <span aria-hidden="true">↘</span></a>
        </div>

        <div class="hero-bottom">
          <span>Portfolio / 2026</span>
          <a href="#portfolio">Aşağı sürüşdür <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section class="intro-section content-section" id="portfolio" aria-labelledby="portfolio-title">
        <div class="section-index">Portfolio</div>
        <div class="section-main">
          <h2 id="portfolio-title">Bu sayt nə üçündür?</h2>
          <p>Hazırladığım işləri və öyrəndiklərimi bir yerdə toplamaq üçün. Portfolio hissəsində yalnız öz layihələrim yer alacaq. Digər müəlliflərin repolarını isə ayrıca bölmədə göstərəcəyəm.</p>
          <div class="section-note">Layihələrin məzmunu və təqdimatı əlavə olunacaq.</div>
        </div>
      </section>

      <section class="content-section feature-section" id="repolar" aria-labelledby="repos-title">
        <div class="section-index">Ayrıca kolleksiya</div>
        <div class="section-main">
          <h2 id="repos-title">Sınadığım repolar</h2>
          <p>GitHub-da bəyənib sınaqdan keçirdiyim başqalarına aid layihələr. Hər repo üçün orijinal müəllifə keçid və nə işə yaradığı barədə öz qeydim olacaq.</p>
          <span class="text-link">Repo seçimləri hazırlanır</span>
        </div>
        <span class="feature-glyph" aria-hidden="true">↗</span>
      </section>

      <section class="content-section feature-section" id="meqaleler" aria-labelledby="articles-title">
        <div class="section-index">Yazılar</div>
        <div class="section-main">
          <h2 id="articles-title">Məqalələr</h2>
          <p>Şəkilli üz qabığından açılan, rahat oxunan tam məqalələr üçün yer. İlk yazıları paylaşanda burada görünəcəklər.</p>
          <span class="text-link">Məqalələr hazırlanır</span>
        </div>
        <span class="feature-glyph" aria-hidden="true">✳</span>
      </section>

      <section class="content-section feature-section" id="beledciler" aria-labelledby="guides-title">
        <div class="section-index">Addım-addım</div>
        <div class="section-main">
          <h2 id="guides-title">Vizual bələdçilər</h2>
          <p>“Lokal server necə qurulur?” kimi suallara animasiyalı, aydın cavablar. Bələdçini açanda prosesi mərhələ-mərhələ görmək mümkün olacaq.</p>
          <span class="text-link">Bələdçilər hazırlanır</span>
        </div>
        <span class="feature-glyph" aria-hidden="true">⌘</span>
      </section>
    </main>

    <footer class="site-footer">
      <span>© ${new Date().getFullYear()} Orxan Qadirli</span>
      <a href="https://github.com/OrkhanGadirli" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
    </footer>
  </div>
`

const hero = document.querySelector('.hero')
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

if (!reducedMotion.matches && window.matchMedia('(pointer: fine)').matches) {
  let frame = 0
  hero.addEventListener('pointermove', (event) => {
    if (frame) return
    frame = requestAnimationFrame(() => {
      const bounds = hero.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      hero.style.setProperty('--pointer-x', `${x * 10}px`)
      hero.style.setProperty('--pointer-y', `${y * 8}px`)
      frame = 0
    })
  })
  hero.addEventListener('pointerleave', () => {
    hero.style.setProperty('--pointer-x', '0px')
    hero.style.setProperty('--pointer-y', '0px')
  })
}

const scene = document.querySelector('.hero-scene')
const observer = new IntersectionObserver(([entry]) => {
  scene.classList.toggle('is-paused', !entry.isIntersecting)
}, { threshold: 0 })
observer.observe(hero)

if (!reducedMotion.matches) {
  let scrollFrame = 0
  window.addEventListener('scroll', () => {
    if (scrollFrame) return
    scrollFrame = requestAnimationFrame(() => {
      const progress = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight))
      hero.style.setProperty('--scroll-progress', progress)
      scrollFrame = 0
    })
  }, { passive: true })
}
