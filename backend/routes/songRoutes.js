const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Song = require('../models/Song');
const User = require('../models/User');

// Cấu hình lưu file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = '';
        if (file.mimetype.startsWith('audio/')) {
            uploadPath = 'uploads/audio/';
        } else if (file.mimetype.startsWith('image/')) {
            uploadPath = 'uploads/images/';
        } else {
            return cb(new Error('Invalid file type'), null);
        }

        // Tạo thư mục nếu chưa tồn tại
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// API upload bài hát
router.post('/upload', upload.fields([
    { name: 'audioFile', maxCount: 1 }, 
    { name: 'imageFile', maxCount: 1 }
]), async (req, res) => {
    try {
        if (!req.files['audioFile'] || !req.files['imageFile']) {
            return res.status(400).json({ error: 'Cần có cả file nhạc và ảnh bìa!' });
        }

        // Kiểm tra userId trong request body
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({ error: 'Cần cung cấp ID người dùng!' });
        }

        // Tạo bài hát mới
        const song = new Song({
            title: req.body.title,
            description: req.body.description || '',
            artist: req.body.artist,
            audioPath: req.files['audioFile'][0].path,
            imagePath: req.files['imageFile'][0].path,
            uploader: userId, // Liên kết bài hát với user
        });

        // Lưu bài hát
        const savedSong = await song.save();

        // Thêm ID bài hát vào danh sách songs của user
        await User.findByIdAndUpdate(
            userId,
            { $push: { songs: savedSong._id } },
            { new: true }
        );

        res.status(201).json(savedSong);
    } catch (err) {
        console.error('Lỗi khi upload bài hát:', err);
        res.status(400).json({ error: err.message });
    }
});

// API lấy bài hát của một user cụ thể
router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate('songs');
        
        if (!user) {
            return res.status(404).json({ error: 'Không tìm thấy người dùng!' });
        }
        
        res.status(200).json(user.songs);
    } catch (err) {
        console.error('Lỗi khi lấy bài hát của user:', err);
        res.status(500).json({ error: err.message });
    }
});

// API lấy tất cả bài hát
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (err) {
        console.error('Lỗi khi lấy danh sách bài hát:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;