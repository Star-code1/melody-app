require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const songRoutes = require('./routes/songRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.set('strictQuery', false); // Thêm dòng này để tắt cảnh báo

// Kết nối MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sử dụng router
app.use('/api/songs', songRoutes);

// Chạy server
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
