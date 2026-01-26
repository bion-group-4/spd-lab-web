const apiURL = process.env.REACT_APP_API_URL;

export const renderImage = (image, folder) => {
  if (!image) return "";
  if (image.startsWith("http")) {
    return image;
  }
  return `${apiURL}/uploads/${folder}/${image}`;
};
