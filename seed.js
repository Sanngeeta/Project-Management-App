require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/user.model');
const Project = require('./src/models/project.model');
const Task = require('./src/models/task.model');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear old data (optional)
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});

    // Create user
    const hashedPassword = await bcrypt.hash('Test@123', 10);
    const user = await User.create({
      name:"test",
      email: 'test@example.com',
      password: hashedPassword,
    });

    const projectData = [
      { title: 'Website Redesign', description: 'Update landing page', status: 'Active' },
      { title: 'Mobile App', description: 'Create React Native app', status: 'Completed' },
    ];

    const createdProjects = await Promise.all(
      projectData.map((p) => Project.create({ ...p, userId: user._id }))
    );

    const taskTemplates = [
      {
        title: 'Initial planning',
        description: 'Discuss goals',
        status: 'Todo',
        dueDate: new Date(),
      },
      {
        title: 'Design wireframes',
        description: 'Mockup screens',
        status: 'In-progress',
        dueDate: new Date(),
      },
      {
        title: 'Development',
        description: 'Start coding',
        status: 'Done',
        dueDate: new Date(),
      },
    ];

    for (const project of createdProjects) {
      for (const taskTemplate of taskTemplates) {
        await Task.create({
          ...taskTemplate,
          projectId: project._id,
          userId: user._id,
        });
      }
    }

    console.log('Seed completed successfully!');
    process.exit();
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seed();
