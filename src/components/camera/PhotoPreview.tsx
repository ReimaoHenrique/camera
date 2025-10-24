"use client";

import React from "react";
import Image from "next/image";

interface PhotoPreviewProps {
  photos: string[];
}

const PhotoPreview: React.FC<PhotoPreviewProps> = ({ photos }) => {
  return (
    <div className="flex justify-center w-full">
      {photos.map((photo, index) => (
        <div key={index} className="w-16 h-16 mx-2 border-2 border-white rounded-lg overflow-hidden">
          <Image
            src={photo}
            alt={`Foto ${index + 1}`}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoPreview;
