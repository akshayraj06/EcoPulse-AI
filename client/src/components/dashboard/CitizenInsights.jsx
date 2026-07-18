import {
  FaAward,
  FaBolt,
  FaChartLine,
  FaLeaf,
  FaRobot,
  FaSeedling,
  FaTrophy,
} from "react-icons/fa";

const weeklyProgress = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 58 },
  { day: "Wed", value: 51 },
  { day: "Thu", value: 74 },
  { day: "Fri", value: 68 },
  { day: "Sat", value: 86 },
  { day: "Sun", value: 79 },
];

const badges = [
  { label: "Clean Street", icon: FaLeaf, color: "bg-emerald-100 text-emerald-700" },
  { label: "Fast Reporter", icon: FaBolt, color: "bg-amber-100 text-amber-700" },
  { label: "Eco Champion", icon: FaTrophy, color: "bg-purple-100 text-purple-700" },
  { label: "Tree Saver", icon: FaSeedling, color: "bg-lime-100 text-lime-700" },
];

const timeline = [
  {
    title: "Garbage overflow reported",
    detail: "CP-1008 assigned to Zone Worker Team A",
    time: "Today, 10:25 AM",
    status: "Assigned",
  },
  {
    title: "Plastic waste complaint resolved",
    detail: "Before/after cleanup verified",
    time: "Yesterday, 5:40 PM",
    status: "Completed",
  },
  {
    title: "Reward points earned",
    detail: "+120 green points for verified report",
    time: "16 Jul 2026",
    status: "Rewarded",
  },
];

const activities = [
  "You are 180 points away from Silver Citizen rank.",
  "3 complaints were resolved in your area this week.",
  "AI recommends reporting mixed waste separately for faster pickup.",
];

export default function CitizenInsights() {
  return (
    <section className="mt-10 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-8">
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Progress Charts
              </h2>
              <p className="mt-1 text-gray-600">
                Weekly eco score growth from reports, rewards, and verified
                impact.
              </p>
            </div>
            <FaChartLine className="text-3xl text-emerald-600" />
          </div>

          <div className="mt-8 flex h-64 items-end gap-4">
            {weeklyProgress.map((item) => (
              <div key={item.day} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex h-52 w-full items-end rounded-full bg-emerald-50">
                  <div
                    className="w-full rounded-full bg-emerald-500 transition-all"
                    style={{ height: `${item.value}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-600">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">
            Complaint Timeline
          </h2>
          <div className="mt-6 space-y-5">
            {timeline.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                <div className="flex-1 rounded-xl border border-gray-100 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{item.detail}</p>
                  <p className="mt-2 text-sm text-gray-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">Badges</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            {badges.map((badge) => {
              const Icon = badge.icon;

              return (
                <div
                  key={badge.label}
                  className="flex items-center gap-4 rounded-xl border border-gray-100 p-4"
                >
                  <div className={`${badge.color} rounded-xl p-3`}>
                    <Icon className="text-xl" />
                  </div>
                  <span className="font-semibold text-gray-800">
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-gray-900 p-6 text-white shadow-md">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-500 p-3">
              <FaRobot />
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI Assistant</h2>
              <p className="text-sm text-gray-300">Eco guidance preview</p>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-white/10 p-5 leading-7 text-gray-100">
            Your area has repeated plastic and mixed waste reports. Try
            separating plastic, paper, and organic waste before pickup to
            increase recycling efficiency by an estimated 18%.
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
          <div className="mt-5 space-y-4">
            {activities.map((activity) => (
              <div key={activity} className="flex items-start gap-3 text-gray-700">
                <FaAward className="mt-1 text-emerald-600" />
                <p>{activity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
