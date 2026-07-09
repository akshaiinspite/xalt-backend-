const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
const authenticateJWT = require('../middlewares/auth');

router.get('/', aboutController.getAllAboutPhotos);
router.post('/', authenticateJWT, aboutController.createAboutPhoto);
router.put('/:id', authenticateJWT, aboutController.updateAboutPhoto);
router.delete('/:id', authenticateJWT, aboutController.deleteAboutPhoto);

module.exports = router;
