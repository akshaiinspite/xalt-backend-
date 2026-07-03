const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authenticateJWT = require('../middlewares/auth');

router.get('/', projectController.getAllProjects);
router.post('/', authenticateJWT, projectController.createProject);
router.put('/:id', authenticateJWT, projectController.updateProject);
router.delete('/:id', authenticateJWT, projectController.deleteProject);

module.exports = router;
