const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const taskCtrl = require('../controllers/task.controller');

// Create task
router.post('/add-task', auth, taskCtrl.create);

// Get all tasks by user with optional status
router.get('/get-tasks', auth, taskCtrl.getAllTasks); 

// Get all tasks for a specific project with optional status
router.get('/fetched-project/:projectId', auth, taskCtrl.getTasksByProjectId); // ?status=todo

// Update task by ID
router.put('/update-task-by-id/:id', auth, taskCtrl.update);

// Delete task by ID
router.delete('/delete-task-by-id/:id', auth, taskCtrl.remove);

module.exports = router;
