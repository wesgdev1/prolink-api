import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

export const upload = multer({ dest: "temp/" });

export const uploadFiles = async (
  file,
  folder = "imagesBlog",
  type = "photo"
) => {
  const photoConfig = {
    folder,
    // width: 400,
    // height: 400,
    use_filename: true,
    unique_filename: false,
  };

  const pdfConfig = {
    folder,
    use_filename: true,
    unique_filename: false,
    resource_type: "auto",
  };

  const config = type === "photo" ? photoConfig : pdfConfig;

  try {
    const result = await cloudinary.uploader.upload(file, config);
    console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};
