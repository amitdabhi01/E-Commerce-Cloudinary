import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";

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

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log("server running on port", port);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer();

export default app;
