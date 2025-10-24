"use client";

import { useState } from "react";
import CameraManager from "@/components/camera/CameraManager";
import { uploadPhotos } from "@/lib/gcsUploader";
import Image from "next/image";

export default function Home() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleCloseCamera = (capturedPhotos: string[]) => {
    setPhotos(capturedPhotos);
    setIsCameraOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name) {
      alert("O campo 'Nome' é obrigatório.");
      return;
    }
    // O nome da pasta será o valor do campo 'Nome'
    await uploadPhotos(photos, name);

    // Exibe os dados do formulário no console
    console.log({
      name,
      description,
      photos,
    });

    // Limpa o formulário
    setName("");
    setDescription("");
    setPhotos([]);

    alert("Formulário enviado com sucesso!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
      {isCameraOpen ? (
        <CameraManager onClose={handleCloseCamera} />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">
            Criar Novo Registro
          </h1>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Descrição
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              rows={4}
            />
          </div>
          <div className="mb-6">
            <button
              type="button"
              onClick={handleOpenCamera}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg mb-4"
            >
              Adicionar Fotos
            </button>
            <div className="flex flex-wrap justify-center">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="w-24 h-24 m-1 border-2 border-gray-300 rounded-lg overflow-hidden"
                >
                  <Image
                    src={photo}
                    alt={`Foto ${index + 1}`}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Enviar
          </button>
        </form>
      )}
    </main>
  );
}
