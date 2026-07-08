const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: '' },
  department: { type: String, default: 'CREATIVE_3D_LAB' },
  bio: { type: String, default: '' },
  gradient: { type: String, default: 'linear-gradient(135deg, #161616 0%, #700a18 100%)' },
  image: { type: String, default: '' },
  empNo: { type: String, default: '' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
