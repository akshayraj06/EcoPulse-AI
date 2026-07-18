import { Link } from "react-router-dom";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

function Contact() {
  return (
    <section id="contact" className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-semibold text-emerald-600">Contact</p>
          <h2 className="mt-3 text-4xl font-bold text-gray-950">
            Bring AI-powered cleanliness reporting to your city.
          </h2>
          <p className="mt-5 leading-8 text-gray-600">
            EcoPulse AI is structured for civic teams that need transparent
            reporting, role-based workflows, and measurable environmental
            outcomes.
          </p>

          <div className="mt-8 space-y-4 text-gray-700">
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-emerald-600" />
              hello@ecopulse.ai
            </p>
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-emerald-600" />
              +91 98765 43210
            </p>
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-emerald-600" />
              Hyderabad, India
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-950">
            Ready to try the platform?
          </h3>
          <p className="mt-3 text-gray-600">
            Create an account and explore the role-based dashboards already
            connected to EcoPulse AI authentication.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/register"
              className="rounded-full bg-emerald-600 px-7 py-3 text-center font-semibold text-white transition hover:bg-emerald-700"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="rounded-full border border-emerald-600 px-7 py-3 text-center font-semibold text-emerald-700 transition hover:bg-white"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
