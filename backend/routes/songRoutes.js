const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Song = require('../models/Song');

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

        const song = new Song({
            title: req.body.title,
            description: req.body.description || '',
            artist: req.body.artist,  // Đảm bảo khớp với frontend
            audioPath: req.files['audioFile'][0].path,
            imagePath: req.files['imageFile'][0].path,
        });

        await song.save();
        res.status(201).json(song);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


module.exports = router;
