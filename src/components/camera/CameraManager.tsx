"use client";

import React, { useState } from "react";
import CameraComponent from "./CameraComponent";
import PhotoPreview from "./PhotoPreview";

interface CameraManagerProps {
  onClose: (photos: string[]) => void;
}

const CameraManager: React.FC<CameraManagerProps> = ({ onClose }) => {
  const [photos, setPhotos] = useState<string[]>([]);

  const handleCapture = (imageSrc: string) => {
    setPhotos([...photos, imageSrc]);
  };

  const handleDone = () => {
    onClose(photos);
  };

  return (
    <div className="relative w-screen h-screen">
      <CameraComponent onCapture={handleCapture} />
      <div className="absolute top-0 left-0 w-full p-4 bg-black bg-opacity-50 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-center text-white">
          Tire Fotos
        </h1>
        <button
          onClick={handleDone}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Concluir
        </button>
      </div>
      <div className="absolute bottom-20 left-0 w-full">
        <PhotoPreview photos={photos} />
      </div>
    </div>
  );
};

export default CameraManager;
