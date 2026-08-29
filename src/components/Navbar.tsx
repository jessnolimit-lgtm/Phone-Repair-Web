import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Logo from "./Logo";
import DownloadButton from "./DownloadButton";

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        transparent
          ? "bg-white/80 backdrop-blur-sm border-b border-slate-100"
          : "bg-white border-b border-slate-200"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex-shrink-0">
          <Logo size="sm" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
          <a href="#about" className="hover:text-slate-900 transition-colors">About</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <DownloadButton variant="navbar" size="sm" label="Install App" />
          <button
            onClick={() => navigate("/login")}
            className="text-sm font-medium text-slate-700 hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/register")}
            className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-3">
          <a href="#features" className="text-sm font-medium text-slate-700 py-2" onClick={() => setOpen(false)}>Features</a>
          <a href="#pricing" className="text-sm font-medium text-slate-700 py-2" onClick={() => setOpen(false)}>Pricing</a>
          <a href="#about" className="text-sm font-medium text-slate-700 py-2" onClick={() => setOpen(false)}>About</a>
          <div className="pt-2 flex flex-col gap-2 border-t border-slate-100">
            <DownloadButton variant="navbar" size="md" label="Install PhoneFix App" className="w-full" />
            <button
              onClick={() => { navigate("/login"); setOpen(false); }}
              className="text-sm font-medium text-slate-700 border border-slate-200 py-2.5 rounded-lg cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => { navigate("/register"); setOpen(false); }}
              className="text-sm font-semibold text-white bg-blue-600 py-2.5 rounded-lg cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
