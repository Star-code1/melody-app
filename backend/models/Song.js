import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    artist: { type: String, required: true },
    audioPath: { type: String, required: true },
    imagePath: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Song', SongSchema);
