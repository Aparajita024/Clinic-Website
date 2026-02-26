// Admin controller handles login and JWT token issuance.
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Admin = require('../models/Admin');

const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

const loginAdmin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((error) => ({ field: error.path, message: error.msg })),
      });
    }

    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = generateToken(admin._id);

    return res.json({
      success: true,
      message: 'Login successful.',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  loginAdmin,
};
