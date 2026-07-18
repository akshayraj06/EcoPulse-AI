import { motion } from "framer-motion";
import {
  FaChartLine,
  FaClipboardCheck,
  FaCloud,
  FaUsers,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaClipboardCheck className="text-3xl text-emerald-600" />,
    value: "15k+",
    label: "Reports resolved",
  },
  {
    icon: <FaUsers className="text-3xl text-emerald-600" />,
    value: "320+",
    label: "Workers coordinated",
  },
  {
    icon: <FaChartLine className="text-3xl text-emerald-600" />,
    value: "95%",
    label: "Resolution accuracy",
  },
  {
    icon: <FaCloud className="text-3xl text-emerald-600" />,
    value: "42T",
    label: "Carbon impact tracked",
  },
];

function Stats() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-4 flex justify-center">{stat.icon}</div>
            <h2 className="text-4xl font-bold text-gray-950">{stat.value}</h2>
            <p className="mt-2 text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
