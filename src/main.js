import './style.css'
import { firebaseReady, loadPublishedProjects } from './firebase.js'

document.querySelector('#app').innerHTML = `
  <main class="shell">
    <header class="topbar">
      <a class="wordmark" href="#top" aria-label="Orxan, başlanğıca keç">orxan<span>.</span></a>
      <span class="phase">Hazırlıq mərhələsi</span>
    </header>

    <section id="top" class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">Portfolio / ilkin quruluş</p>
        <h1 id="hero-title">Yeni bir yer<br /><em>qurulur.</em></h1>
        <p class="lead">Layihələrimi, iş tərzimi və hekayəmi burada paylaşacağam. Hazırda əsas texniki quruluşu və kiçik köməkçiləri hazırlayıram.</p>
        <a class="text-link" href="#projects">Layihə sahəsinə bax <span aria-hidden="true">↘</span></a>
      </div>
      <div class="mascot-stage" aria-label="İki animasiyalı, şirin köməkçi agent">
        <span class="stage-glow" aria-hidden="true"></span>
        <img class="mascot mascot-coder" src="${import.meta.env.BASE_URL}mascots/coder.png" alt="Noutbukla işləyən balaca köməkçi" />
        <img class="mascot mascot-guide" src="${import.meta.env.BASE_URL}mascots/guide.png" alt="Qulaqlıqla əl yelləyən balaca köməkçi" />
      </div>
    </section>

    <section id="projects" class="projects" aria-labelledby="projects-title">
      <div class="section-heading">
        <p class="eyebrow">Firebase / layihələr</p>
        <h2 id="projects-title">İşlərim</h2>
      </div>
      <div id="projects-list" class="projects-list" aria-live="polite">
        <p class="empty-state">Layihələr əlavə ediləndə burada görünəcək.</p>
      </div>
    </section>

    <footer class="footer">
      <span>Orxan © ${new Date().getFullYear()}</span>
      <span id="backend-status">Firebase bağlantısı yoxlanır…</span>
    </footer>
  </main>
`

const list = document.querySelector('#projects-list')
const status = document.querySelector('#backend-status')

if (!firebaseReady) {
  status.textContent = 'Firebase konfiqurasiyası gözlənilir'
} else {
  loadPublishedProjects()
    .then((projects) => {
      status.textContent = 'Firebase bağlıdır'
      if (!projects.length) return

      list.replaceChildren(...projects.map((project) => {
        const card = document.createElement('article')
        card.className = 'project-card'
        const title = document.createElement('h3')
        title.textContent = project.title || 'Adsız layihə'
        const description = document.createElement('p')
        description.textContent = project.summary || ''
        card.append(title, description)
        if (project.url && /^https:\/\//i.test(project.url)) {
          const link = document.createElement('a')
          link.href = project.url
          link.target = '_blank'
          link.rel = 'noopener noreferrer'
          link.textContent = 'Layihəyə bax ↗'
          card.append(link)
        }
        return card
      }))
    })
    .catch((error) => {
      console.error('Firebase projects query failed:', error)
      status.textContent = 'Firebase bağlantısı yoxlanmalıdır'
      list.innerHTML = '<p class="empty-state">Layihələri yükləmək mümkün olmadı.</p>'
    })
}
