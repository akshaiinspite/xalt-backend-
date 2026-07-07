const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
require('dotenv').config();

const inMemoryDb = require('./utils/inMemoryDb');
const defaultPortfolio = require('./utils/defaultPortfolio');

// Models (for MongoDB seeding)
const Admin = require('./models/Admin');
const CategoryDetail = require('./models/CategoryDetail');
const SubcategoryDetail = require('./models/SubcategoryDetail');
const Project = require('./models/Project');
const TeamMember = require('./models/TeamMember');

// Routes
const adminRoutes = require('./routes/adminRoutes');
const jobRoutes = require('./routes/jobRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const projectRoutes = require('./routes/projectRoutes');
const reelRoutes = require('./routes/reelRoutes');
const expertiseRoutes = require('./routes/expertiseRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const teamMemberRoutes = require('./routes/teamMemberRoutes');
const contactRoutes = require('./routes/contactRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Seeding Helpers
async function seedDefaultAdmin() {
  try {
    const existingAdmin = await Admin.findOne({ email: 'admin@gmail.com' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('xaltadmin', 10);
      const defaultAdmin = new Admin({
        email: 'admin@gmail.com',
        password: hashedPassword
      });
      await defaultAdmin.save();
      console.log('Seeded default admin credentials to MongoDB: admin@gmail.com / xaltadmin');
    }
  } catch (error) {
    console.error('Error seeding default admin:', error);
  }
}

async function seedDefaultPortfolio() {
  try {
    const catCount = await CategoryDetail.countDocuments();
    if (catCount === 0) {
      console.log('Seeding default portfolio data to MongoDB...');
      
      for (const cat of defaultPortfolio) {
        await CategoryDetail.create({
          id: cat.id,
          title: cat.title,
          description: cat.description,
          heroImage: cat.heroImage
        });
        
        for (const sub of cat.subCategories) {
          await SubcategoryDetail.create({
            category: cat.id,
            title: sub.title,
            description: sub.description,
            image: sub.image
          });
          
          for (const proj of sub.galleryItems) {
            await Project.create({
              category: cat.id,
              subcategory: sub.title,
              title: proj.title,
              tag: proj.tag,
              code: proj.code,
              image: proj.image
            });
          }
        }
      }
      console.log('Seeding default portfolio completed successfully.');
    }
  } catch (err) {
    console.error('Error seeding default portfolio:', err);
  }
}

async function seedDefaultTeamMembers() {
  try {
    const memberCount = await TeamMember.countDocuments();
    if (memberCount === 0) {
      console.log('Seeding default team members to MongoDB...');
      for (const member of inMemoryDb.defaultTeamMembers) {
        const { _id, ...memberData } = member;
        await TeamMember.create(memberData);
      }
      console.log('Seeding default team members completed successfully.');
    }
  } catch (err) {
    console.error('Error seeding default team members:', err);
  }
}

// Database Connection
const dbUri = process.env.MONGODB_URI || 'mongodb+srv://developerinspitetech_db_user:rvwx1qDA7ijXxmDU@cluster0.oqphjhw.mongodb.net/xalt-studio?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbUri)
  .then(() => {
    console.log('MongoDB Connected successfully.');
    inMemoryDb.setIsMongoConnected(true);
    seedDefaultAdmin();
    seedDefaultPortfolio();
    seedDefaultTeamMembers();
  })
  .catch(err => {
    console.warn('MongoDB connection failed. Switched to ROBUST IN-MEMORY FALLBACK DB.');
    console.error('Error detail:', err.message);
    inMemoryDb.setIsMongoConnected(false);
  });

// Mount Routes
app.use('/api/admin', adminRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/reels', reelRoutes);
app.use('/api/expertise', expertiseRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/team-members', teamMemberRoutes);
app.use('/api/contact', contactRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running in production-mode on port ${PORT}`);
});
