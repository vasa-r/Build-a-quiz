const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const isUserExist = await User.findOne({ email }).lean();

    if (isUserExist) {
      return res.status(409).json({
        success: false,
        message: "Email already exist. Please Sign In",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Registration failed. Please try again later",
      });
    }

    res.status(201).json({
      success: true,
      message: "Signup successful",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email }).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please Sign Up",
      });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please enter correct password",
      });
    }

    const token = jwt.sign({ userId: user._id }, secret);

    res.status(202).json({
      success: true,
      message: "Login Successful",
      token: token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { createUser, loginUser };
