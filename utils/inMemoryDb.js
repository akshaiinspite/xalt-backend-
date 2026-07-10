const bcrypt = require('bcryptjs');
const defaultPortfolio = require('./defaultPortfolio');

let isMongoConnected = false;

let inMemoryCategories = [];
let inMemorySubcategories = [];
let inMemoryProjects = [];
let inMemoryReel = {
  _id: 'reel-1',
  title: 'X.ALT Showreel',
  videoUrl: '/src/assets/videos/showreel.mp4'
};
let inMemoryAdmins = [];

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

const defaultExpertise = [
  {
    _id: 'exp-1',
    title: 'Films & Entertainment',
    category: 'VFX & Post Production',
    description: 'We curate and aggregate breathtaking visual sequences for feature films, leveraging deep relationships across the worldwide entertainment industry.',
    image: '/uploads/gallery-img-1.jpg',
    link: '#projects/films',
    order: 0,
    createdAt: new Date('2026-01-01')
  },
  {
    _id: 'exp-2',
    title: 'Commercial Projects',
    category: 'CGI & Motion Design',
    description: 'Seamlessly integrating premium tech aesthetics with robust design systems to elevate modern brand identities and digital experiences.',
    image: '/uploads/gallery-img-3.jpg',
    link: '#projects/commercial',
    order: 1,
    createdAt: new Date('2026-01-02')
  },
  {
    _id: 'exp-3',
    title: 'AR & VR Experiences',
    category: 'Spatial Computing',
    description: 'Immersive digital environments and spatial computing solutions that bridge the physical and virtual worlds for interactive storytelling.',
    image: '/uploads/gallery-img-5.jpg',
    link: '#projects/immersive',
    order: 2,
    createdAt: new Date('2026-01-03')
  }
];

let inMemoryExpertise = JSON.parse(JSON.stringify(defaultExpertise));

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
          code: proj.code || proj.year || '',
          year: proj.year || proj.code || '',
          client: proj.client || '',
          image: proj.image,
          video: proj.video || ''
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

const defaultTeamMembers = [
  {
    _id: 'team-1',
    name: 'Alex Mercer',
    role: 'Founder / CEO',
    department: 'ADMINISTRATIVE_CORE',
    bio: 'Key visionary behind X.ALT. Directs administrative strategies, business partnerships, and structural expansion plans to redefine digital design standards.',
    gradient: 'linear-gradient(135deg, #050505 0%, #300006 100%)',
    image: '/uploads/alex_mercer.png',
    empNo: '01',
    order: 1
  },
  {
    _id: 'team-2',
    name: 'Sarah Connor',
    role: 'Manager',
    department: 'OPERATION_MGMT',
    bio: 'Supervises studio workflow, project milestones, and resource allocation. Bridges organizational systems with production pipelines for flawless delivery.',
    gradient: 'linear-gradient(135deg, #101012 0%, #440d16 100%)',
    image: '/uploads/sarah_connor.png',
    empNo: '02',
    order: 2
  },
  {
    _id: 'team-3',
    name: 'David Miller',
    role: 'Senior 3D Environment Artist',
    department: 'CREATIVE_3D_LAB',
    bio: 'Specializes in hyper-realistic 3D environment architecture, displacement shading, and immersive rendering techniques to develop state-of-the-art visual assets.',
    gradient: 'linear-gradient(135deg, #1b0206 0%, #520510 100%)',
    image: '/uploads/david_miller.png',
    empNo: '03',
    order: 3
  },
  {
    _id: 'team-4',
    name: 'Michael Chen',
    role: 'Senior 3D Environment Artist',
    department: 'CREATIVE_3D_LAB',
    bio: 'Specializes in hyper-realistic 3D environment architecture, displacement shading, and immersive rendering techniques to develop state-of-the-art visual assets.',
    gradient: 'linear-gradient(135deg, #161616 0%, #700a18 100%)',
    image: '/uploads/michael_chen.png',
    empNo: '04',
    order: 4
  },
  {
    _id: 'team-5',
    name: 'Marcus Vance',
    role: 'Creative Director',
    department: 'CREATIVE_3D_LAB',
    bio: 'Specializes in hyper-realistic 3D environment architecture, displacement shading, and immersive rendering techniques to develop state-of-the-art visual assets.',
    gradient: 'linear-gradient(135deg, #120318 0%, #4a030a 100%)',
    image: '/uploads/marcus_vance.png',
    empNo: '05',
    order: 5
  },
  {
    _id: 'team-6',
    name: 'Liam Vance',
    role: 'Partner',
    department: 'CREATIVE_3D_LAB',
    bio: 'Specializes in hyper-realistic 3D environment architecture, displacement shading, and immersive rendering techniques to develop state-of-the-art visual assets.',
    gradient: 'linear-gradient(135deg, #040108 0%, #350218 100%)',
    image: '/uploads/liam_vance.png',
    empNo: '06',
    order: 6
  }
];

let inMemoryTeamMembers = JSON.parse(JSON.stringify(defaultTeamMembers));

module.exports = {
  getIsMongoConnected: () => isMongoConnected,
  setIsMongoConnected: (val) => { isMongoConnected = val; },
  inMemoryJobs,
  inMemoryCategories,
  inMemorySubcategories,
  inMemoryProjects,
  inMemoryReel,
  inMemoryAdmins,
  defaultExpertise,
  inMemoryExpertise,
  defaultTeamMembers,
  inMemoryTeamMembers,
  defaultAboutPhotos: [
    {
      _id: 'about-photo-1',
      key: 'about_us_1',
      title: 'X.Alt Modern Creative Studio Workspace',
      label: '',
      imageUrl: '/uploads/studio_workspace.png'
    },
    {
      _id: 'about-photo-2',
      key: 'about_us_2',
      title: 'X.Alt Design Artists at Workstations',
      label: '',
      imageUrl: '/uploads/design_artists.png'
    },
    {
      _id: 'about-photo-3',
      key: 'studio_floor_1',
      title: 'VFX Synthesis Bay',
      label: '// ZONE_01: VFX SYNTHESIS BAY',
      imageUrl: '/uploads/studio_floor_vfx.png'
    },
    {
      _id: 'about-photo-4',
      key: 'studio_floor_2',
      title: 'Sonic Resonance Lab',
      label: '// ZONE_02: SONIC MIXING SUITE',
      imageUrl: '/uploads/studio_floor_audio.png'
    }
  ],
  inMemoryAboutPhotos: [
    {
      _id: 'about-photo-1',
      key: 'about_us_1',
      title: 'X.Alt Modern Creative Studio Workspace',
      label: '',
      imageUrl: '/uploads/studio_workspace.png'
    },
    {
      _id: 'about-photo-2',
      key: 'about_us_2',
      title: 'X.Alt Design Artists at Workstations',
      label: '',
      imageUrl: '/uploads/design_artists.png'
    },
    {
      _id: 'about-photo-3',
      key: 'studio_floor_1',
      title: 'VFX Synthesis Bay',
      label: '// ZONE_01: VFX SYNTHESIS BAY',
      imageUrl: '/uploads/studio_floor_vfx.png'
    },
    {
      _id: 'about-photo-4',
      key: 'studio_floor_2',
      title: 'Sonic Resonance Lab',
      label: '// ZONE_02: SONIC MIXING SUITE',
      imageUrl: '/uploads/studio_floor_audio.png'
    }
  ]
};
