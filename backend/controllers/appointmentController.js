// Appointment controller handles create/list/update/delete workflows.
const { validationResult } = require('express-validator');
const Appointment = require('../models/Appointment');
const { sendAppointmentEmails } = require('../utils/sendEmail');

const parseValidationErrors = (req) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return null;
  }

  return errors.array().map((error) => ({
    field: error.path,
    message: error.msg,
  }));
};

const createAppointment = async (req, res, next) => {
  try {
    const validationErrors = parseValidationErrors(req);
    if (validationErrors) {
      return res.status(400).json({ success: false, errors: validationErrors });
    }

    const { name, phone, email, preferredDate, message } = req.body;

    const appointment = await Appointment.create({
      name,
      phone,
      email: email || undefined,
      preferredDate: preferredDate || null,
      message: message || undefined,
    });

    await sendAppointmentEmails(appointment);

    return res.status(201).json({
      success: true,
      message: 'Appointment request submitted successfully.',
      data: appointment,
    });
  } catch (error) {
    return next(error);
  }
};

const getAppointments = async (req, res, next) => {
  try {
    const validationErrors = parseValidationErrors(req);
    if (validationErrors) {
      return res.status(400).json({ success: false, errors: validationErrors });
    }

    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.date) {
      const date = new Date(req.query.date);
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      filter.preferredDate = { $gte: startOfDay, $lte: endOfDay };
    }

    const [appointments, total] = await Promise.all([
      Appointment.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Appointment.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: appointments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return next(error);
  }
};

const updateAppointmentStatus = async (req, res, next) => {
  try {
    const validationErrors = parseValidationErrors(req);
    if (validationErrors) {
      return res.status(400).json({ success: false, errors: validationErrors });
    }

    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found.' });
    }

    return res.json({
      success: true,
      message: 'Appointment status updated successfully.',
      data: appointment,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found.' });
    }

    return res.json({
      success: true,
      message: 'Appointment deleted successfully.',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
};
