"use client";

import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";

interface CameraComponentProps {
  onCapture: (imageSrc: string) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [webcamRef, onCapture]);

  return (
    <div className="relative w-full h-full">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/webp"
        videoConstraints={{ facingMode: "environment" }}
        className="w-full h-full object-cover"
      />
      <button
        onClick={capture}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Tirar Foto
      </button>
    </div>
  );
};

export default CameraComponent;
