export const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
  const image = new Image();
  image.src = imageSrc;

  // Kırpılacak resmin boyutlarını alıyoruz.
  const maxSize = Math.max(croppedAreaPixels.width, croppedAreaPixels.height);
  const canvas = document.createElement("canvas");
  canvas.width = maxSize;
  canvas.height = maxSize;
  const ctx = canvas.getContext("2d");

  // Resmi yuvarlak bir maskeyle kırpıyoruz.
  ctx.beginPath();
  ctx.arc(maxSize / 2, maxSize / 2, maxSize / 2, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.clip();

  // Resmi yuvarlak maske içine alınan kısmıyla çiziyoruz.
  const xOffset = (maxSize - croppedAreaPixels.width) / 2;
  const yOffset = (maxSize - croppedAreaPixels.height) / 2;
  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    xOffset,
    yOffset,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  // Son olarak, kırpılmış resmi dataURL formatında döndürüyoruz.
  const dataUrl = canvas.toDataURL("image/png");
  return dataUrl;
};
