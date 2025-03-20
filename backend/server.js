import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cloudinary from "cloudinary";
import userRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";

// Cấu hình Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.set("strictQuery", false);

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/songs", songRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/api/cloudinary-status", (req, res) => {
  res.json({
    status: "ok",
    cloudinaryConfigured: !!process.env.CLOUDINARY_CLOUD_NAME
  });
});

app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
