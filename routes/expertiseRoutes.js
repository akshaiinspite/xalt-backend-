const express = require('express');
const router = express.Router();
const expertiseController = require('../controllers/expertiseController');
const authenticateJWT = require('../middlewares/auth');

router.get('/', expertiseController.getExpertise);
router.post('/', authenticateJWT, expertiseController.createExpertise);
router.put('/:id', authenticateJWT, expertiseController.updateExpertise);
router.delete('/:id', authenticateJWT, expertiseController.deleteExpertise);

module.exports = router;
