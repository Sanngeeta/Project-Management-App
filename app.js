require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db.config');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use('/auth', require('./src/routes/user.route'));
app.use('/project', require('./src/routes/project.route'));
app.use('/task', require('./src/routes/task.route'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
