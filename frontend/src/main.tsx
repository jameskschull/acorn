import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { StudentsProvider } from '@/context/StudentsContext'
import { MeetingsProvider } from '@/context/MeetingsContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StudentsProvider>
        <MeetingsProvider>
          <App />
        </MeetingsProvider>
      </StudentsProvider>
    </BrowserRouter>
  </StrictMode>,
)
