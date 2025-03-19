require("dotenv").config({ path: __dirname + "/.env" });// Chỉ định đường dẫn tuyệt đối đến .env

console.log("🔍 MONGO_URI:", process.env.MONGO_URI); // Debug xem biến có bị undefined không

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const songRoutes = require("./routes/songRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/songs", songRoutes);
// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
