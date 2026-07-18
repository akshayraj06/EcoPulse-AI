import { FaLeaf } from "react-icons/fa";

function WelcomeBanner() {
  return (
    <div className="mt-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white shadow-xl shadow-emerald-100">
      <div className="flex items-center gap-3">
        <FaLeaf className="text-3xl" />
        <div>
          <h1 className="text-3xl font-black">Welcome to EcoPulse AI</h1>
          <p className="mt-2 text-emerald-100">
            Report cleanliness issues, track complaints, and contribute to a
            cleaner city.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeBanner;
