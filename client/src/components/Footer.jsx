import { Link } from "react-router-dom";
import EcoPulseLogo from "./brand/EcoPulseLogo";

function Footer() {
  return (
    <footer className="bg-gray-950 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
        <div>
          <Link to="/" className="inline-flex">
            <EcoPulseLogo inverted />
          </Link>
          <p className="mt-4 max-w-md leading-7 text-gray-400">
            AI-powered civic issue reporting for cleaner neighborhoods,
            responsive worker teams, and transparent municipal operations.
          </p>
        </div>

        <div>
          <h3 className="font-bold">Platform</h3>
          <div className="mt-4 space-y-3 text-gray-400">
            <p>
              <Link to="/dashboard" className="hover:text-white">
                Citizen Dashboard
              </Link>
            </p>
            <p>
              <Link to="/worker" className="hover:text-white">
                Worker Portal
              </Link>
            </p>
            <p>
              <Link to="/admin" className="hover:text-white">
                Admin Analytics
              </Link>
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Company</h3>
          <div className="mt-4 space-y-3 text-gray-400">
            <p>
              <a href="#features" className="hover:text-white">
                Features
              </a>
            </p>
            <p>
              <a href="#faq" className="hover:text-white">
                FAQ
              </a>
            </p>
            <p>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-6 pt-6 text-sm text-gray-500">
        EcoPulse AI. Built for cleaner, smarter cities.
      </div>
    </footer>
  );
}

export default Footer;
