// import { createBrowserRouter } from "react-router-dom";
// import TripList from "./pages/TripList";
// import TripCreate from "./pages/TripCreate";
// import TripDetail from "./pages/TripDetail";

// export const router = createBrowserRouter([
//   /// → TripList（顯示所有旅程）
//   { path: "/", element: <TripList /> },
//   ///create → TripCreate（新增旅程）
//   { path: "/create", element: <TripCreate /> },
//   ///trip/:id → TripDetail（顯示單旅程 + AI 行程）
//   //:id 表示動態網址，例如：/trip/4fa51ef2-c7fd-459f-8180-5c971f4b45ce  React Router 幫你 map 過去。
//   { path: "/trip/:id", element: <TripDetail /> },
// ]);

import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TripList from "./pages/TripList";
import TripCreate from "./pages/TripCreate";
import TripDetail from "./pages/TripDetail";
import ProtectedRoute from "./components/ProtectedRoute"; // 匯入

export const router = createBrowserRouter([
  // 1. 首頁現在是登入頁面
  { path: "/", element: <LoginPage /> },

  // 2. 受保護的路由 (需要登入才能看)
  {
    element: <ProtectedRoute />, // 所有下面的 children 都會經過 ProtectedRoute 檢查
    children: [
      { path: "/list", element: <TripList /> },
      { path: "/create", element: <TripCreate /> },
      { path: "/trip/:id", element: <TripDetail /> },
    ],
  },
]);
