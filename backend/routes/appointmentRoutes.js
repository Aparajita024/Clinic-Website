// Appointment routes expose public create and admin-protected management endpoints.
const express = require('express');
const { body, query } = require('express-validator');
const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} = require('../controllers/appointmentController');
const { protectAdmin } = require('../middleware/authMiddleware');

const router = express.Router();
const phoneRegex = /^\d{10}$/;

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required.').isLength({ min: 2 }).withMessage('Name must be at least 2 characters long.'),
    body('phone').trim().notEmpty().withMessage('Phone number is required.').matches(phoneRegex).withMessage('Phone number format is invalid.'),
    body('email').optional({ checkFalsy: true }).isEmail().withMessage('Email format is invalid.').normalizeEmail(),
    body('preferredDate').optional({ checkFalsy: true }).isISO8601().withMessage('Preferred date must be a valid date.'),
    body('message').optional({ checkFalsy: true }).trim().isLength({ max: 2000 }).withMessage('Message cannot exceed 2000 characters.'),
  ],
  createAppointment
);

router.get(
  '/',
  protectAdmin,
  [
    query('status').optional().isIn(['Pending', 'Confirmed', 'Cancelled']).withMessage('Status must be Pending, Confirmed, or Cancelled.'),
    query('date').optional().isISO8601().withMessage('Date must be in YYYY-MM-DD format.'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer.'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100.'),
  ],
  getAppointments
);

router.put(
  '/:id',
  protectAdmin,
  [
    body('status').notEmpty().withMessage('Status is required.').isIn(['Pending', 'Confirmed', 'Cancelled']).withMessage('Status must be Pending, Confirmed, or Cancelled.'),
  ],
  updateAppointmentStatus
);

router.delete('/:id', protectAdmin, deleteAppointment);

module.exports = router;
