"use client";

import { useState } from "react";
import CameraManager from "@/components/camera/CameraManager";

export default function Home() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {isCameraOpen ? (
        <CameraManager onClose={handleCloseCamera} />
      ) : (
        <button
          onClick={handleOpenCamera}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Abrir Câmera
        </button>
      )}
    </main>
  );
}
