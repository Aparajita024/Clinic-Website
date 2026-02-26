// Contact routes expose public endpoint for general inquiries.
const express = require('express');
const { body } = require('express-validator');
const { createContact } = require('../controllers/contactController');

const router = express.Router();
const phoneRegex = /^\d{10}$/;

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required.').isLength({ min: 2 }).withMessage('Name must be at least 2 characters long.'),
    body('phone').trim().notEmpty().withMessage('Phone number is required.').matches(phoneRegex).withMessage('Phone number format is invalid.'),
    body('email').optional({ checkFalsy: true }).isEmail().withMessage('Email format is invalid.').normalizeEmail(),
    body('message').trim().notEmpty().withMessage('Message is required.').isLength({ max: 2000 }).withMessage('Message cannot exceed 2000 characters.'),
  ],
  createContact
);

module.exports = router;
