import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { StudentsProvider } from '@/context/StudentsContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StudentsProvider>
        <App />
      </StudentsProvider>
    </BrowserRouter>
  </StrictMode>,
)
