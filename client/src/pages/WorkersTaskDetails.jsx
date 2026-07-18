import { useState } from "react";
import WorkerSidebar from "../components/worker/WorkerSidebar";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCamera,
  FaCheckCircle,
} from "react-icons/fa";

export default function WorkerTaskDetails() {
  const [afterImage, setAfterImage] = useState(null);
  const [notes, setNotes] = useState("");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <WorkerSidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Task Details
        </h1>

        <p className="text-gray-600 mt-2">
          Complaint ID: CP-1001
        </p>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">

          {/* Complaint Image */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Complaint Image
            </h2>

            <img
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800"
              alt="Complaint"
              className="rounded-xl w-full h-80 object-cover"
            />
          </div>

          {/* Complaint Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Complaint Information
            </h2>

            <p><strong>Category:</strong> Plastic Waste</p>

            <p className="mt-3 flex items-center gap-2">
              <FaMapMarkerAlt />
              Hyderabad
            </p>

            <p className="mt-3 flex items-center gap-2">
              <FaCalendarAlt />
              17 July 2026
            </p>

            <p className="mt-3">
              <strong>Priority:</strong> High
            </p>
          </div>

        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

          <h2 className="text-2xl font-semibold mb-5">
            Upload Cleaning Evidence
          </h2>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setAfterImage(URL.createObjectURL(e.target.files[0]))
            }
          />

          {afterImage && (
            <img
              src={afterImage}
              alt="After Cleaning"
              className="mt-5 rounded-xl w-80"
            />
          )}

          <textarea
            placeholder="Add completion notes..."
            className="mt-6 w-full rounded-xl border p-4"
            rows="5"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button className="mt-6 flex items-center gap-3 rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700">
            <FaCheckCircle />
            Mark Task Completed
          </button>

        </div>
      </main>
    </div>
  );
}