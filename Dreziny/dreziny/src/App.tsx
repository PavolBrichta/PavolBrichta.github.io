import './App.css'
import SideMenu from './components/SideMenu'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import { Routes, Route, HashRouter } from 'react-router-dom'
import Trails from './pages/Trails'
import Activities from './pages/Activities'

function App() {
  return (
    <HashRouter>
      <div className="app-layout">
        <aside className="aside">
          <SideMenu />
        </aside>

        <main className="main">
          <div className='page-container'>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="trails" element={<Trails />} />
              <Route path="activities" element={<Activities />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="contact" element={<Contact />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  )
}

export default App
