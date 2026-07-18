import { motion } from "framer-motion";

const faqs = [
  {
    question: "How does EcoPulse AI classify waste?",
    answer:
      "The platform is designed to connect uploaded images to an AI service layer that predicts category, priority, and recommended action.",
  },
  {
    question: "Can citizens track complaint progress?",
    answer:
      "Yes. Citizens can view complaint history, status, priority, assigned worker information, and resolution progress.",
  },
  {
    question: "Does this support municipal worker workflows?",
    answer:
      "Yes. Worker dashboards include assigned tasks, task details, proof upload flows, and completion actions.",
  },
  {
    question: "Is EcoPulse AI ready for integrations?",
    answer:
      "The app already uses a service-based frontend and Express API structure, making it ready for AI, maps, image storage, and analytics integrations.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="bg-emerald-50 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <p className="font-semibold text-emerald-700">FAQ</p>
          <h2 className="mt-3 text-4xl font-bold text-gray-950">
            Questions city teams ask first.
          </h2>
        </div>

        <div className="grid gap-5">
          {faqs.map((item, index) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-950">
                {item.question}
              </h3>
              <p className="mt-3 leading-7 text-gray-600">{item.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
