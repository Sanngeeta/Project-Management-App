const authService = require("../services/user.services");

/**
 * Controller: Register a new user
 */
const register = async (req, res) => {
  const user = await authService.userRegister(req.body);

  if (user === 409) {
    return res
      .status(409)
      .json({ status: 409, message: "User already exists" });
  } else if (user === 500) {
    return res
      .status(500)
      .json({
        status: 500,
        message: "Internal server error while registration",
      });
  }

  return res.status(201).json({
    status: 201,
    message: "User registered successfully",
    data: user,
  });
};

/**
 * Controller: Login user
 */
const login = async (req, res) => {
  const result = await authService.userLogin(req.body);

  if (result === 404) {
    return res.status(404).json({ status: 404, message: "User not found" });
  } else if (result === 400) {
    return res
      .status(400)
      .json({ status: 400, message: "Invalid email or password" });
  } else if (result === 500) {
    return res.status(500).json({ status: 500, message: "Login failed" });
  }

  return res.status(200).json({
    status: 200,
    message: "Login successful",
    data: result,
  });
};

module.exports = {
  register,
  login,
};
