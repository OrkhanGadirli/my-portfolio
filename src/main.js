import './style.css'
import { firebaseReady } from './firebase.js'

const app = document.querySelector('#app')
app.dataset.firebaseReady = String(firebaseReady)

app.innerHTML = `
  <div class="page">
    <header class="topbar">
      <span class="wordmark">Orxan Qadirli</span>
      <span class="status">Portfolio yenilənir</span>
    </header>

    <main class="intro">
      <p class="eyebrow">Portfolio</p>
      <h1>Yeni səhifə hazırlanır.</h1>
      <p>Burada işlərim, məqalələrim və praktiki bələdçilərim olacaq.</p>
      <a href="https://github.com/OrkhanGadirli" target="_blank" rel="noopener noreferrer">GitHub profilimə bax <span aria-hidden="true">↗</span></a>
    </main>

    <footer class="footer">© ${new Date().getFullYear()} Orxan Qadirli</footer>
  </div>
`
