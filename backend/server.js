import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

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

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB Atlas connection error:", err));

// Enable CORS for all routes and origins
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/users", userRoutes);
app.use("/api/songs", songRoutes);

// Serve static assets in production
// Determine if we're in production
const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  // Serve static files from the frontend build directory
  const frontendPath = path.resolve(__dirname, "../dist");
  app.use(express.static(frontendPath));

  // Handle static image files
  app.use("/BackGround.png", (req, res) => {
    res.sendFile(path.resolve(frontendPath, "BackGround.png"));
  });

  // For any other request, send to index.html (client-side routing)
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
} else {
  // Development mode
  // Phục vụ tệp tĩnh từ thư mục public (hình ảnh và audio)
  app.use("/public", express.static(path.join(__dirname, "public")));

  // Root route for API testing
  app.get("/", (req, res) => {
    res.send("🎵 Music App API is running...");
  });
}

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    error: true,
    message: isProduction ? "Internal Server Error" : err.message,
  });
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
