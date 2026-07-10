const TeamMember = require('../models/TeamMember');
const inMemoryDb = require('../utils/inMemoryDb');

exports.getAllTeamMembers = async (req, res) => {
  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    return res.json(inMemoryDb.inMemoryTeamMembers);
  }
  try {
    const members = await TeamMember.find().sort({ order: 1, createdAt: 1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving team members', error: err.message });
  }
};

exports.createTeamMember = async (req, res) => {
  const { name, role, department, bio, gradient, image, empNo, order } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is a required field' });
  }

  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const newMember = {
      _id: 'inmemory-team-' + Date.now(),
      name,
      role,
      department: department || 'CREATIVE_3D_LAB',
      bio: bio || '',
      gradient: gradient || 'linear-gradient(135deg, #161616 0%, #700a18 100%)',
      image: image || '',
      empNo: empNo || '',
      order: order !== undefined ? Number(order) : 1,
      createdAt: new Date()
    };
    inMemoryDb.inMemoryTeamMembers.push(newMember);
    // Sort in memory by order
    inMemoryDb.inMemoryTeamMembers.sort((a, b) => (a.order || 1) - (b.order || 1));
    return res.status(201).json(newMember);
  }

  try {
    const newMember = new TeamMember({
      name,
      role,
      department: department || 'CREATIVE_3D_LAB',
      bio: bio || '',
      gradient: gradient || 'linear-gradient(135deg, #161616 0%, #700a18 100%)',
      image: image || '',
      empNo: empNo || '',
      order: order !== undefined ? Number(order) : 1
    });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ message: 'Error creating team member', error: err.message });
  }
};

exports.updateTeamMember = async (req, res) => {
  const { name, role, department, bio, gradient, image, empNo, order } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is a required field' });
  }

  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const idx = inMemoryDb.inMemoryTeamMembers.findIndex(m => m._id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    inMemoryDb.inMemoryTeamMembers[idx] = {
      ...inMemoryDb.inMemoryTeamMembers[idx],
      name,
      role,
      department: department || 'CREATIVE_3D_LAB',
      bio: bio || '',
      gradient: gradient || 'linear-gradient(135deg, #161616 0%, #700a18 100%)',
      image: image || '',
      empNo: empNo || '',
      order: order !== undefined ? Number(order) : 1
    };
    inMemoryDb.inMemoryTeamMembers.sort((a, b) => (a.order || 1) - (b.order || 1));
    return res.json(inMemoryDb.inMemoryTeamMembers[idx]);
  }

  try {
    const updated = await TeamMember.findByIdAndUpdate(
      req.params.id,
      {
        name,
        role,
        department: department || 'CREATIVE_3D_LAB',
        bio: bio || '',
        gradient: gradient || 'linear-gradient(135deg, #161616 0%, #700a18 100%)',
        image: image || '',
        empNo: empNo || '',
        order: order !== undefined ? Number(order) : 1
      },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating team member', error: err.message });
  }
};

exports.deleteTeamMember = async (req, res) => {
  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const initialLen = inMemoryDb.inMemoryTeamMembers.length;
    inMemoryDb.inMemoryTeamMembers = inMemoryDb.inMemoryTeamMembers.filter(m => m._id !== req.params.id);
    if (inMemoryDb.inMemoryTeamMembers.length === initialLen) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    return res.json({ message: 'Team member deleted successfully', id: req.params.id });
  }

  try {
    const deleted = await TeamMember.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json({ message: 'Team member deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting team member', error: err.message });
  }
};
