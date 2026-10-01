import './style.css'
import { firebaseReady } from './firebase.js'

const app = document.querySelector('#app')
app.dataset.firebaseReady = String(firebaseReady)
const boyImage = `${import.meta.env.BASE_URL}scene/boy-full.webp`
const girlImage = `${import.meta.env.BASE_URL}scene/girl-full.webp`

app.innerHTML = `
  <div class="site-shell">
    <header class="site-header">
      <a class="brand" href="#top" aria-label="Orxan Qadirli — başlanğıca qayıt">
        <span class="brand-mark" aria-hidden="true">&lt;/&gt;</span>
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
          <div class="character character-boy">
            <img class="character-body" src="${boyImage}" alt="" width="1024" height="1536" fetchpriority="high" />
            <img class="character-head" src="${boyImage}" alt="" width="1024" height="1536" fetchpriority="high" />
          </div>
          <div class="character character-girl">
            <img class="character-body" src="${girlImage}" alt="" width="1024" height="1536" fetchpriority="high" />
            <img class="character-head" src="${girlImage}" alt="" width="1024" height="1536" fetchpriority="high" />
          </div>
          <div class="scene-vignette"></div>
        </div>

        <div class="hero-content">
          <p class="hero-kicker"><span aria-hidden="true">//</span> AI mühəndisliyi · şəxsi portfolio</p>
          <h1 id="hero-title">AI mühəndisliyi.<br />Kod səviyyəsində.</h1>
          <p class="hero-description">Burada AI mühəndisliyi işlərimi, sınaqdan keçirdiyim açıq mənbə repolarını və texniki qeydlərimi paylaşacağam.</p>
          <a class="primary-action" href="#portfolio">İşlərə bax <span class="action-arrow" aria-hidden="true">↗</span></a>
          <div class="terminal" aria-label="Portfolionun GitHub repozitoriyasını klonlama əmri">
            <div class="terminal-title"><span class="terminal-led" aria-hidden="true"></span> terminal <span>~/portfolio</span></div>
            <div class="terminal-command"><span class="terminal-prompt" aria-hidden="true">$</span><code>git clone https://github.com/OrkhanGadirli/my-portfolio.git</code><span class="terminal-caret" aria-hidden="true"></span></div>
          </div>
        </div>

        <div class="hero-bottom">
          <span>ORXAN.QADIRLI / AI ENGINEERING</span>
          <a href="#portfolio">Aşağı sürüşdür <span class="scroll-arrow" aria-hidden="true">↓</span></a>
        </div>
      </section>

      <nav class="route-strip" aria-label="Bölmələrə sürətli keçid">
        <a href="#portfolio"><span>01 /</span> Öz işlərim <b aria-hidden="true">↗</b></a>
        <a href="#repolar"><span>02 /</span> Repo sınaqları <b aria-hidden="true">↗</b></a>
        <a href="#meqaleler"><span>03 /</span> Məqalələr <b aria-hidden="true">↗</b></a>
        <a href="#beledciler"><span>04 /</span> Bələdçilər <b aria-hidden="true">↗</b></a>
      </nav>

      <section class="intro-section content-section" id="portfolio" aria-labelledby="portfolio-title">
        <div class="section-index">01 / PORTFOLIO</div>
        <div class="section-main">
          <h2 id="portfolio-title">Öz işlərim</h2>
          <p>Bu bölmədə öz layihələrimi problem, yanaşma və işləmə qaydası ilə təqdim edəcəyəm. Başqalarının repoları ayrıca sınaq bölməsində qalacaq.</p>
          <div class="section-note">// Layihə qeydləri əlavə olunacaq</div>
        </div>
      </section>

      <section class="content-section feature-section" id="repolar" aria-labelledby="repos-title">
        <div class="section-index">02 / REPO LAB</div>
        <div class="section-main">
          <h2 id="repos-title">Sınadığım repolar</h2>
          <p>GitHub-da sınaqdan keçirdiyim başqalarına aid layihələr. Hər birində orijinal müəllifə keçid, quraşdırma qeydləri və nə işə yaradığını yazacağam.</p>
          <span class="text-link">// Repo qeydləri hazırlanır</span>
        </div>
        <span class="feature-glyph" aria-hidden="true">↗</span>
      </section>

      <section class="content-section feature-section" id="meqaleler" aria-labelledby="articles-title">
        <div class="section-index">03 / WRITING</div>
        <div class="section-main">
          <h2 id="articles-title">Məqalələr</h2>
          <p>AI, kod və infrastruktur mövzularında texniki məqalələr. Hər yazının ayrıca səhifəsi, şəkilli üz qabığı və oxunaqlı kod nümunələri olacaq.</p>
          <span class="text-link">// İlk məqalə hazırlanır</span>
        </div>
        <span class="feature-glyph" aria-hidden="true">✳</span>
      </section>

      <section class="content-section feature-section" id="beledciler" aria-labelledby="guides-title">
        <div class="section-index">04 / GUIDES</div>
        <div class="section-main">
          <h2 id="guides-title">Vizual bələdçilər</h2>
          <p>“Lokal server necə qurulur?” kimi suallara vizual cavablar. Əmrləri, mərhələləri və nəticəni animasiya ilə göstərəcəyəm.</p>
          <span class="text-link">// Bələdçilər hazırlanır</span>
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
