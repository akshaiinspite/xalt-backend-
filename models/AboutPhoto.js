const mongoose = require('mongoose');

const aboutPhotoSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  title: { type: String, default: '' },
  label: { type: String, default: '' },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AboutPhoto', aboutPhotoSchema);
