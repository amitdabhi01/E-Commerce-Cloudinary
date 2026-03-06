import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRouter.js";

import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

app.use("/product", productRouter);

app.get("/", (req, res) => {
  res.status(200).json("Hello From Server");
});

app.use((req, res, next) => {
  next(new HttpError("Requested Routes Not Found", 404));
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Interval Server Error",
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("server running on port", PORT);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();

export default app;
