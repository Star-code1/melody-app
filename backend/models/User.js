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
});

module.exports = mongoose.model("User", UserSchema);
