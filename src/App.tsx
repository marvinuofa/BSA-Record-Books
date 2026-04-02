import { Home } from './pages/Home'
import { Route, Routes } from 'react-router'
import { Navbar } from './components/Navbar'
import { Leaderboard } from './pages/Leaderboard'
import { Stats } from './pages/Stats'
import { Fixtures } from './pages/Fixtures'
import { Live } from './pages/Live'
import { Admin } from './pages/Admin'
import { Forty } from './pages/Forty'
import { Crossbar } from './pages/Crossbar'
import { Broadjump } from './pages/Broadjump'
import { Qb } from './pages/Qb'
import { Tds } from './pages/Tds'
import { Reds } from './pages/Reds'
import { Yellows } from './pages/Yellows'
import { Goals } from './pages/Goals'

function App() {
  return (
    <div className="bg-black min-h-screen py-10 ">
      <div className="max-w-6xl mx-auto bg-neutral-900 text-white rounded-lg shadow-2xl shadow-[#ffcc08]/20 border border-neutral-800">
        <Navbar />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Live" element={<Live/>} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/admin" element= {<Admin/>} />
            <Route path="/Forty" element = {<Forty/>} />
            <Route path="/Crossbar" element = {<Crossbar/>} />
            <Route path="/Broadjump" element = {<Broadjump/>} />
            <Route path="/Qb" element = {<Qb/>} />
            <Route path="/Tds" element = {<Tds/>} />
            <Route path="/Reds" element = {<Reds/>} />
            <Route path="/Yellows" element = {<Yellows/>} />
            <Route path="/Goals" element = {<Goals/>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
