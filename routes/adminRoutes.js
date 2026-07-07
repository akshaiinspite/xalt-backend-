const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateJWT = require('../middlewares/auth');

router.post('/setup', adminController.setup);
router.post('/login', adminController.login);
router.get('/verify', authenticateJWT, adminController.verify);
router.get('/status', adminController.status);

module.exports = router;
