const mongoose = require('mongoose');

const subcategoryDetailSchema = new mongoose.Schema({
  category: { type: String, required: true }, // commercial, films, immersive
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('SubcategoryDetail', subcategoryDetailSchema);
