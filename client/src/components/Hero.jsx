import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBrain,
  FaLeaf,
  FaMapMarkedAlt,
  FaRecycle,
} from "react-icons/fa";
import EcoPulseLogo from "./brand/EcoPulseLogo";
import SmartCityIllustration from "./SmartCityIllustration";

function Hero() {
  return (
    <section className="overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white">
      <div className="mx-auto grid min-h-[86vh] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
            <FaBrain />
            AI-powered civic cleanliness platform
          </span>

          <EcoPulseLogo className="mt-7" />

          <h1 className="mt-7 max-w-4xl text-5xl font-extrabold leading-tight text-gray-950 md:text-7xl">
            Cleaner cities, healthier future.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600">
            EcoPulse AI connects citizens, sanitation workers, and city
            administrators with intelligent reporting, prioritization, and
            transparent resolution workflows.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-emerald-600 px-8 py-4 font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700"
            >
              Start Reporting
              <FaArrowRight />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-emerald-600 px-8 py-4 font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Explore Platform
            </a>
          </div>

          <div className="mt-10 grid gap-4 text-gray-700 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <FaRecycle className="text-emerald-600" />
              AI waste detection
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <FaMapMarkedAlt className="text-emerald-600" />
              Live issue maps
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <FaLeaf className="text-emerald-600" />
              Eco rewards
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -left-6 top-10 hidden rounded-2xl bg-white p-4 shadow-xl md:block">
            <p className="text-sm font-semibold text-gray-500">AI Priority</p>
            <p className="text-2xl font-bold text-emerald-600">High</p>
          </div>
          <div className="absolute -right-2 bottom-8 hidden rounded-2xl bg-white p-4 shadow-xl md:block">
            <p className="text-sm font-semibold text-gray-500">Resolved</p>
            <p className="text-2xl font-bold text-gray-900">15,240</p>
          </div>
          <div className="rounded-[2rem] border border-emerald-100 bg-white p-4 shadow-2xl">
            <SmartCityIllustration />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
