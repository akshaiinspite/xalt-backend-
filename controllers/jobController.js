const Job = require('../models/Job');
const inMemoryDb = require('../utils/inMemoryDb');

exports.getAllJobs = async (req, res) => {
  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    return res.json(inMemoryDb.inMemoryJobs);
  }
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving vacancies', error: err.message });
  }
};

exports.createJob = async (req, res) => {
  const { title, experience, location, description } = req.body;
  if (!title || !experience || !location || !description) {
    return res.status(400).json({ message: 'All vacancy fields are required' });
  }

  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const newJob = {
      _id: 'inmemory-job-' + Date.now(),
      title,
      experience,
      location,
      description,
      createdAt: new Date()
    };
    inMemoryDb.inMemoryJobs.unshift(newJob);
    return res.status(201).json(newJob);
  }

  try {
    const newJob = new Job({ title, experience, location, description });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ message: 'Error creating vacancy', error: err.message });
  }
};

exports.updateJob = async (req, res) => {
  const { title, experience, location, description } = req.body;
  if (!title || !experience || !location || !description) {
    return res.status(400).json({ message: 'All vacancy fields are required' });
  }

  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const jobIndex = inMemoryDb.inMemoryJobs.findIndex(j => j._id === req.params.id);
    if (jobIndex === -1) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }
    inMemoryDb.inMemoryJobs[jobIndex] = {
      ...inMemoryDb.inMemoryJobs[jobIndex],
      title,
      experience,
      location,
      description
    };
    return res.json(inMemoryDb.inMemoryJobs[jobIndex]);
  }

  try {
    const updated = await Job.findByIdAndUpdate(
      req.params.id,
      { title, experience, location, description },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating vacancy', error: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  const isMongoConnected = inMemoryDb.getIsMongoConnected();
  if (!isMongoConnected) {
    const initialLength = inMemoryDb.inMemoryJobs.length;
    inMemoryDb.inMemoryJobs = inMemoryDb.inMemoryJobs.filter(j => j._id !== req.params.id);
    if (inMemoryDb.inMemoryJobs.length === initialLength) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }
    return res.json({ message: 'Vacancy deleted successfully', id: req.params.id });
  }

  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }
    res.json({ message: 'Vacancy deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting vacancy', error: err.message });
  }
};
