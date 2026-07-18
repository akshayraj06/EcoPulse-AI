import {
  FaClipboardList,
  FaCheckCircle,
  FaCloud,
  FaLeaf,
  FaMedal,
  FaTrophy,
} from "react-icons/fa";

const cards = [
  {
    title: "Eco Score",
    value: "86/100",
    icon: FaMedal,
    color: "bg-emerald-600",
  },
  {
    title: "Green Points",
    value: "2,450",
    icon: FaLeaf,
    color: "bg-lime-600",
  },
  {
    title: "Carbon Saved",
    value: "128 kg",
    icon: FaCloud,
    color: "bg-sky-600",
  },
  {
    title: "Current Rank",
    value: "#14",
    icon: FaTrophy,
    color: "bg-amber-500",
  },
  {
    title: "Reports Submitted",
    value: 18,
    icon: FaClipboardList,
    color: "bg-blue-500",
  },
  {
    title: "Resolved",
    value: 14,
    icon: FaCheckCircle,
    color: "bg-green-500",
  },
];

export default function DashboardCards() {
  return (
    <section className="mt-10">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Dashboard Overview
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">{card.title}</p>
                  <h3 className="mt-2 text-3xl font-bold">{card.value}</h3>
                </div>

                <div className={`${card.color} rounded-xl p-4`}>
                  <Icon className="text-2xl text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
