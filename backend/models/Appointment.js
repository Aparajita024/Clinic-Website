// Appointment model stores patient booking requests and admin workflow status.
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 120,
    },
    preferredDate: {
      type: Date,
      default: null,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

appointmentSchema.index({ createdAt: -1 });
appointmentSchema.index({ status: 1, preferredDate: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
