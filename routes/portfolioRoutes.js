const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const authenticateJWT = require('../middlewares/auth');

router.get('/', portfolioController.getPortfolio);
router.put('/categories/:id', authenticateJWT, portfolioController.updateCategory);
router.post('/subcategories', authenticateJWT, portfolioController.createSubcategory);
router.put('/subcategories/:id', authenticateJWT, portfolioController.updateSubcategory);
router.delete('/subcategories/:id', authenticateJWT, portfolioController.deleteSubcategory);

module.exports = router;
