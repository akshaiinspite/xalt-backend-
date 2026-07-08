const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  category: { type: String, required: true }, // commercial, films, immersive
  subcategory: { type: String, required: true }, // e.g. CGI & VFX, Corporate Films
  title: { type: String, required: true },
  tag: { type: String, required: true },
  code: { type: String, default: '' },
  year: { type: String, default: '' },
  client: { type: String, default: '' },
  image: { type: String, required: true },
  video: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
