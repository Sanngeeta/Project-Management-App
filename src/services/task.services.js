const Task = require('../models/task.model');

/**
 * Create a new task for a user under a specific project.
 * @param {Object} data - Task data.
 * @param {String} userId - ID of the user creating the task.
 * @returns {Object|Number} - Created task or 500 on error.
 */
const createTask = async (data, userId) => {
  try {
    const checkExistingTask = await Task.findOne({title:data.title})
    if(checkExistingTask) return 409;
    const task = await Task.create({ ...data, userId: userId });
    return task
  } catch (error) {
    console.error('Error creating task:', error);
    return 500;
  }
};

/**
 * Get all tasks for a user under a project, optionally filtered by status.
 * @param {String} projectId - ID of the project.
 * @param {String} userId - ID of the user.
 * @param {String} [status] - Optional status filter.
 * @returns {Array|Number} - Array of tasks or 500 on error.
 */
const getTasks = async (userId) => {
  try {
    const filter = { userId: userId };
   
    return await Task.find(filter);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return 500;
  }
};

/**
 * Update a specific task for a user.
 * @param {String} taskId - Task ID.
 * @param {Object} data - Updated task data.
 * @param {String} userId - ID of the user.
 * @returns {Object|Number} - Updated task, 404 if not found, or 500 on error.
 */
const updateTask = async (taskId, data, userId) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId: userId },
      data,
      { new: true }
    );
    return updatedTask || 404;
  } catch (error) {
    console.error('Error updating task:', error);
    return 500;
  }
};

/**
 * Delete a specific task for a user.
 * @param {String} taskId - Task ID.
 * @param {String} userId - ID of the user.
 * @returns {Object|Number} - Deleted task, 404 if not found, or 500 on error.
 */
const deleteTask = async (taskId, userId) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId: userId });
    return deletedTask || 404;
  } catch (error) {
    console.error('Error deleting task:', error);
    return 500;
  }
};


/**
 * Get a specific task by its ID (and user).
 * @param {String} taskId - Task ID.
 * @param {String} userId - ID of the user.
 * @returns {Object|Number} - Task object, 404 if not found, or 500 on error.
 */
const getTaskById = async (taskId, userId) => {
  try {
    const task = await Task.findOne({ _id: taskId, userId });
    return task || 404;
  } catch (error) {
    console.error('Error fetching task by ID:', error);
    return 500;
  }
};


const getTasksByProject = async (projectId, userId, status) => {
  try {
    const filter = { userId, projectId };
    if (status) filter.status = status;

    return await Task.find(filter);
  } catch (error) {
    console.error('Error fetching project tasks:', error);
    return 500;
  }
};


module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTasksByProject,
  getTaskById

};
