const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadImage = async (req, res) => {
  try {
    let result = await cloudinary.uploader.upload(req.body.image, {
      folder: "BLOGGER",
    });
    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
