const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '2001:4860:4860::8888', '2001:4860:4860::8844']);
} catch (err) {
  console.warn('Unable to set DNS servers:', err.message);
}

const mongoose = require('mongoose');
const Project = require('./models/Project');

const dbUri = 'mongodb+srv://developerinspitetech_db_user:rvwx1qDA7ijXxmDU@cluster0.oqphjhw.mongodb.net/xalt-studio?retryWrites=true&w=majority&appName=Cluster0';

async function run() {
  try {
    await mongoose.connect(dbUri);
    console.log('Connected to MongoDB.');

    const project = await Project.findOne({ title: /ENERGY TECH/i });
    if (!project) {
      console.log('ENERGY TECH project not found.');
      return;
    }

    console.log('Found project:', project.title);
    console.log('Original galleryImages:', project.galleryImages);

    // Keep only strings starting with http or /uploads, and that are not massive text blocks
    const cleanImages = project.galleryImages.filter(img => {
      if (!img) return false;
      const trimImg = img.trim();
      return (trimImg.startsWith('http') || trimImg.startsWith('/uploads')) && trimImg.length < 500;
    });

    project.galleryImages = cleanImages;
    await project.save();
    console.log('Updated galleryImages:', project.galleryImages);
  } catch (err) {
    console.error('Error during cleanup:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

run();
