const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authenticateJWT = require('../middlewares/auth');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using timestamp and sanitizing original name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  }
});

// File filter to allow images and videos
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    // Images
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    // Videos
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and videos are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100 MB max file size for videos
  }
});

// POST endpoint for file upload (protected by authentication)
router.post('/', authenticateJWT, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let finalFilename = req.file.filename;

    // Auto-compress uploaded images with Sharp
    if (req.file.mimetype.startsWith('image/') && !req.file.mimetype.includes('svg')) {
      try {
        const sharp = require('sharp');
        const ext = path.extname(req.file.filename);
        const baseName = path.basename(req.file.filename, ext);
        const webpFilename = `${baseName}.webp`;
        const webpPath = path.join(uploadDir, webpFilename);

        await sharp(req.file.path)
          .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(webpPath);

        finalFilename = webpFilename;
      } catch (sharpError) {
        console.warn('Image optimization skipped or error:', sharpError.message);
      }
    }

    // Generate absolute URL to access the uploaded file
    const host = req.get('host'); // E.g., localhost:5000
    const protocol = req.protocol; // E.g., http
    const fileUrl = `${protocol}://${host}/uploads/${finalFilename}`;

    res.status(200).json({
      message: 'File uploaded successfully',
      url: fileUrl,
      filename: finalFilename
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

// Error handling middleware for Multer/upload issues
router.use((err, req, res, next) => {
  res.status(400).json({ message: err.message });
});

module.exports = router;
