const service = require("../services/project.services");

/**
 * Controller: Create a new project
 */
const create = async (req, res) => {
  const result = await service.createProject(req.body, req.user.id);

  if (result === 409) {
    return res
      .status(409)
      .json({ status: 409, message: "Project already exist." });
  }
  if (result === 500) {
    return res
      .status(500)
      .json({ status: 500, message: "Failed to create project" });
  }

  return res.status(200).json({
    status: 200,
    message: "Project created successfully",
    data: result,
  });
};

/**
 * Controller: Get all projects for logged-in user
 */
const getAll = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  const result = await service.getProjects(
    req.user.id,
    parseInt(page),
    parseInt(limit),
    search
  );

  if (result === 500) {
    return res
      .status(500)
      .json({ status: 500, message: "Failed to fetch projects" });
  }

  return res.status(200).json({
    status: 200,
    message: "Projects retrieved successfully",
    data: result,
  });
};

/**
 * Controller: Update a project by ID
 */
const update = async (req, res) => {
  const result = await service.updateProject(
    req.params.id,
    req.body,
    req.user.id
  );

  if (result === 404) {
    return res.status(404).json({ status: 404, message: "Project not found" });
  }

  if (result === 500) {
    return res
      .status(500)
      .json({ status: 500, message: "Failed to update project" });
  }

  return res.status(200).json({
    status: 200,
    message: "Project updated successfully",
    data: result,
  });
};

/**
 * Controller: Delete a project by ID
 */
const remove = async (req, res) => {
  const result = await service.deleteProject(req.params.id, req.user.id);

  if (result === 404) {
    return res.status(404).json({ status: 404, message: "Project not found" });
  }

  if (result === 500) {
    return res
      .status(500)
      .json({ status: 500, message: "Failed to delete project" });
  }

  return res.status(200).json({
    status: 200,
    message: "Project deleted successfully",
  });
};

module.exports = {
  create,
  getAll,
  update,
  remove,
};
