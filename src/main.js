import './style.css'
import { firebaseReady, loadPublishedProjects } from './firebase.js'
import { studioMarkup, startStudio } from './agents.js'
import { startRoamers } from './roamers.js'
import { agents, characterMarkup } from './characters.js'
import { startExpressions } from './expressions.js'

const chatgptAgents = agents.filter((agent) => agent.family === 'gpt')

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
        <span class="mascot mascot-guide is-traveling" role="img" aria-label="Qulaqlıqla yeriyən balaca köməkçi">${characterMarkup(agents[1])}</span>
      </div>
    </section>

    ${studioMarkup}

    <section class="gpt-concepts" aria-labelledby="gpt-title">
      <div class="gpt-intro">
        <p class="eyebrow">Yeni personaj təklifi</p>
        <h2 id="gpt-title">ChatGPT tərəfi</h2>
        <p>Bunlar ChatGPT üçün hazırladığım orijinal personaj fikirləridir. Mərcan agentlərdən fərqli olaraq yumru siluetləri, nanə və firuzəyi rəngləri var.</p>
      </div>
      <div class="gpt-cards">
        ${chatgptAgents.map((agent) => `
          <article class="gpt-card">
            <img src="${import.meta.env.BASE_URL}mascots/${agent.image}.webp" alt="${agent.name} adlı yumşaq personaj" loading="lazy" />
            <div><h3>${agent.name}</h3><p>${agent.task}. ${agent.detail}</p></div>
          </article>
        `).join('')}
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

const roamers = startRoamers()
startStudio(roamers.setPaused)
startExpressions()

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
