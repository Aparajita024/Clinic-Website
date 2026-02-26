// Contact controller handles website contact inquiries.
const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');

const createContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((error) => ({ field: error.path, message: error.msg })),
      });
    }

    const { name, phone, email, message } = req.body;

    const contact = await Contact.create({
      name,
      phone,
      email: email || undefined,
      message,
    });

    return res.status(201).json({
      success: true,
      message: 'Contact message submitted successfully.',
      data: contact,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createContact,
};
