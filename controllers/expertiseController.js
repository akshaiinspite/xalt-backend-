const Expertise = require('../models/Expertise');
const inMemoryDb = require('../utils/inMemoryDb');

exports.getExpertise = async (req, res) => {
  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  
  const defaultGridImages = {
    'Films & Entertainment': '/uploads/gallery-img-1.jpg',
    'Commercial Projects': '/uploads/gallery-img-3.jpg',
    'AR & VR Experiences': '/uploads/gallery-img-5.jpg'
  };

  if (!isMongoConnected) {
    // Ensure in-memory items have gridImage
    inMemoryDb.inMemoryExpertise.forEach(item => {
      if (!item.gridImage) {
        item.gridImage = defaultGridImages[item.title] || '';
      }
    });
    return res.json(inMemoryDb.inMemoryExpertise);
  }
  
  try {
    let items = await Expertise.find().sort({ order: 1, createdAt: 1 });
    // If MongoDB is connected but has no items, seed the default ones
    if (items.length === 0) {
      const seedData = inMemoryDb.defaultExpertise.map(({ _id, ...rest }) => rest);
      const seeded = await Expertise.insertMany(seedData);
      return res.json(seeded);
    }
    
    // Check if any item lacks gridImage, and update it in DB
    let needRefetch = false;
    for (let item of items) {
      if (!item.gridImage) {
        await Expertise.findByIdAndUpdate(item._id, {
          gridImage: defaultGridImages[item.title] || ''
        });
        needRefetch = true;
      }
    }
    
    if (needRefetch) {
      items = await Expertise.find().sort({ order: 1, createdAt: 1 });
    }
    
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving expertise items', error: err.message });
  }
};

exports.createExpertise = async (req, res) => {
  const { title, category, description, image, gridImage, link, order } = req.body;
  if (!title || !category || !description || !image) {
    return res.status(400).json({ message: 'Title, category, description, and image are required' });
  }

  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const newItem = {
      _id: 'exp-' + Date.now(),
      title,
      category,
      description,
      image,
      gridImage: gridImage || '',
      link: link || '',
      order: order !== undefined ? Number(order) : 0,
      createdAt: new Date()
    };
    inMemoryDb.inMemoryExpertise.push(newItem);
    inMemoryDb.inMemoryExpertise.sort((a, b) => (a.order - b.order) || (new Date(a.createdAt) - new Date(b.createdAt)));
    return res.json(newItem);
  }

  try {
    const newItem = new Expertise({
      title,
      category,
      description,
      image,
      gridImage: gridImage || '',
      link: link || '',
      order: order !== undefined ? Number(order) : 0
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Error creating expertise item', error: err.message });
  }
};

exports.updateExpertise = async (req, res) => {
  const { id } = req.params;
  const { title, category, description, image, gridImage, link, order } = req.body;

  if (!title || !category || !description || !image) {
    return res.status(400).json({ message: 'Title, category, description, and image are required' });
  }

  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const idx = inMemoryDb.inMemoryExpertise.findIndex(item => item._id === id);
    if (idx === -1) {
      return res.status(404).json({ message: 'Expertise item not found' });
    }
    inMemoryDb.inMemoryExpertise[idx] = {
      ...inMemoryDb.inMemoryExpertise[idx],
      title,
      category,
      description,
      image,
      gridImage: gridImage || '',
      link: link || '',
      order: order !== undefined ? Number(order) : 0
    };
    inMemoryDb.inMemoryExpertise.sort((a, b) => (a.order - b.order) || (new Date(a.createdAt) - new Date(b.createdAt)));
    return res.json(inMemoryDb.inMemoryExpertise[idx]);
  }

  try {
    const updated = await Expertise.findByIdAndUpdate(
      id,
      { title, category, description, image, gridImage: gridImage || '', link: link || '', order: order !== undefined ? Number(order) : 0 },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Expertise item not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating expertise item', error: err.message });
  }
};

exports.deleteExpertise = async (req, res) => {
  const { id } = req.params;

  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const idx = inMemoryDb.inMemoryExpertise.findIndex(item => item._id === id);
    if (idx === -1) {
      return res.status(404).json({ message: 'Expertise item not found' });
    }
    const deleted = inMemoryDb.inMemoryExpertise.splice(idx, 1);
    return res.json({ message: 'Expertise item deleted', deleted: deleted[0] });
  }

  try {
    const deleted = await Expertise.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Expertise item not found' });
    }
    res.json({ message: 'Expertise item deleted', deleted });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting expertise item', error: err.message });
  }
};
