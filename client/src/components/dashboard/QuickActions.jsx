import {
  FaCamera,
  FaMapMarkerAlt,
  FaClipboardList,
  FaLeaf,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "Report Issue",
    icon: FaCamera,
    color: "bg-emerald-600",
    to: "/report",
  },
  {
    title: "Track Complaint",
    icon: FaMapMarkerAlt,
    color: "bg-blue-600",
    to: "/details",
  },
  {
    title: "Complaint History",
    icon: FaClipboardList,
    color: "bg-purple-600",
    to: "/history",
  },
  {
    title: "Eco Points",
    icon: FaLeaf,
    color: "bg-orange-500",
    to: "/dashboard#eco-points",
  },
];

export default function QuickActions() {
  return (
    <section className="mt-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              to={action.to}
              key={action.title}
              className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`${action.color} mb-4 inline-flex rounded-xl p-4`}
              >
                <Icon className="text-3xl text-white" />
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                {action.title}
              </h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
