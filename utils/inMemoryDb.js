const bcrypt = require('bcryptjs');
const defaultPortfolio = require('./defaultPortfolio');

let isMongoConnected = false;

const inMemoryJobs = [
  {
    _id: 'job-1',
    title: 'Lead 3D CGI Artist',
    experience: '5+ Years',
    location: 'Kochi Studio / Hybrid',
    description: 'Expertise in Blender/Cinema4D, photorealistic lighting, octane/redshift rendering, and liquid simulations to lead our Kochi CGI division. Ability to lead visual design concepts from script to screen.'
  },
  {
    _id: 'job-2',
    title: 'Senior Creative Developer',
    experience: '4+ Years',
    location: 'Remote / Kochi',
    description: 'Join our engineering team to build premium interactive portfolios and web experiences. Strong proficiency in React, Three.js, GSAP/Framer Motion, and WebGL shaders is required.'
  },
  {
    _id: 'job-3',
    title: 'Motion Designer & Compositor',
    experience: '3+ Years',
    location: 'Kochi Studio',
    description: 'Advanced compositing and motion graphics artist wanted. High proficiency in After Effects, Premiere Pro, and VFX compositing to craft cinematic animations, dynamic cuts, and audio-reactive showreels.'
  }
];

let inMemoryCategories = [];
let inMemorySubcategories = [];
let inMemoryProjects = [];
let inMemoryReel = {
  _id: 'reel-1',
  title: 'X.ALT Showreel',
  videoUrl: '/src/assets/videos/showreel.mp4'
};
let inMemoryAdmins = [];

function seedMemoryPortfolio() {
  inMemoryCategories = defaultPortfolio.map(cat => ({
    _id: 'mem-cat-' + cat.id,
    id: cat.id,
    title: cat.title,
    description: cat.description,
    heroImage: cat.heroImage
  }));

  defaultPortfolio.forEach(cat => {
    cat.subCategories.forEach((sub, subIdx) => {
      inMemorySubcategories.push({
        _id: `mem-sub-${cat.id}-${subIdx}`,
        category: cat.id,
        title: sub.title,
        description: sub.description,
        image: sub.image
      });

      sub.galleryItems.forEach((proj, projIdx) => {
        inMemoryProjects.push({
          _id: `mem-proj-${cat.id}-${subIdx}-${projIdx}`,
          category: cat.id,
          subcategory: sub.title,
          title: proj.title,
          tag: proj.tag,
          code: proj.code,
          image: proj.image
        });
      });
    });
  });
}

async function seedMemoryAdmin() {
  const hashedPassword = await bcrypt.hash('xaltadmin', 10);
  inMemoryAdmins.push({
    email: 'admin@gmail.com',
    password: hashedPassword
  });
}

// Perform initial in-memory seedings
seedMemoryPortfolio();
seedMemoryAdmin();

module.exports = {
  getIsMongoConnected: () => isMongoConnected,
  setIsMongoConnected: (val) => { isMongoConnected = val; },
  inMemoryJobs,
  inMemoryCategories,
  inMemorySubcategories,
  inMemoryProjects,
  inMemoryReel,
  inMemoryAdmins
};
