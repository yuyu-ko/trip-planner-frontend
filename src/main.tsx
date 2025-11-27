// React: React 核心
import React from "react";
// ReactDOM: 負責把 React 元件渲染進 HTML
import ReactDOM from "react-dom/client";
// RouterProvider: 讓整個 App 有路由功能
import { RouterProvider } from "react-router-dom";
// router: 你定義的所有頁面路由
import { router } from "./router";
// index.css: 放 Tailwind 全局 CSS
import "./index.css";
import { AuthProvider } from "./context/AuthContext"; // 匯入

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.common["X-Auth-Token"] =
  localStorage.getItem("token") || "";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // 把 router (<RouterProvider />) 渲染進 HTML 裡的 <div id="root">
  // React.StrictMode 是開發模式下的安全模式
  // ✔ 沒有這個檔案，就沒有畫面
  // ✔ 所有頁面都是被 RouterProvider 管理
  <React.StrictMode>
    {/* 用 AuthProvider 包住整個 App */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
