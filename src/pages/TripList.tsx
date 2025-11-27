import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // 可選：加上登出按鈕

interface Trip {
  id: string;
  city: string;
  startDate: string;
  endDate: string;
  budgetLevel: string;
  preferences: string[];
  status: string;
}

export default function TripList() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const getStatusClasses = (status: string) => {
    switch (status.toUpperCase()) {
      case "READY":
        return "text-green-600 bg-green-100 border-green-300"; // 成功/完成
      case "PENDING":
        return "text-yellow-700 bg-yellow-100 border-yellow-300"; // 處理中/等待
      case "ERROR":
        return "text-red-600 bg-red-100 border-red-300"; // 錯誤 (預留)
      default:
        return "text-gray-600 bg-gray-100 border-gray-300";
    }
  };
  const { logout } = useAuth(); // 取得登出功能

  useEffect(() => {
    axios.get("/api/trips").then((res) => {
      setTrips(res.data);
    });
  }, []);

  return (
    <div className="p-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Trips</h1>
        <div className="space-x-4">
          {/* 登出按鈕 */}
          <button onClick={logout} className="text-red-500 hover:text-red-700">
            Logout
          </button>
          <a
            href="/create"
            className="px-4 py-2 bg-[#64a8ff] text-white rounded-lg hover:bg-blue-700"
          >
            + Create Trip
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((t) => (
          <a
            key={t.id}
            href={`/trip/${t.id}`}
            className="block bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">{t.city}</h2>

            <p className="text-sm text-gray-500">
              {t.startDate} → {t.endDate}
            </p>

            <div className="mt-2 flex flex-wrap gap-2 items-center">
              {/* 預算標籤：使用更深的底色和圓角 */}
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700 uppercase tracking-wider">
                {t.budgetLevel}
              </span>
              {/* 偏好標籤：使用較柔和的樣式 */}
              {t.preferences.map((pref, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600"
                >
                  {pref}
                </span>
              ))}
            </div>

            <span
              className={`inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusClasses(
                t.status
              )}`}
            >
              {t.status}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
