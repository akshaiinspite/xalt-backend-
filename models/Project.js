const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  category: { type: String, required: true }, // commercial, films, immersive
  subcategory: { type: String, required: true }, // e.g. CGI & VFX, Corporate Films
  title: { type: String, required: true },
  tag: { type: String, required: true },
  code: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
