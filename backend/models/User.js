const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    birthDate: {
        day: { type: Number, required: false },
        month: { type: Number, required: false },
        year: { type: Number, required: false },
    },
    gender: { type: String, default: "unknown" },
    agreeMarketing: { type: Boolean, default: false },
    agreeSharing: { type: Boolean, default: false },

    // Mảng chứa danh sách bài hát của người dùng
    songs: { type: mongoose.Schema.Types.Mixed, default: [] }, // Cho phép lưu bất kỳ dữ liệu gì

    // Mảng chứa danh sách bài hát yêu thích của người dùng
    favoriteSongs: { type: mongoose.Schema.Types.Mixed, default: [] }, // Cho phép lưu bất kỳ dữ liệu gì
});

module.exports = mongoose.model("User", UserSchema);
