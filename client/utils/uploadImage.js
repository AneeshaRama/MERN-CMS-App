import axios from "axios";
import Resizer from "react-image-file-resizer";

const resizeFile = (file) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      700,
      400,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
};

export const uploadImage = async (file) => {
  try {
    const image = await resizeFile(file);
    const { data } = await axios.post("/upload-image", { image });
    console.log(data);
    return data.url;
  } catch (error) {
    console.log(error.message);
  }
};
