"use client";

import React, { useState } from "react";
import CameraComponent from "./CameraComponent";
import PhotoPreview from "./PhotoPreview";
import PhotoUploader from "./PhotoUploader";

interface CameraManagerProps {
  onClose: () => void;
}

const CameraManager: React.FC<CameraManagerProps> = ({ onClose }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const folderName = "Henrique Venceu"; // Este nome pode ser dinâmico no futuro

  const handleCapture = (imageSrc: string) => {
    setPhotos([...photos, imageSrc]);
  };

  return (
    <div className="relative w-screen h-screen">
      <CameraComponent onCapture={handleCapture} />
      <div className="absolute top-0 left-0 w-full p-4 bg-black bg-opacity-50 flex justify-between items-center">
        <button onClick={onClose} className="text-white font-bold">
          Fechar
        </button>
        <h1 className="text-2xl font-bold text-center text-white">
          Tire Fotos
        </h1>
        <PhotoUploader photos={photos} folderName={folderName} />
      </div>
      <div className="absolute bottom-20 left-0 w-full">
        <PhotoPreview photos={photos} />
      </div>
    </div>
  );
};

export default CameraManager;
