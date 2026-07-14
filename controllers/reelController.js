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
        videoUrl: '/src/assets/videos/showreel.mp4',
        heroVideoUrl: '/uploads/logo video xalt.mp4'
      });
      await reel.save();
    }
    res.json(reel);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving reels', error: err.message });
  }
};

exports.updateReel = async (req, res) => {
  const { title, videoUrl, heroVideoUrl } = req.body;
  if (!title || !videoUrl) {
    return res.status(400).json({ message: 'Title and videoUrl are required' });
  }

  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    inMemoryDb.inMemoryReel.title = title;
    inMemoryDb.inMemoryReel.videoUrl = videoUrl;
    if (heroVideoUrl !== undefined) {
      inMemoryDb.inMemoryReel.heroVideoUrl = heroVideoUrl;
    }
    return res.json(inMemoryDb.inMemoryReel);
  }

  try {
    let reel = await Reel.findOne();
    if (!reel) {
      reel = new Reel({ 
        title, 
        videoUrl, 
        heroVideoUrl: heroVideoUrl || '/uploads/logo video xalt.mp4' 
      });
    } else {
      reel.title = title;
      reel.videoUrl = videoUrl;
      if (heroVideoUrl !== undefined) {
        reel.heroVideoUrl = heroVideoUrl;
      }
      reel.updatedAt = Date.now();
    }
    await reel.save();
    res.json(reel);
  } catch (err) {
    res.status(500).json({ message: 'Error updating showreel', error: err.message });
  }
};
