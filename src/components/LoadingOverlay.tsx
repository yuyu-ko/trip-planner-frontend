import { createPortal } from "react-dom"; // 1. 引入 createPortal

export default function LoadingOverlay() {
  // 2. 使用 createPortal 包裹原本的 JSX
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      {/* 3D Spinner */}
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-400 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-0 border-4 border-transparent border-r-purple-400 rounded-full animate-spin-slow-reverse"></div>
        <div className="absolute inset-0 border-4 border-transparent border-b-pink-400 rounded-full animate-spin-slow delay-100"></div>
      </div>

      {/* Text */}
      <div className="text-white text-2xl font-semibold tracking-wide">
        🌀 AI is creating your trip…
      </div>
    </div>,
    document.body // 3. 指定渲染目標為 body
  );
}
