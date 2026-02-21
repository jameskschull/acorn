import { Routes, Route } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import Dashboard from '@/pages/Dashboard'
import Students from '@/pages/Students'
import OnboardStudent from '@/pages/OnboardStudent'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/onboard" element={<OnboardStudent />} />
      </Route>
    </Routes>
  )
}

export default App
