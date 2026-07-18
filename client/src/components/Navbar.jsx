import { Link } from "react-router-dom";
import EcoPulseLogo from "./brand/EcoPulseLogo";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-emerald-100 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" aria-label="EcoPulse AI home">
          <EcoPulseLogo />
        </Link>

        <ul className="hidden gap-8 font-medium text-gray-700 md:flex">
          <li>
            <a href="#features" className="transition hover:text-emerald-600">
              Features
            </a>
          </li>
          <li>
            <a href="#process" className="transition hover:text-emerald-600">
              How It Works
            </a>
          </li>
          <li>
            <a href="#faq" className="transition hover:text-emerald-600">
              FAQ
            </a>
          </li>
          <li>
            <a href="#contact" className="transition hover:text-emerald-600">
              Contact
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/register"
            className="hidden rounded-full border border-emerald-200 px-5 py-2 font-semibold text-emerald-700 transition hover:bg-emerald-50 sm:inline-flex"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="rounded-full bg-emerald-600 px-5 py-2 font-semibold text-white transition hover:bg-emerald-700"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
