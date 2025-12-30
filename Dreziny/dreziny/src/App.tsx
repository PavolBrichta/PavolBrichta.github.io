import './App.css'
import SideMenu from './components/SideMenu'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="app-layout">
      <aside className="aside">
        <SideMenu />
      </aside>

      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
