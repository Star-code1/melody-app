const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    songIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    birthDate: {
        day: { type: Number, required: true },
        month: { type: Number, required: true },
        year: { type: Number, required: true },
    },
    gender: { type: String, required: true },
    agreeMarketing: { type: Boolean, default: false },
    agreeSharing: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);