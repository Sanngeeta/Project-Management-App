const taskService = require("../services/task.services");

/**
 * Controller: Create a new task
 */
const create = async (req, res) => {
  const result = await taskService.createTask(req.body, req.user.id);

  if (result === 409) {
    return res
      .status(409)
      .json({ status: 409, message: "Task already exist." });
  }
  if (result === 500) {
    return res
      .status(500)
      .json({ status: 500, message: "Error creating task" });
  }

  res.status(201).json({
    status: 201,
    message: "Task created successfully",
    data: result,
  });
};

/**
 * Controller: Fetched all user tasks
 */
const getAllTasks = async (req, res) => {
  const result = await taskService.getTasks(req.user.id);
  if (result === 500) {
    return res
      .status(500)
      .json({ status: 500, message: "Error fetching tasks" });
  } else {
    res.status(201).json({
      status: 201,
      message: "Task fetched successfully",
      data: result,
    });
  }
};

/**
 * Controller: Update a specific task
 */
const update = async (req, res) => {
  const result = await taskService.updateTask(
    req.params.id,
    req.body,
    req.user.id
  );

  if (result === 404) {
    return res.status(404).json({ status: 404, message: "Task not found" });
  }

  if (result === 500) {
    return res
      .status(500)
      .json({ status: 500, message: "Error updating task" });
  }

  res.status(200).json({
    status: 200,
    message: "Task updated successfully",
    data: result,
  });
};

/**
 * Controller: Delete a task
 */
const remove = async (req, res) => {
  const result = await taskService.deleteTask(req.params.id, req.user.id);

  if (result === 404) {
    return res.status(404).json({ status: 404, message: "Task not found" });
  }

  if (result === 500) {
    return res
      .status(500)
      .json({ status: 500, message: "Error deleting task" });
  }

  return res.status(200).json({
    status: 200,
    message: "Task deleted successfully",
    data: result,
  });
};

/**
 * Controller: Get a specific task by ID
 */
const getById = async (req, res) => {
  const result = await taskService.getTaskById(req.params.id, req.user.id);

  if (result === 404) {
    return res.status(404).json({ status: 404, message: "Task not found" });
  }

  if (result === 500) {
    return res
      .status(500)
      .json({ status: 500, message: "Error fetching task" });
  }

  res.status(200).json({
    status: 200,
    message: "Task fetched successfully",
    data: result,
  });
};

/**
 * Controller: Get all tasks under a specific project (with optional status)
 */
const getTasksByProjectId = async (req, res) => {
  const { projectId } = req.params;
  const { status } = req.query;

  const result = await taskService.getTasksByProject(
    projectId,
    req.user.id,
    status
  );

  if (result === 500) {
    return res
      .status(500)
      .json({ status: 500, message: "Error fetching project tasks" });
  }

  res.status(200).json({
    status: 200,
    message: "Project tasks fetched successfully",
    data: result,
  });
};

module.exports = {
  create,
  getAllTasks,
  getTasksByProjectId,
  update,
  remove,
  getById,
};
