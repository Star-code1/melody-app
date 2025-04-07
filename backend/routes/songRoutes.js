import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary"; // Sử dụng v2 API
import dotenv from "dotenv";
import Song from "../models/Song.js";
import streamifier from "streamifier"; // Thêm package này để xử lý buffer
import User from "../models/User.js";

dotenv.config();

const router = express.Router();

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cấu hình multer sử dụng memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "audioFile" && !file.mimetype.startsWith("audio/")) {
      return cb(new Error("Invalid audio file type"), false);
    }
    if (file.fieldname === "imageFile" && !file.mimetype.startsWith("image/")) {
      return cb(new Error("Invalid image file type"), false);
    }
    cb(null, true);
  },
});

// Hàm upload file lên Cloudinary với promise
const uploadToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// Route upload file lên Cloudinary
router.post(
  "/upload-with-files",
  upload.fields([
    { name: "audioFile", maxCount: 1 },
    { name: "imageFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (!req.files || !req.files.audioFile || !req.files.imageFile) {
        return res.status(400).json({ 
          error: "Both audio and image files are required." 
        });
      }

      const { title, description, artist } = req.body;
      
      // Upload file audio vào folder "audio"
      const audioResult = await uploadToCloudinary(
        req.files.audioFile[0].buffer,
        { 
          resource_type: "auto", // Tự động nhận diện resource type
          folder: "audio" // Chỉ định folder audio
        }
      );
      
      // Upload file image vào folder "images" 
      const imageResult = await uploadToCloudinary(
        req.files.imageFile[0].buffer,
        { 
          resource_type: "image",
          folder: "images" // Chỉ định folder images
        }
      );

      const song = new Song({
        title,
        description: description || "",
        artist,
        audioPath: audioResult.secure_url,
        imagePath: imageResult.secure_url,
      });

      await song.save();
      res.status(201).json(song);
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: err.message });
    }
  }
);
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: "Cần cung cấp từ khóa tìm kiếm" });
    }
    const songs = await Song.find({
      $or: [
        { title: { $regex: query, $options: "i" } },   
        { artist: { $regex: query, $options: "i" } }   
      ]
    }).sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get liked songs for the current user
router.get("/liked", async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: Missing userId" });
  } 
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const songIds = user.favoriteSongs;
    const likedSongs = await Song.find({ _id: { $in: songIds } });
    res.status(200).json(likedSongs);
  } catch (err) {
    console.error("Error getting liked songs:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/liked", async (req, res) => {
  try {
    const { songId, userId } = req.body;

    if (!songId) {
      return res.status(400).json({ error: "Song ID is required" });
    }

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const songExists = await Song.findById(songId);
    if (!songExists) {
      return res.status(400).json({ error: "Invalid song ID" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    if (user.favoriteSongs.includes(songId)) {
      return res.status(400).json({ error: "Song is already in liked songs" });
    }

    user.favoriteSongs.push(songId);
    await user.save();
    const updatedUser = await User.findById(userId);
    const favoriteSongs = updatedUser.favoriteSongs;

    res.status(201).json({
      message: "Song added to liked songs",
      favoriteSongs,
      user
    });

  } catch (err) {
    console.error("Error adding song to liked songs:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/liked", async (req, res) => {
  try {
    const { songId, userId } = req.body;

    if (!songId) {
      return res.status(400).json({ error: "Song ID is required" });
    }

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the song is in the user's favorites
    if (!user.favoriteSongs.includes(songId)) {
      return res.status(400).json({ error: "Song is not in liked songs" });
    }

    // Remove the song from favoriteSongs array
    user.favoriteSongs = user.favoriteSongs.filter(
      (id) => id.toString() !== songId
    );
    await user.save();

    res.status(200).json({
      message: "Song removed from liked songs",
      favoriteSongs: user.favoriteSongs
    });
  } catch (err) {
    console.error("Error removing song from liked songs:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;