import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME.trim(),
  api_key: process.env.CLOUD_API_KEY.trim(),
  api_secret: process.env.CLOUD_API_SECRET.trim(),
});

console.log("cloud name", process.env.CLOUD_NAME);

export default cloudinary;
