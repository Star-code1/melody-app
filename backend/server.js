require("dotenv").config({ path: "./backend/.env" });


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Melody App API!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
console.log("MONGO_URI from .env:", process.env.MONGO_URI);

