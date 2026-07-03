const mongoose = require('mongoose');

const categoryDetailSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // commercial, films, immersive
  title: { type: String, required: true },
  description: { type: String, required: true },
  heroImage: { type: String, required: true }
});

module.exports = mongoose.model('CategoryDetail', categoryDetailSchema);
