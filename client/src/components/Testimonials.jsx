import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Resident Welfare Lead",
    quote:
      "EcoPulse AI makes reporting civic issues simple and accountable. The status visibility is exactly what communities need.",
  },
  {
    name: "Priya Nair",
    role: "Municipal Operations Manager",
    quote:
      "The platform gives our teams one place to prioritize, assign, and track cleanup requests without losing context.",
  },
  {
    name: "Rahul Kumar",
    role: "Sanitation Supervisor",
    quote:
      "Worker task views and AI priority signals help the field team focus on the most urgent locations first.",
  },
];

function Testimonials() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-3xl">
          <p className="font-semibold text-emerald-600">Trusted Workflows</p>
          <h2 className="mt-3 text-4xl font-bold text-gray-950">
            Built for citizens, workers, and city administrators.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-7 shadow-sm"
            >
              <FaQuoteLeft className="text-2xl text-emerald-500" />
              <p className="mt-5 leading-7 text-gray-700">"{item.quote}"</p>
              <div className="mt-6 flex gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} />
                ))}
              </div>
              <div className="mt-5">
                <p className="font-bold text-gray-950">{item.name}</p>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
