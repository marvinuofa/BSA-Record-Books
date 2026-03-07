import { useState } from "react"
import { Link } from "react-router"

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="border-b border-[#ffcc08] shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center h-16">

        {/* Left side (Logo + Menu) */}
        <div className="flex items-center gap-55">

          {/* Title */}
          <Link to="/" className="text-lg font-semibold">
            <span className="text-[#ffcc08] font-bold">UABSA</span> Record Books
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <Link className="hover:text-[#ffcc08] transition-colors" to="/">Home</Link>
            <Link className="hover:text-[#ffcc08] transition-colors" to="/fixtures">Fixtures</Link>
            <Link className="hover:text-[#ffcc08] transition-colors" to="/stats">Stats</Link>
            <Link className="hover:text-[#ffcc08] transition-colors" to="/leaderboard">Leaderboard</Link>
          </div>

        </div>

        {/* Right Logo */}
        <div className="ml-auto flex items-center">
          <Link to="/">
            <img
              src="/photo.png"
              alt="UABSA logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden ml-4 border border-neutral-700 px-3 py-1 rounded hover:border-[#ffcc08]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-neutral-800">
          <div className="max-w-6xl mx-auto flex flex-col gap-3 py-4 px-4">
            <Link className="hover:text-[#ffcc08]" to="/">Home</Link>
            <Link className="hover:text-[#ffcc08]" to="/fixtures">Fixtures</Link>
            <Link className="hover:text-[#ffcc08]" to="/stats">Stats</Link>
            <Link className="hover:text-[#ffcc08]" to="/leaderboard">Leaderboard</Link>
          </div>
        </div>
      )}
    </nav>
  )
}