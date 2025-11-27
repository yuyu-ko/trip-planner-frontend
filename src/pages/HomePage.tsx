import { Link } from "react-router-dom";
import TripList from "./TripList";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* ---------- HERO SECTION ---------- */}
      <div
        className="relative w-full h-[320px] bg-cover bg-center rounded-b-3xl shadow-lg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=60')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-b-3xl"></div>

        <div className="relative z-10 text-center text-white top-1/3">
          <h1 className="text-4xl font-bold drop-shadow-lg">
            Your Personal AI Trip Planner
          </h1>
          <p className="mt-2 text-lg opacity-90">
            AI-generated itineraries · Locations · Ratings · Map Integration
          </p>

          <Link
            to="/create"
            className="inline-block mt-6 px-6 py-3 bg-[#64a8ff] bg-blue-200 hover:bg-blue-500 text-white rounded-lg shadow-lg transition"
          >
            + Create New Trip
          </Link>
        </div>
      </div>

      {/* ---------- CONTENT ---------- */}
      <div className="w-full pt-10 px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Trips</h2>

        <TripList />
      </div>

      <div className="h-10"></div>
    </div>
  );
}
