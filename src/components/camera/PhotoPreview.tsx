"use client";

import React from "react";
import Image from "next/image";

interface PhotoPreviewProps {
  photos: string[];
}

const PhotoPreview: React.FC<PhotoPreviewProps> = ({ photos }) => {
  return (
    <div className="flex flex-wrap justify-center mt-4">
      {photos.map((photo, index) => (
        <div key={index} className="w-1/4 p-2">
          <Image
            src={photo}
            alt={`Foto ${index + 1}`}
            width={100}
            height={100}
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoPreview;
