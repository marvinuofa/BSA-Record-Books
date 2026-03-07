import { Home } from './pages/Home'
import { Route, Routes } from 'react-router'
import { Navbar } from './components/Navbar'
import { Leaderboard } from './pages/Leaderboard'
import { Players } from './pages/Players'
import { Stats } from './pages/Stats'

function App() {
  return (
    <div className="bg-black min-h-screen py-10 ">

      <div className="max-w-6xl mx-auto bg-neutral-900 text-white rounded-lg shadow-2xl shadow-[#ffcc08]/15 border border-neutral-800">
        
        <Navbar />

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<Players />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </main>

      </div>

    </div>
  )
}

export default App
