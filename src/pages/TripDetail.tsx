import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";

interface Activity {
  time: string;
  title: string;
  description: string;
  location: string;
  googleRating?: number | null;
  imageUrl?: string;
}

interface DayPlan {
  dayNumber: number;
  date: string;
  activities: Activity[];
}

interface Trip {
  id: string;
  city: string;
  startDate: string;
  endDate: string;
  budgetLevel: string;
  preferences: string[];
  status: string;
  dayPlans?: DayPlan[];
}

export default function TripDetail() {
  const { id } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const navigate = useNavigate();
  const [editTripOpen, setEditTripOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const load = () => {
    // Fetch trip detail from backend
    axios.get(`/api/trips/${id}`).then((res) => {
      setTrip(res.data);

      setEditForm({
        city: res.data.city,
        startDate: res.data.startDate,
        endDate: res.data.endDate,
        budgetLevel: res.data.budgetLevel,
        preferences: res.data.preferences.join(", "),
      });
    });
  };

  useEffect(() => {
    load();
  }, []);

  const generateAI = () => {
    setLoadingAI(true);

    axios
      .post(`/api/trips/${id}/generate`)
      .then(() => load()) // 重新載入行程資料
      .finally(() => setLoadingAI(false)); // 必定關閉 loading
  };

  const saveTrip = () => {
    axios
      .put(`/api/trips/${id}`, {
        city: editForm.city,
        startDate: editForm.startDate,
        endDate: editForm.endDate,
        budgetLevel: editForm.budgetLevel,
        preferences: editForm.preferences.split(",").map((p) => p.trim()),
      })
      .then(() => {
        setEditTripOpen(false);
        load(); // refresh updated trip
      });
  };

  const deleteTrip = () => {
    axios
      .delete(`/api/trips/${id}`)
      .then(() => navigate("/")) // 刪掉後回首頁
      .catch((err) => console.error(err));
  };

  const [editForm, setEditForm] = useState({
    city: "",
    startDate: "",
    endDate: "",
    budgetLevel: "MEDIUM",
    preferences: "",
  });

  if (!trip) return <div>Loading...</div>;

  return (
    <div className="w-full p-6">
      {loadingAI && <LoadingOverlay />}

      {/* 1. 頂部控制列：Back, Edit, Delete */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/list")}
          className="text-sm font-medium bg-gray-500 text-white hover:text-gray-900 transition flex items-center gap-1"
        >
          ← Back to Home
        </button>
        <div className="space-x-3">
          <button
            onClick={() => setEditTripOpen(true)}
            className="px-3 py-1.5 text-sm rounded-md shadow-sm transition 
               border border-gray-300 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Edit Trip
          </button>
          <button
            onClick={() => setDeleteConfirmOpen(true)}
            className="ml-3 px-3 py-1.5 text-sm rounded-md shadow-sm transition 
               border border-red-400 bg-red-600 hover:bg-red-700 text-white"
          >
            Delete Trip
          </button>
          <button
            onClick={() => window.open(`/api/trips/${trip.id}/pdf`)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md ml-3"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* 2. 行程標題與摘要 */}
      <h1 className="text-4xl font-extrabold mb-1">{trip.city}</h1>
      <div className="text-gray-600 text-lg mb-2">
        {trip.startDate} → {trip.endDate}
      </div>
      {/* 狀態標籤優化：使用 Pill Badges (同 TripList 建議) */}
      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
        Status: {trip.status}
      </span>

      <div className="mt-4">
        <button
          onClick={generateAI}
          disabled={loadingAI}
          className={`w-full py-3 rounded-lg font-semibold shadow-lg transition text-white
    ${
      loadingAI
        ? // 修正 loading 狀態的背景和文字顏色
          "bg-gray-500 cursor-not-allowed"
        : // 修正非 loading 狀態的文字顏色
          "bg-cyan-500 hover:bg-cyan-600 text-white"
    }`}
        >
          {loadingAI ? (
            <div className="flex items-center justify-center gap-2">
              {/* 修正 Spinner 顏色和樣式 */}
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating AI Plan...
            </div>
          ) : (
            "Generate New AI Plan"
          )}
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {/* // Display day plans if available */}
        {trip.dayPlans?.map((day) => (
          <div
            key={day.dayNumber}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            {/* 日期標題：使用不同的字體大小和顏色 */}
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Day {day.dayNumber} — {day.date}
            </h2>

            <div className="relative border-l-2 border-gray-200 pl-6 space-y-4">
              {/* 行程列表：使用時間線樣式 */}
              {day.activities.map((a, idx) => (
                <div key={idx} className="relative">
                  {/* 時間點圓點 */}
                  <div className="absolute -left-8 top-1 h-4 w-4 rounded-full bg-cyan-500 border-4 border-white shadow-md"></div>

                  {/* 內容區塊 */}
                  <li
                    key={idx}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
                  >
                    {/* 時間 + 標題 */}
                    <div className="px-5 pt-4">
                      <div className="text-gray-900 font-bold text-lg">
                        {a.time} — {a.title}
                      </div>
                    </div>

                    {/* 圖片 */}
                    {a.imageUrl && (
                      <img
                        src={a.imageUrl}
                        alt={a.title}
                        className="w-full h-60 object-cover mt-3"
                      />
                    )}

                    {/* 內容區 */}
                    <div className="px-5 py-4">
                      {/* 評分 + 地址 */}
                      <div className="flex items-center gap-3 text-sm text-gray-700 mb-2">
                        {a.googleRating && (
                          <span className="text-orange-500 font-semibold">
                            ⭐ {a.googleRating.toFixed(1)}
                          </span>
                        )}

                        <span className="text-gray-500">{a.location}</span>
                      </div>

                      {/* 描述 */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {a.description}
                      </p>

                      {/* Toggle Map Button */}
                      <details className="mt-2">
                        <summary className="cursor-pointer text-blue-600 text-sm">
                          📍 Show Map
                        </summary>

                        <iframe
                          src={`https://www.google.com/maps?q=${encodeURIComponent(
                            a.location
                          )}&output=embed`}
                          className="w-full h-64 mt-3 rounded-lg border"
                          loading="lazy"
                        ></iframe>
                      </details>
                    </div>
                  </li>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {editTripOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Trip</h2>

            <div className="space-y-4">
              <input
                className="w-full border p-2 rounded"
                placeholder="City"
                value={editForm.city}
                onChange={(e) =>
                  setEditForm({ ...editForm, city: e.target.value })
                }
              />

              <input
                type="date"
                className="w-full border p-2 rounded"
                value={editForm.startDate}
                onChange={(e) =>
                  setEditForm({ ...editForm, startDate: e.target.value })
                }
              />

              <input
                type="date"
                className="w-full border p-2 rounded"
                value={editForm.endDate}
                onChange={(e) =>
                  setEditForm({ ...editForm, endDate: e.target.value })
                }
              />

              <select
                className="w-full border p-2 rounded"
                value={editForm.budgetLevel}
                onChange={(e) =>
                  setEditForm({ ...editForm, budgetLevel: e.target.value })
                }
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>

              <input
                className="w-full border p-2 rounded"
                placeholder="Preferences (e.g. FOOD,SHOPPING)"
                value={editForm.preferences}
                onChange={(e) =>
                  setEditForm({ ...editForm, preferences: e.target.value })
                }
              />
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditTripOpen(false)}
                className="px-4 py-2 bg-gray-400 text-gray rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveTrip}
                className="px-4 py-2 bg-blue-600 text-gray rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-red-600">Delete Trip</h2>

            <p className="mb-6">Are you sure you want to delete this trip?</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>

              <button onClick={deleteTrip} className="px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
