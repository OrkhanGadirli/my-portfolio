import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const firebaseReady = Object.values(firebaseConfig).every(Boolean)

const app = firebaseReady ? initializeApp(firebaseConfig) : null
const db = app ? getFirestore(app) : null

export async function loadPublishedProjects() {
  if (!db) return []

  const projectsQuery = query(
    collection(db, 'projects'),
    where('published', '==', true),
  )
  const snapshot = await getDocs(projectsQuery)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}
