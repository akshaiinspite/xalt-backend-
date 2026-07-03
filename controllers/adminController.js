const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const inMemoryDb = require('../utils/inMemoryDb');

exports.setup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const isMongoConnected = inMemoryDb.getIsMongoConnected();

    if (!isMongoConnected) {
      const existing = inMemoryDb.inMemoryAdmins.find(a => a.email === email);
      if (existing) {
        return res.status(400).json({ message: 'Admin account already exists' });
      }
      inMemoryDb.inMemoryAdmins.push({ email, password: hashedPassword });
      return res.status(201).json({ message: 'Admin user created successfully in memory fallback' });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Admin account already exists' });
    }
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error during admin setup', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    let admin = null;
    let isInMemory = false;
    const isMongoConnected = inMemoryDb.getIsMongoConnected();

    if (!isMongoConnected) {
      admin = inMemoryDb.inMemoryAdmins.find(a => a.email === email);
      isInMemory = true;
    } else {
      admin = await Admin.findOne({ email });
    }

    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: isInMemory ? 'inmemory-admin-id' : admin._id, email: admin.email },
      process.env.JWT_SECRET || 'xalt_secret',
      { expiresIn: '24h' }
    );

    res.json({ 
      token, 
      email: admin.email,
      note: isInMemory ? 'Authenticated via In-Memory' : 'Authenticated via MongoDB' 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login', error: err.message });
  }
};

exports.verify = (req, res) => {
  res.json({ valid: true, user: req.user });
};
