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
    <div className="flex flex-col items-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/webp"
        className="rounded-lg"
      />
      <button
        onClick={capture}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Tirar Foto
      </button>
    </div>
  );
};

export default CameraComponent;
