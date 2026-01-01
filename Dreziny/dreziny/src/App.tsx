import './App.css'
import SideMenu from './components/SideMenu'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter basename="/Dreziny/">
      <div className="app-layout">
        <aside className="aside">
          <SideMenu />
        </aside>

        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
