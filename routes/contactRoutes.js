const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { sendEmail } = require('../utils/mailer');

// Configure multer for CV attachments
const uploadDir = path.join(__dirname, '..', 'uploads', 'resumes');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max file size
});

// POST /api/contact - General contact submissions
router.post('/', async (req, res) => {
  try {
    const { name, email, contactNumber, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required fields.' });
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER || 'admin@xaltstudios.com';

    const text = `New Contact Form Submission from X.ALT Studios:\n\nName: ${name}\nEmail: ${email}\nContact Number: ${contactNumber || 'Not provided'}\nMessage: ${message}`;
    
    const html = `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Contact Number:</strong> ${contactNumber || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    await sendEmail({
      to: receiverEmail,
      subject: `X.ALT Contact Form: ${name}`,
      text,
      html
    });

    res.status(200).json({ message: 'Contact message received and email sent successfully.' });
  } catch (error) {
    console.error('Error handling contact form:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// POST /api/contact/careers - Careers CV uploads & applications
router.post('/careers', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, contactNumber, job_title } = req.body;
    const resumeFile = req.file;

    if (!name || !email || !contactNumber || !job_title || !resumeFile) {
      return res.status(400).json({ message: 'All fields and resume file are required.' });
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER || 'careers@xaltstudios.com';

    // Build local download link
    const host = req.get('host');
    const protocol = req.protocol;
    const downloadLink = `${protocol}://${host}/uploads/resumes/${resumeFile.filename}`;

    const text = `New Career Application from X.ALT Studios:\n\nJob Position: ${job_title}\nCandidate Name: ${name}\nCandidate Email: ${email}\nContact Number: ${contactNumber}\nResume File: ${resumeFile.originalname}\nDownload Link: ${downloadLink}`;

    const html = `
      <h3>New Career Application</h3>
      <p><strong>Job Position:</strong> ${job_title}</p>
      <p><strong>Candidate Name:</strong> ${name}</p>
      <p><strong>Candidate Email:</strong> ${email}</p>
      <p><strong>Contact Number:</strong> ${contactNumber}</p>
      <p>Resume file <strong>${resumeFile.originalname}</strong> has been uploaded.</p>
      <p><strong>Download/View Resume:</strong> <a href="${downloadLink}" target="_blank">${downloadLink}</a></p>
    `;

    const attachments = [
      {
        filename: resumeFile.originalname,
        path: resumeFile.path
      }
    ];

    await sendEmail({
      to: receiverEmail,
      subject: `X.ALT Careers Application: ${name} - ${job_title}`,
      text,
      html,
      attachments
    });

    res.status(200).json({ message: 'Application submitted and email sent successfully.', resumeUrl: downloadLink });
  } catch (error) {
    console.error('Error handling careers form:', error);
    // Clean up temp file on error
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error('Failed to delete temp resume file on error:', err);
      }
    }
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// POST /api/contact/upload-resume - Public endpoint for CV uploads
router.post('/upload-resume', upload.single('resume'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const host = req.get('host');
    const protocol = req.protocol;
    const downloadLink = `${protocol}://${host}/uploads/resumes/${req.file.filename}`;

    res.status(200).json({
      message: 'Resume uploaded successfully',
      url: downloadLink,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Error uploading resume:', error);
    res.status(500).json({ message: 'Error uploading resume', error: error.message });
  }
});

module.exports = router;
