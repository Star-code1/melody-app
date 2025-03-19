require("dotenv").config({ path: __dirname + "/.env" });// Chỉ định đường dẫn tuyệt đối đến .env
const path = require("path");

console.log("🔍 MONGO_URI:", process.env.MONGO_URI); // Debug xem biến có bị undefined không

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
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

app.use("/api/songs", songRoutes);
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get("/", (req, res) => {
  res.send("Welcome to Melody App API!");
});
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
