const getAccessToken = async (): Promise<string | null> => {
  try {
    const response = await fetch(
      "https://gcs-token-service.vercel.app/api/generate-token",
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.statusText}`);
    }
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Erro ao obter o token de acesso:", error);
    return null;
  }
};

const uploadPhoto = async (
  accessToken: string,
  photo: string,
  folderName: string,
  fileName: string
): Promise<void> => {
  try {
    const blob = await fetch(photo).then((res) => res.blob());
    const url = `https://storage.googleapis.com/upload/storage/v1/b/saas_ofcina/o?uploadType=media&name=${encodeURIComponent(
      folderName
    )}%2F${encodeURIComponent(fileName)}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "image/webp",
      },
      body: blob,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload photo: ${response.statusText}`);
    }

    console.log(`Foto ${fileName} enviada com sucesso!`);
  } catch (error) {
    console.error(`Erro ao enviar a foto ${fileName}:`, error);
  }
};

export const uploadPhotos = async (
  photos: string[],
  folderName: string
): Promise<void> => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    console.error("Não foi possível fazer o upload. O token de acesso é nulo.");
    return;
  }

  // O nome do arquivo pode ser customizado aqui se necessário no futuro
  const uploadPromises = photos.map((photo, index) => {
    const fileName = `foto_${index + 1}.webp`;
    return uploadPhoto(accessToken, photo, folderName, fileName);
  });

  await Promise.all(uploadPromises);
  console.log("Todas as fotos foram processadas.");
};
