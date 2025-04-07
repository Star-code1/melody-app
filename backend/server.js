import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

import userRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";

// Lấy __dirname trong môi trường ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load biến môi trường từ file .env
dotenv.config({ path: path.join(__dirname, ".env") });

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Kết nối MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB Atlas connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Các route API
app.use("/api/users", userRoutes);
app.use("/api/songs", songRoutes);

// Phục vụ thư mục chứa hình ảnh/audio
app.use("/public", express.static(path.join(__dirname, "public")));

// ✅ Phục vụ file frontend đã build (Vite)
app.use(express.static(path.join(__dirname, "../dist"))); // đổi "../dist" nếu cần
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
