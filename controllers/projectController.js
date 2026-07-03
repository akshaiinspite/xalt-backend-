const Project = require('../models/Project');
const inMemoryDb = require('../utils/inMemoryDb');

exports.getAllProjects = async (req, res) => {
  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    return res.json(inMemoryDb.inMemoryProjects);
  }
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving projects', error: err.message });
  }
};

exports.createProject = async (req, res) => {
  const { category, subcategory, title, tag, code, image } = req.body;
  if (!category || !subcategory || !title || !tag || !code || !image) {
    return res.status(400).json({ message: 'All project fields are required' });
  }

  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const newProject = {
      _id: 'inmemory-proj-' + Date.now(),
      category,
      subcategory,
      title,
      tag,
      code,
      image,
      createdAt: new Date()
    };
    inMemoryDb.inMemoryProjects.unshift(newProject);
    return res.status(201).json(newProject);
  }

  try {
    const newProject = new Project({ category, subcategory, title, tag, code, image });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: 'Error creating project', error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  const { category, subcategory, title, tag, code, image } = req.body;
  if (!category || !subcategory || !title || !tag || !code || !image) {
    return res.status(400).json({ message: 'All project fields are required' });
  }

  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const projIndex = inMemoryDb.inMemoryProjects.findIndex(p => p._id === req.params.id);
    if (projIndex === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }
    inMemoryDb.inMemoryProjects[projIndex] = {
      ...inMemoryDb.inMemoryProjects[projIndex],
      category,
      subcategory,
      title,
      tag,
      code,
      image
    };
    return res.json(inMemoryDb.inMemoryProjects[projIndex]);
  }

  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { category, subcategory, title, tag, code, image },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating project', error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const initialLength = inMemoryDb.inMemoryProjects.length;
    inMemoryDb.inMemoryProjects = inMemoryDb.inMemoryProjects.filter(p => p._id !== req.params.id);
    if (inMemoryDb.inMemoryProjects.length === initialLength) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.json({ message: 'Project deleted successfully', id: req.params.id });
  }

  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project', error: err.message });
  }
};
