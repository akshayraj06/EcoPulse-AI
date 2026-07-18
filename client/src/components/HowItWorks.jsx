import { motion } from "framer-motion";
import {
  FaCamera,
  FaRobot,
  FaClipboardCheck,
  FaUserCheck,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaCamera className="text-4xl text-emerald-600" />,
    title: "1. Upload Image",
    description:
      "Citizens upload a photo of garbage using their phone or computer.",
  },
  {
    icon: <FaRobot className="text-4xl text-emerald-600" />,
    title: "2. AI Detection",
    description:
      "AI analyzes the image, detects waste, and estimates the severity level.",
  },
  {
    icon: <FaClipboardCheck className="text-4xl text-emerald-600" />,
    title: "3. Complaint Generated",
    description:
      "A complaint is created automatically with location and AI insights.",
  },
  {
    icon: <FaUserCheck className="text-4xl text-emerald-600" />,
    title: "4. Worker Assigned",
    description:
      "The nearest sanitation worker receives the task instantly.",
  },
  {
    icon: <FaCheckCircle className="text-4xl text-emerald-600" />,
    title: "5. Issue Resolved",
    description:
      "After cleanup, the worker uploads proof, and the complaint is marked complete.",
  },
];

function HowItWorks() {
  return (
    <section id="process" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            How EcoPulse AI Works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            From reporting a cleanliness issue to resolving it, EcoPulse AI
            makes every step faster, smarter, and more transparent.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-5">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mb-5 flex justify-center">
                {step.icon}
              </div>

              <h3 className="mb-3 text-lg font-bold text-gray-900">
                {step.title}
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
