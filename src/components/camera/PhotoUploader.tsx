"use client";

import React from "react";

interface PhotoUploaderProps {
  photos: string[];
  folderName: string;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ photos, folderName }) => {
  const getAccessToken = async () => {
    try {
      const response = await fetch(
        "https://gcs-token-service.vercel.app/api/generate-token",
        {
          method: "POST",
        }
      );
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Erro ao obter o token de acesso:", error);
      return null;
    }
  };

  const uploadPhoto = async (accessToken: string, photo: string, fileName: string) => {
    const blob = await fetch(photo).then((res) => res.blob());
    const url = `https://storage.googleapis.com/upload/storage/v1/b/saas_ofcina/o?uploadType=media&name=${folderName}%2F${fileName}`;

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "image/webp",
        },
        body: blob,
      });
      console.log(`Foto ${fileName} enviada com sucesso!`);
    } catch (error) {
      console.error(`Erro ao enviar a foto ${fileName}:`, error);
    }
  };

  const handleUpload = async () => {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return;
    }

    // Comentado para futura customização dos nomes dos arquivos
    // const fileNames = ["foto1.webp", "foto2.webp", "foto3.webp", "foto4.webp"];

    photos.forEach((photo, index) => {
      // Usando um nome de arquivo genérico por enquanto
      const fileName = `foto_${index + 1}.webp`;
      uploadPhoto(accessToken, photo, fileName);
    });
  };

  return (
    <button
      onClick={handleUpload}
      className="px-4 py-2 bg-green-500 text-white rounded-lg"
    >
      Enviar Fotos
    </button>
  );
};

export default PhotoUploader;
