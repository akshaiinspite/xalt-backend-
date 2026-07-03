const express = require('express');
const router = express.Router();
const reelController = require('../controllers/reelController');
const authenticateJWT = require('../middlewares/auth');

router.get('/', reelController.getReel);
router.post('/', authenticateJWT, reelController.updateReel);

module.exports = router;
