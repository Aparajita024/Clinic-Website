// Admin routes expose JWT login endpoint for dashboard authentication.
const express = require('express');
const { body } = require('express-validator');
const { loginAdmin } = require('../controllers/adminController');

const router = express.Router();

router.post(
  '/login',
  [
    body('email').trim().notEmpty().withMessage('Email is required.').isEmail().withMessage('Email format is invalid.').normalizeEmail(),
    body('password').trim().notEmpty().withMessage('Password is required.').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.'),
  ],
  loginAdmin
);

module.exports = router;
