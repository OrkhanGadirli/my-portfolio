import './style.css'
import { firebaseReady, loadPublishedProjects } from './firebase.js'
import { studioMarkup, startStudio } from './agents.js'

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
        <p class="lead">Layihələrimi, iş tərzimi və hekayəmi burada paylaşacağam. Hələlik balaca köməkçilərim emalatxanada iş başındadır.</p>
        <a class="text-link" href="#studio">Agentlərlə tanış ol <span aria-hidden="true">↘</span></a>
      </div>
      <div class="mascot-stage" aria-label="İki animasiyalı, şirin köməkçi agent">
        <span class="stage-glow" aria-hidden="true"></span>
        <img class="mascot mascot-coder" src="${import.meta.env.BASE_URL}mascots/coder.webp" alt="Noutbukla işləyən balaca köməkçi" />
        <img class="mascot mascot-guide" src="${import.meta.env.BASE_URL}mascots/guide.webp" alt="Qulaqlıqla əl yelləyən balaca köməkçi" />
      </div>
    </section>

    ${studioMarkup}

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

startStudio()

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
