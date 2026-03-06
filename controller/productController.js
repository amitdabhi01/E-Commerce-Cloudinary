import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/cloudinary.js";
import Product from "../model/Product.js";

const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image must be required" });
    }

    const product = await Product.create({
      name,
      price,
      category,
      description,
      image: req.file.path,
      cloudinary_id: req.file.filename,
    });

    res.status(201).json(product);
  } catch (error) {
    next(new HttpError(error.message, 400));
  }
};

const 

export default (createProduct);
