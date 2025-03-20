import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Song from "../models/Song.js";

const router = express.Router();


// Update your CloudinaryStorage configuration to handle audio files correctly
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'melody',
    // Remove the resource_type here as it will be set conditionally per file
    allowedFormats: ['jpg', 'png', 'mp3', 'wav'],
    transformation: [{ quality: 'auto' }],
    // Add this function to set the correct resource type based on file
    resource_type: (req, file) => {
      return file.mimetype.startsWith('audio/') ? 'video' : 'auto';
    }    
  }
});

// Set up Cloudinary-based multer upload
const cloudinaryUpload = multer({
  storage: cloudinaryStorage,
  limits: {
    fileSize: 50 * 1024 * 1024 // Giới hạn kích thước file: 50MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'audioFile' && !file.mimetype.startsWith('audio/')) {
      return cb(new Error('Invalid audio file type'), false);
    }
    if (file.fieldname === 'imageFile' && !file.mimetype.startsWith('image/')) {
      return cb(new Error('Invalid image file type'), false);
    }
    cb(null, true);
  }
});

// Upload song with files directly to Cloudinary
router.post('/upload-with-files', (req, res, next) => {
  cloudinaryUpload.fields([
    { name: 'audioFile', maxCount: 1 },
    { name: 'imageFile', maxCount: 1 }
  ])(req, res, (err) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size exceeds the allowed limit (50MB).' });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { title, description, artist } = req.body;

    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ error: 'Both audio and image files are required.' });
    }

    const audioPath = req.files.audioFile[0].path;
    const imagePath = req.files.imageFile[0].path;

    const song = new Song({
      title,
      description: description || '',
      artist,
      audioPath,
      imagePath
    });

    await song.save();
    res.status(201).json(song);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }
});


// Keep the original upload route for compatibility with client-side uploads
router.post('/upload', async (req, res) => {
  try {
    // Get data from request body
    const { title, description, artist, audioPath, imagePath } = req.body;
    
    // Validate required fields
    if (!title || !artist || !audioPath || !imagePath) {
      return res.status(400).json({ 
        error: 'Missing song information! Title, artist, audio URL and image URL are required.' 
      });
    }
  
    // Create new song with the provided URLs
    const song = new Song({
      title,
      description: description || '',
      artist,
      audioPath,
      imagePath
    });
  
    // Save to database
    await song.save();
    res.status(201).json(song);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET song by ID
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.status(200).json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE song
router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    
    // Check if the song uses Cloudinary URLs
    if (song.audioPath.includes('cloudinary.com')) {
      try {
        // Extract public IDs from Cloudinary URLs
        const getPublicIdFromUrl = (url) => {
          const parts = url.split('/');
          const filename = parts.pop().split('.')[0];
          const folder = parts[parts.length - 1];
          return `${folder}/${filename}`;
        };
        
        
        const audioPublicId = getPublicIdFromUrl(song.audioPath);
        const imagePublicId = getPublicIdFromUrl(song.imagePath);
        
        // Delete files from Cloudinary
        await cloudinary.uploader.destroy(imagePublicId);
        await cloudinary.uploader.destroy(audioPublicId, { resource_type: 'video' }); // audio files are 'video' type in Cloudinary
      } catch (cloudinaryError) {
        console.error('Error deleting from Cloudinary:', cloudinaryError);
        // Continue with deleting the database entry even if Cloudinary deletion fails
      }
    }
    
    // Delete song from database
    await Song.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Song deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;