import { motion } from "framer-motion";
import {
  FaBell,
  FaChartBar,
  FaLeaf,
  FaMapMarkerAlt,
  FaRobot,
  FaUsersCog,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot className="text-4xl text-emerald-600" />,
    title: "AI Waste Detection",
    description:
      "Upload an image and let AI identify waste type, estimate severity, and draft the report.",
  },
  {
    icon: <FaMapMarkerAlt className="text-4xl text-emerald-600" />,
    title: "Live GPS Tracking",
    description:
      "Attach accurate location data to every report for faster assignment and resolution.",
  },
  {
    icon: <FaChartBar className="text-4xl text-emerald-600" />,
    title: "Smart Analytics",
    description:
      "Monitor hotspots, carbon impact, worker performance, and city-level cleanliness trends.",
  },
  {
    icon: <FaBell className="text-4xl text-emerald-600" />,
    title: "Auto Escalation",
    description:
      "Unresolved complaints can be escalated to supervisors with clear priority signals.",
  },
  {
    icon: <FaUsersCog className="text-4xl text-emerald-600" />,
    title: "Worker Operations",
    description:
      "Workers receive tasks, update progress, and upload completion proof from one dashboard.",
  },
  {
    icon: <FaLeaf className="text-4xl text-emerald-600" />,
    title: "Green Rewards",
    description:
      "Citizens earn points, badges, and recognition for improving their communities.",
  },
];

function Features() {
  return (
    <section id="features" className="bg-emerald-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="font-semibold text-emerald-700">Platform Features</p>
          <h2 className="mt-3 text-4xl font-bold text-gray-950">
            Everything needed for smarter civic cleanliness.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            AI-powered tools help citizens, workers, and authorities create
            cleaner, more accountable, and more sustainable cities.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="mb-3 text-xl font-bold text-gray-950">
                {feature.title}
              </h3>
              <p className="leading-7 text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
