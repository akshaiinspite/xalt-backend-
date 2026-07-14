const mongoose = require('mongoose');

const reelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  heroVideoUrl: { type: String, default: '/uploads/logo video xalt.mp4' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reel', reelSchema);
