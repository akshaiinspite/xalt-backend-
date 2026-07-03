const defaultPortfolio = [
  {
    id: 'commercial',
    title: 'COMMERCIAL PROJECTS',
    description: 'We create high-end commercial visual experiences for brands, corporations, real estate, hospitality, retail, and luxury businesses through cinematic storytelling and cutting-edge production.',
    heroImage: '/src/assets/images/services/commercial_landscape.png',
    subCategories: [
      {
        title: 'Corporate Films',
        description: 'Brand introductions and company profile films.',
        image: '/src/assets/images/img/img-1.jpg',
        galleryItems: [
          { title: 'Aether Brand Anthem', tag: 'Cinematography', code: 'FILM_AE_01', image: '/src/assets/images/img/img-1.jpg' },
          { title: 'Chronos Identity', tag: 'Visual Narrative', code: 'FILM_CH_02', image: '/src/assets/images/img/img-2.jpg' },
          { title: 'Zenith Corp Profile', tag: 'Documentary', code: 'FILM_ZE_03', image: '/src/assets/images/img/img-3.jpg' },
          { title: 'Apex Annual Report', tag: 'Data Motion', code: 'FILM_AP_04', image: '/src/assets/images/about/studio_workspace.png' },
          { title: 'Vortex Intro Hook', tag: 'Sound Sync', code: 'FILM_VO_05', image: '/src/assets/images/about/design_artists.png' },
          { title: 'Summit Executive Shot', tag: 'Interview', code: 'FILM_SU_06', image: '/src/assets/images/img/workstation_vfx_studio.png' }
        ]
      },
      {
        title: 'Product Photography',
        description: 'High-end ecommerce and lifestyle product shoots.',
        image: '/src/assets/images/img/img-2.jpg',
        galleryItems: [
          { title: 'Helios Watch Shoot', tag: 'Lighting', code: 'PHOTO_HE_01', image: '/src/assets/images/img/img-2.jpg' },
          { title: 'Lumina Cosmetics', tag: 'Macro Focus', code: 'PHOTO_LU_02', image: '/src/assets/images/img/img-3.jpg' },
          { title: 'Nova Footwear Pack', tag: 'Studio Packshot', code: 'PHOTO_NO_03', image: '/src/assets/images/img/img-1.jpg' },
          { title: 'Polaris Tech Deck', tag: 'Abstract', code: 'PHOTO_PO_04', image: '/src/assets/images/about/studio_workspace.png' },
          { title: 'Solace Apparel Look', tag: 'Outdoor', code: 'PHOTO_SO_05', image: '/src/assets/images/about/design_artists.png' },
          { title: 'Onyx Automobile Stills', tag: 'Automotive', code: 'PHOTO_ON_06', image: '/src/assets/images/img/workstation_vfx_studio.png' }
        ]
      },
      {
        title: 'Architectural Visualization',
        description: 'Cinematic interior and exterior property renders.',
        image: '/src/assets/images/about/studio_workspace.png',
        galleryItems: [
          { title: 'Nexus Glass Pavilion', tag: '3D Render', code: 'ARCH_NE_01', image: '/src/assets/images/about/studio_workspace.png' },
          { title: 'Strata Desert Villa', tag: 'V-Ray Render', code: 'ARCH_ST_02', image: '/src/assets/images/about/design_artists.png' },
          { title: 'Vertex Urban Loft', tag: 'Interior', code: 'ARCH_VE_03', image: '/src/assets/images/img/workstation_vfx_studio.png' },
          { title: 'Apex Tower Exterior', tag: 'Daylight', code: 'ARCH_AP_04', image: '/src/assets/images/img/img-1.jpg' },
          { title: 'Oasis Wellness Center', tag: 'Lumen Render', code: 'ARCH_OA_05', image: '/src/assets/images/img/img-2.jpg' },
          { title: 'Canyon Minimal House', tag: 'Cinematic Arch', code: 'ARCH_CA_06', image: '/src/assets/images/img/img-3.jpg' }
        ]
      },
      {
        title: 'Real Estate Media',
        description: 'Drone coverage, HDR visuals and virtual tours.',
        image: '/src/assets/images/img/img-3.jpg',
        galleryItems: [
          { title: 'Vista Ridge Aerials', tag: 'Drone 4K', code: 'REAL_VI_01', image: '/src/assets/images/img/img-3.jpg' },
          { title: 'Marina Penthouse Tour', tag: 'Gimbal Walk', code: 'REAL_MA_02', image: '/src/assets/images/img/img-1.jpg' },
          { title: 'Ridgeview Estates HDR', tag: 'Photography', code: 'REAL_RI_03', image: '/src/assets/images/img/img-2.jpg' },
          { title: 'Lakeside Manor Drone', tag: 'Photogrammetry', code: 'REAL_LA_04', image: '/src/assets/images/about/studio_workspace.png' },
          { title: 'Peak Horizon Suite', tag: 'Virtual Reality', code: 'REAL_PE_05', image: '/src/assets/images/about/design_artists.png' },
          { title: 'Crestwood Luxury Tour', tag: 'Intro Film', code: 'REAL_CR_06', image: '/src/assets/images/img/workstation_vfx_studio.png' }
        ]
      },
      {
        title: 'Advertising Campaigns',
        description: 'Vibrant digital ads and social media commercial films.',
        image: '/src/assets/images/about/design_artists.png',
        galleryItems: [
          { title: 'Ignite Beverage Spot', tag: 'Commercial CGI', code: 'AD_IG_01', image: '/src/assets/images/about/design_artists.png' },
          { title: 'Revolt Fitness Campaign', tag: 'Fast Cut', code: 'AD_RE_02', image: '/src/assets/images/img/workstation_vfx_studio.png' },
          { title: 'Echo Audio Launch', tag: 'Abstract Motion', code: 'AD_EC_03', image: '/src/assets/images/about/studio_workspace.png' },
          { title: 'Volt E-Bike Rollout', tag: 'Action Sequence', code: 'AD_VO_04', image: '/src/assets/images/img/img-1.jpg' },
          { title: 'Pulse App Promo', tag: 'UX Animation', code: 'AD_PU_05', image: '/src/assets/images/img/img-2.jpg' },
          { title: 'Nova Watch Campaign', tag: 'Cinematography', code: 'AD_NO_06', image: '/src/assets/images/img/img-3.jpg' }
        ]
      }
    ]
  },
  {
    id: 'films',
    title: 'FILMS & ENTERTAINMENT',
    description: 'Bringing stories to life with cinematic production, visual effects, immersive editing, and professional filmmaking.',
    heroImage: '/src/assets/images/services/films_landscape.png',
    subCategories: [
      {
        title: 'Movie Previz',
        description: 'Pre-visualization and structural blockouts.',
        image: '/src/assets/images/img/img-1.jpg',
        galleryItems: [
          { title: 'Ares Chase Previz', tag: 'Action Blockout', code: 'PREV_AR_01', image: '/src/assets/images/img/img-1.jpg' },
          { title: 'Nebula Arrival Previz', tag: 'Sci-Fi Composition', code: 'PREV_NE_02', image: '/src/assets/images/img/img-2.jpg' },
          { title: 'Subway Encounter', tag: 'Choreography', code: 'PREV_SU_03', image: '/src/assets/images/img/img-3.jpg' },
          { title: 'Canyon Flight Run', tag: 'Camera Animation', code: 'PREV_CA_04', image: '/src/assets/images/about/studio_workspace.png' },
          { title: 'Rooftop Escape Stunt', tag: 'Blockout', code: 'PREV_RO_05', image: '/src/assets/images/about/design_artists.png' },
          { title: 'Volcano Base Infiltration', tag: 'Set Design', code: 'PREV_VO_06', image: '/src/assets/images/img/workstation_vfx_studio.png' }
        ]
      },
      {
        title: 'Motion Poster',
        description: 'Dynamic animated poster designs.',
        image: '/src/assets/images/img/img-2.jpg',
        galleryItems: [
          { title: 'Dark Matter Poster', tag: 'Motion Design', code: 'POST_DA_01', image: '/src/assets/images/img/img-2.jpg' },
          { title: 'Hyperion Genesis', tag: 'Loop Animation', code: 'POST_HY_02', image: '/src/assets/images/img/img-3.jpg' },
          { title: 'Lost Signal Poster', tag: 'Glitch Effect', code: 'POST_LO_03', image: '/src/assets/images/img/img-1.jpg' },
          { title: 'Neon Phantom Key Art', tag: '2.5D Parallax', code: 'POST_NE_04', image: '/src/assets/images/about/studio_workspace.png' },
          { title: 'Vanguard Reborn Poster', tag: 'Character Loop', code: 'POST_VA_05', image: '/src/assets/images/about/design_artists.png' },
          { title: 'Outpost 09 Poster', tag: 'Atmospheric Glow', code: 'POST_OU_06', image: '/src/assets/images/img/workstation_vfx_studio.png' }
        ]
      },
      {
        title: 'CGI & VFX',
        description: 'Immersive visual effects and realistic 3D environments.',
        image: '/src/assets/images/gallery/commercial_vfx.png',
        galleryItems: [
          { title: 'Nova City Destruction', tag: 'VFX Simulation', code: 'VFX_NO_01', image: '/src/assets/images/gallery/commercial_vfx.png' },
          { title: 'Cybernetic Mech Rig', tag: '3D CGI Asset', code: 'VFX_ME_02', image: '/src/assets/images/gallery/cinematic_previz.png' },
          { title: 'Cosmic Singularity Blackhole', tag: 'Particle System', code: 'VFX_CO_03', image: '/src/assets/images/img/workstation_vfx_studio.png' },
          { title: 'Deep Space Nebula', tag: 'Volumetrics', code: 'VFX_DE_04', image: '/src/assets/images/img/img-1.jpg' },
          { title: 'Ancient Ruin Matte Painting', tag: 'Matte Paint', code: 'VFX_AN_05', image: '/src/assets/images/img/img-2.jpg' },
          { title: 'Alien Jungle Environment', tag: 'Procedural Gen', code: 'VFX_AL_06', image: '/src/assets/images/img/img-3.jpg' }
        ]
      },
      {
        title: 'Lyrical Video',
        description: 'Aesthetic wordplay and audio-reactive animations.',
        image: '/src/assets/images/img/img-3.jpg',
        galleryItems: [
          { title: 'Resonance Lyric Film', tag: 'Typography', code: 'LYR_RE_01', image: '/src/assets/images/img/img-3.jpg' },
          { title: 'Synthetix Beat Loop', tag: 'Audio Reactive', code: 'LYR_SY_02', image: '/src/assets/images/img/img-1.jpg' },
          { title: 'Afterglow Lyrics', tag: 'Kinetic Type', code: 'LYR_AF_03', image: '/src/assets/images/img/img-2.jpg' },
          { title: 'Phantom Echo Video', tag: 'Glitch Motion', code: 'LYR_PH_04', image: '/src/assets/images/about/studio_workspace.png' },
          { title: 'Primal Pulse Lyric Art', tag: 'Retro Glow', code: 'LYR_PR_05', image: '/src/assets/images/about/design_artists.png' },
          { title: 'Void Whispers Video', tag: 'Abstract Layout', code: 'LYR_VO_06', image: '/src/assets/images/img/workstation_vfx_studio.png' }
        ]
      },
      {
        title: 'Title Animation',
        description: 'High-impact title cards and credits sequencings.',
        image: '/src/assets/images/services/films_landscape.png',
        galleryItems: [
          { title: 'Chronos Main Title', tag: '3D Extrusion', code: 'TITL_CH_01', image: '/src/assets/images/services/films_landscape.png' },
          { title: 'Vector Glitch Intro', tag: 'Title Cards', code: 'TITL_VE_02', image: '/src/assets/images/img/img-1.jpg' },
          { title: 'Spectrum Opener', tag: 'Lens Flare FX', code: 'TITL_SP_03', image: '/src/assets/images/img/img-2.jpg' },
          { title: 'Ghost Protocol Credits', tag: 'Kinetic Design', code: 'TITL_GH_04', image: '/src/assets/images/about/studio_workspace.png' },
          { title: 'Rogue Nexus Sequence', tag: 'Procedural HUD', code: 'TITL_RO_05', image: '/src/assets/images/about/design_artists.png' },
          { title: 'Apex Legend Opener', tag: 'Matte Texturing', code: 'TITL_AP_06', image: '/src/assets/images/img/workstation_vfx_studio.png' }
        ]
      }
    ]
  },
  {
    id: 'immersive',
    title: 'AR & VR EXPERIENCES',
    description: 'Creating interactive digital experiences using Augmented Reality, Virtual Reality, Mixed Reality, and immersive technologies.',
    heroImage: '/src/assets/images/services/arvr_landscape.png',
    subCategories: [
      {
        title: 'Augmented Reality',
        description: 'Interactive AR showcases and packaging enhancements.',
        image: '/src/assets/images/img/img-3.jpg',
        galleryItems: [
          { title: 'HoloPack AR Filter', tag: 'WebAR Dev', code: 'AR_HO_01', image: '/src/assets/images/img/img-3.jpg' },
          { title: 'Solace Apparel Try-On', tag: 'Body Tracking', code: 'AR_SO_02', image: '/src/assets/images/img/img-1.jpg' },
          { title: 'Lumina Smart Guide', tag: 'SLAM Tracking', code: 'AR_LU_03', image: '/src/assets/images/img/img-2.jpg' },
          { title: 'Quantum Game UI', tag: 'Image Target', code: 'AR_QU_04', image: '/src/assets/images/about/studio_workspace.png' },
          { title: 'Chronos Watch View', tag: 'Wrist Tracker', code: 'AR_CH_05', image: '/src/assets/images/about/design_artists.png' },
          { title: 'Apex Product AR Show', tag: '3D Overlay', code: 'AR_AP_06', image: '/src/assets/images/img/workstation_vfx_studio.png' }
        ]
      },
      {
        title: 'Virtual Reality',
        description: 'Immersive VR virtual walkthroughs and simulation training.',
        image: '/src/assets/images/gallery/ar_vr.png',
        galleryItems: [
          { title: 'Aether Training Ground', tag: 'Unreal Engine', code: 'VR_AE_01', image: '/src/assets/images/gallery/ar_vr.png' },
          { title: 'Vista Ridge Oculus Tour', tag: '360 Stereo', code: 'VR_VI_02', image: '/src/assets/images/img/img-1.jpg' },
          { title: 'Deep Space VR Flight', tag: 'Physics Engine', code: 'VR_DE_03', image: '/src/assets/images/img/img-2.jpg' },
          { title: 'Zenith Facility Sim', tag: 'Interactive', code: 'VR_ZE_04', image: '/src/assets/images/about/studio_workspace.png' },
          { title: 'Vortex Synth Concert', tag: 'Audio Sync', code: 'VR_VO_05', image: '/src/assets/images/about/design_artists.png' },
          { title: 'Summit Climb Experience', tag: 'VR Sandbox', code: 'VR_SU_06', image: '/src/assets/images/img/workstation_vfx_studio.png' }
        ]
      },
      {
        title: 'Mixed Reality',
        description: 'Hybrid presentations and next-gen enterprise tools.',
        image: '/src/assets/images/img/img-1.jpg',
        galleryItems: [
          { title: 'Strata HoloLens Layout', tag: 'MR Toolkit', code: 'MR_ST_01', image: '/src/assets/images/img/img-1.jpg' },
          { title: 'Helios Collab Sandbox', tag: 'Spatial Anchor', code: 'MR_HE_02', image: '/src/assets/images/img/img-2.jpg' },
          { title: 'Marina Design Room', tag: 'LiDAR Mesh', code: 'MR_MA_03', image: '/src/assets/images/img/img-3.jpg' },
          { title: 'Lakeside Smart Board', tag: 'Gesture Recognizer', code: 'MR_LA_04', image: '/src/assets/images/about/studio_workspace.png' },
          { title: 'Outpost Factory Guide', tag: 'Dynamic HUD', code: 'MR_OU_05', image: '/src/assets/images/about/design_artists.png' },
          { title: 'Canyon Flight Map', tag: 'Spatial Audio', code: 'MR_CA_06', image: '/src/assets/images/img/workstation_vfx_studio.png' }
        ]
      },
      {
        title: 'Metaverse Solutions',
        description: 'Digital avatars and real-time virtual events spaces.',
        image: '/src/assets/images/img/img-2.jpg',
        galleryItems: [
          { title: 'Nova Hub Auditorium', tag: 'Spatial Dev', code: 'META_NO_01', image: '/src/assets/images/img/img-2.jpg' },
          { title: 'Horizon Meeting Suite', tag: 'Web3 Mesh', code: 'META_HO_02', image: '/src/assets/images/img/img-3.jpg' },
          { title: 'Aether Digital Twins', tag: 'NVIDIA Omniverse', code: 'META_AE_03', image: '/src/assets/images/img/img-1.jpg' },
          { title: 'Apex Virtual Expo', tag: 'Realtime Unity', code: 'META_AP_04', image: '/src/assets/images/about/studio_workspace.png' },
          { title: 'Pulse Avatar Gear', tag: 'ReadyPlayerMe', code: 'META_PU_05', image: '/src/assets/images/about/design_artists.png' },
          { title: 'Solace Plaza Social', tag: 'Multiplayer', code: 'META_SO_06', image: '/src/assets/images/img/workstation_vfx_studio.png' }
        ]
      },
      {
        title: 'Interactive Installations',
        description: 'Exhibition displays, museum panels, and event activations.',
        image: '/src/assets/images/about/studio_workspace.png',
        galleryItems: [
          { title: 'Zenith Projection Room', tag: 'Mapping', code: 'INST_ZE_01', image: '/src/assets/images/about/studio_workspace.png' },
          { title: 'Nova Kinetic Wall', tag: 'Sensor Sync', code: 'INST_NO_02', image: '/src/assets/images/about/design_artists.png' },
          { title: 'Lumina Mirror Feed', tag: 'Computer Vision', code: 'INST_LU_03', image: '/src/assets/images/img/workstation_vfx_studio.png' },
          { title: 'Chronos Historic Map', tag: 'Touch Screen', code: 'INST_CH_04', image: '/src/assets/images/img/img-1.jpg' },
          { title: 'Primal Beats Chamber', tag: 'Lighting Desk', code: 'INST_PR_05', image: '/src/assets/images/img/img-2.jpg' },
          { title: 'Aether Core Helix', tag: 'Laser System', code: 'INST_AE_06', image: '/src/assets/images/img/img-3.jpg' }
        ]
      }
    ]
  }
];

module.exports = defaultPortfolio;
