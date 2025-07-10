const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const projectCtrl = require('../controllers/project.controller');

router.post('/create-project', auth, projectCtrl.create);
router.get('/fetched-projects', auth, projectCtrl.getAll);
router.put('/update-project-by-id/:id', auth, projectCtrl.update);
router.delete('/delete-project-by-id/:id', auth, projectCtrl.remove);

module.exports = router;
