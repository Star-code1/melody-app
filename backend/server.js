import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary"; // Sửa thành v2 API

import userRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

// Cấu hình Cloudinary từ biến môi trường
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.set("strictQuery", false);

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB Atlas connection error:", err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Đăng ký router
app.use("/api/users", userRoutes);
app.use("/api/songs", songRoutes);

// Phục vụ tệp tĩnh từ thư mục public (hình ảnh và audio)
app.use("/public", express.static(path.join(__dirname, "public")));

// Root route
app.get("/", (req, res) => {
  res.send("🎵 Music App API is running...");
});

app.listen(PORT, () =>
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
);