require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/user.model');
const Project = require('./src/models/project.model');
const Task = require('./src/models/task.model');
const { projectStatus, taskStatus } = require('./src/config/config.config');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Optional: Clear previous data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    console.log('Cleared existing data');

    // Create seed user
    const hashedPassword = await bcrypt.hash('Test@123', 10);
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
    });
    console.log(`Created user: ${user.email}`);

    // Create seed projects
    const projectData = [
      { title: 'Website Redesign', description: 'Update the main landing page', status: projectStatus.ACTIVE },
      { title: 'Mobile App Launch', description: 'Build the first MVP', status: projectStatus.COMPLETED },
    ];

    const createdProjects = await Promise.all(
      projectData.map(p => Project.create({ ...p, userId: user._id }))
    );
    console.log(`Created projects: ${createdProjects.map(p => p.title).join(', ')}`);

    // Create 3 tasks per project
    const taskTemplates = [
      {
        title: 'Initial Planning',
        description: 'Gather requirements and align goals',
        status: taskStatus.TODO,
      },
      {
        title: 'Design Phase',
        description: 'Create wireframes and UI designs',
        status: taskStatus.IN_PROGRESS,
      },
      {
        title: 'Development',
        description: 'Implement functionality',
        status: taskStatus.DONE,
      },
    ];

    for (let i = 0; i < createdProjects.length; i++) {
      const project = createdProjects[i];

      for (let j = 0; j < taskTemplates.length; j++) {
        const task = {
          ...taskTemplates[j],
          dueDate: new Date(Date.now() + (j + 1) * 7 * 24 * 60 * 60 * 1000), // +7, +14, +21 days
          projectId: project._id,
          userId: user._id,
        };
        await Task.create(task);
      }

      console.log(`Tasks added to project: ${project.title}`);
    }

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seed();
