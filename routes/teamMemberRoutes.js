const express = require('express');
const router = express.Router();
const teamMemberController = require('../controllers/teamMemberController');
const authenticateJWT = require('../middlewares/auth');

router.get('/', teamMemberController.getAllTeamMembers);
router.post('/', authenticateJWT, teamMemberController.createTeamMember);
router.put('/:id', authenticateJWT, teamMemberController.updateTeamMember);
router.delete('/:id', authenticateJWT, teamMemberController.deleteTeamMember);

module.exports = router;
