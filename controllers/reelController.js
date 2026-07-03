const Reel = require('../models/Reel');
const inMemoryDb = require('../utils/inMemoryDb');

exports.getReel = async (req, res) => {
  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    return res.json(inMemoryDb.inMemoryReel);
  }
  try {
    let reel = await Reel.findOne();
    if (!reel) {
      reel = new Reel({
        title: 'X.ALT Showreel',
        videoUrl: '/src/assets/videos/showreel.mp4'
      });
      await reel.save();
    }
    res.json(reel);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving reels', error: err.message });
  }
};

exports.updateReel = async (req, res) => {
  const { title, videoUrl } = req.body;
  if (!title || !videoUrl) {
    return res.status(400).json({ message: 'Title and videoUrl are required' });
  }

  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    inMemoryDb.inMemoryReel.title = title;
    inMemoryDb.inMemoryReel.videoUrl = videoUrl;
    return res.json(inMemoryDb.inMemoryReel);
  }

  try {
    let reel = await Reel.findOne();
    if (!reel) {
      reel = new Reel({ title, videoUrl });
    } else {
      reel.title = title;
      reel.videoUrl = videoUrl;
      reel.updatedAt = Date.now();
    }
    await reel.save();
    res.json(reel);
  } catch (err) {
    res.status(500).json({ message: 'Error updating showreel', error: err.message });
  }
};
