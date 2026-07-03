const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authenticateJWT = require('../middlewares/auth');

router.get('/', jobController.getAllJobs);
router.post('/', authenticateJWT, jobController.createJob);
router.put('/:id', authenticateJWT, jobController.updateJob);
router.delete('/:id', authenticateJWT, jobController.deleteJob);

module.exports = router;
