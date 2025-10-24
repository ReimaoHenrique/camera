"use client";

import React, { useState } from "react";
import CameraComponent from "./CameraComponent";
import PhotoPreview from "./PhotoPreview";
import PhotoUploader from "./PhotoUploader";

const CameraManager: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const folderName = "Henrique Venceu"; // Este nome pode ser dinâmico no futuro

  const handleCapture = (imageSrc: string) => {
    if (photos.length < 4) {
      setPhotos([...photos, imageSrc]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Tire 4 Fotos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {photos.length < 4 ? (
            <CameraComponent onCapture={handleCapture} />
          ) : (
            <p className="text-center text-green-500 font-bold">
              Você já tirou 4 fotos!
            </p>
          )}
        </div>
        <div>
          <PhotoPreview photos={photos} />
        </div>
      </div>
      <div className="text-center mt-4">
        <PhotoUploader photos={photos} folderName={folderName} />
      </div>
    </div>
  );
};

export default CameraManager;
