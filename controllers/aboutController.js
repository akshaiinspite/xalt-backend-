const AboutPhoto = require('../models/AboutPhoto');
const inMemoryDb = require('../utils/inMemoryDb');

// Helper to seed default photos if none exist in MongoDB
async function seedDefaultAboutPhotosIfNeeded() {
  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) return;

  try {
    const count = await AboutPhoto.countDocuments();
    if (count === 0) {
      console.log('Seeding default about photos to MongoDB...');
      for (const item of inMemoryDb.defaultAboutPhotos) {
        await AboutPhoto.create({
          key: item.key,
          title: item.title,
          label: item.label,
          imageUrl: item.imageUrl,
          imageUrls: item.imageUrls || [item.imageUrl]
        });
      }
      console.log('Seeded default about photos successfully.');
    }
  } catch (err) {
    console.error('Error seeding default about photos:', err.message);
  }
}

exports.getAllAboutPhotos = async (req, res) => {
  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    return res.json(inMemoryDb.inMemoryAboutPhotos);
  }

  try {
    await seedDefaultAboutPhotosIfNeeded();
    const photos = await AboutPhoto.find().sort({ createdAt: 1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving about photos', error: err.message });
  }
};

exports.createAboutPhoto = async (req, res) => {
  const { key, title, label, imageUrl, imageUrls } = req.body;
  if (!key || !imageUrl) {
    return res.status(400).json({ message: 'Key and imageUrl are required' });
  }

  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const newPhoto = {
      _id: 'inmemory-about-' + Date.now(),
      key,
      title: title || '',
      label: label || '',
      imageUrl,
      imageUrls: imageUrls || [imageUrl],
      createdAt: new Date()
    };
    inMemoryDb.inMemoryAboutPhotos.push(newPhoto);
    return res.status(201).json(newPhoto);
  }

  try {
    const newPhoto = new AboutPhoto({ key, title, label, imageUrl, imageUrls: imageUrls || [imageUrl] });
    await newPhoto.save();
    res.status(201).json(newPhoto);
  } catch (err) {
    res.status(500).json({ message: 'Error creating about photo', error: err.message });
  }
};

exports.updateAboutPhoto = async (req, res) => {
  const { key, title, label, imageUrl, imageUrls } = req.body;
  if (!key || !imageUrl) {
    return res.status(400).json({ message: 'Key and imageUrl are required' });
  }

  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const idx = inMemoryDb.inMemoryAboutPhotos.findIndex(p => p._id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ message: 'About photo not found' });
    }
    inMemoryDb.inMemoryAboutPhotos[idx] = {
      ...inMemoryDb.inMemoryAboutPhotos[idx],
      key,
      title: title || '',
      label: label || '',
      imageUrl,
      imageUrls: imageUrls || [imageUrl]
    };
    return res.json(inMemoryDb.inMemoryAboutPhotos[idx]);
  }

  try {
    const updated = await AboutPhoto.findByIdAndUpdate(
      req.params.id,
      { key, title, label, imageUrl, imageUrls: imageUrls || [imageUrl] },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'About photo not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating about photo', error: err.message });
  }
};

exports.deleteAboutPhoto = async (req, res) => {
  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const initialLen = inMemoryDb.inMemoryAboutPhotos.length;
    inMemoryDb.inMemoryAboutPhotos = inMemoryDb.inMemoryAboutPhotos.filter(p => p._id !== req.params.id);
    if (inMemoryDb.inMemoryAboutPhotos.length === initialLen) {
      return res.status(404).json({ message: 'About photo not found' });
    }
    return res.json({ message: 'About photo deleted successfully', id: req.params.id });
  }

  try {
    const deleted = await AboutPhoto.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'About photo not found' });
    }
    res.json({ message: 'About photo deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting about photo', error: err.message });
  }
};
