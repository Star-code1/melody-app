import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import songRoutes from "./routes/songRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors(
  {
    origin: "https://melody-t9y4.onrender.com"  // Thay đổi với domain frontend của bạn
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Đường dẫn tĩnh tới thư mục 'dist' nằm ở root
const frontendBuildPath = path.join(__dirname, "dist");
app.use(express.static(frontendBuildPath));


// API Routes - Mount with /api prefix
app.use("/api/songs", songRoutes);

// Catch-all route to serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
