const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

/**
 * Registers a new user.
 * @param {Object} userData - User registration data.
 * @returns {Object|Number} - Created user, 409 if email exists, or 500 on error.
 */
const userRegister = async (userData) => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) return 409;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    // Create and return the new user
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.error('Error during user registration:', error);
    return 500;
  }
};

/**
 * Logs in an existing user.
 * @param {Object} userDetails - Email and password.
 * @returns {Object|Number} - { user, token }, 404 if not found, 400 for invalid password, or 500 on error.
 */
const userLogin = async (userDetails) => {
  try {
    // Check if user exists
    const user = await User.findOne({ email: userDetails.email });
    if (!user) return 404;

    // Validate password
    const isMatch = await bcrypt.compare(userDetails.password, user.password);
    if (!isMatch) return 400;

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '6d' }
    );

    return { user, token };
  } catch (error) {
    console.error('Error during user login:', error);
    return 500;
  }
};

module.exports = {
  userRegister,
  userLogin,
};
