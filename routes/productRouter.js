import express from "express";

import productController from "../controller/productController.js";
import uploads from "../middleware/upload.js";

const router = express.Router();

router.post("/add", uploads.single("image"), productController.createProduct);

export default router;
