import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function TripCreate() {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [budget, setBudget] = useState("MEDIUM");
  const [preferences, setPreferences] = useState("");

  const submit = () => {
    // 簡單的前端驗證：防止送出空資料
    if (!city || !start || !end) {
      alert("Please fill in City and Dates!");
      return;
    }
    axios
      .post("/api/trips", {
        city,
        startDate: start,
        endDate: end,
        budgetLevel: budget,
        preferences: preferences.split(",").map((p) => p.trim()),
      })
      .then(() => navigate("/list"))
      .catch((err) => {
        // 🔴 錯誤處理：如果失敗，印出錯誤
        console.error("Create trip failed:", err);
        alert("Failed to create trip. Please try again.");
      });
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/list")}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 transition flex items-center gap-1"
        >
          ← Back to Home
        </button>
      </div>
      <h1 className="text-4xl font-bold mb-8 text-gray-700">Create Trip</h1>

      <div className="space-y-6">
        {/* City */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Destination City
          </label>
          <input
            className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 
             focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
            placeholder="e.g. Tokyo"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* Dates */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Trip Dates
          </label>
          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            {/* 👇 修正這裡：Start Date */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Start</label>
              <input
                type="date"
                className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 transition"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                required
              />
            </div>

            {/* 👇 修正這裡：End Date */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">End</label>
              <input
                type="date"
                className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 transition"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Budget Level
          </label>
          <select
            className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 transition"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        {/* Preferences */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Preferences
          </label>
          <input
            className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 transition"
            placeholder="e.g. FOOD, SHOPPING"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
          />
        </div>

        {/* Submit button */}
        <button
          onClick={submit}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold text-lg shadow-lg transition"
        >
          Create Trip
        </button>
      </div>
    </div>
  );
}
