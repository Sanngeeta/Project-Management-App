const Project = require('../models/project.model');

/**
 * Create a new project for a specific user.
 * @param {Object} data - Project data.
 * @param {String} userId - ID of the user creating the project.
 * @returns {Object|Number} - Created project or 500 on error.
 */
const createProject = async (data, userId) => {
  try {
    const checkExistingProject = await Project.findOne({title:data.title})
    if(checkExistingProject) return 409;
    const project = await Project.create({ ...data, userId: userId });
    return project;
  } catch (error) {
    console.error('Error creating project:', error);
    return 500;
  }
};

/**
 * Get all projects for a specific user.
 * @param {String} userId - ID of the user.
 * @returns {Array|Number} - Array of projects or 500 on error.
 */
const getProjects = async (userId, page = 1, limit = 10, search = '') => {
  try {
    const query = {
      userId,
      ...(search && { title: { $regex: search, $options: 'i' } })
    };

    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      Project.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Project.countDocuments(query),
    ]);

    return {
      projects,
      total,
      page,
      pages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return 500;
  }
};


/**
 * Update a specific project for a user.
 * @param {String} id - Project ID.
 * @param {Object} data - Updated project data.
 * @param {String} userId - ID of the user.
 * @returns {Object|Number} - Updated project, 404 if not found, or 500 on error.
 */
const updateProject = async (projectId, data, userId) => {
  try {
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId, userId: userId },
      data,
      { new: true }
    );
    return updatedProject || 404;
  } catch (error) {
    console.error('Error updating project:', error);
    return 500;
  }
};

/**
 * Delete a specific project for a user.
 * @param {String} id - Project ID.
 * @param {String} userId - ID of the user.
 * @returns {Object|Number} - Deleted project, 404 if not found, or 500 on error.
 */
const deleteProject = async (id, userId) => {
  try {
    const deletedProject = await Project.findOneAndDelete({ _id: id, userId: userId });
    return deletedProject || 404;
  } catch (error) {
    console.error('Error deleting project:', error);
    return 500;
  }
};

module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
};
