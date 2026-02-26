// Email helper sends appointment notifications to patient and clinic admin.
const nodemailer = require('nodemailer');

const createTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === 'true',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
};

const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = createTransporter();

  if (!transporter) {
    console.warn('SMTP configuration is incomplete. Skipping email send.');
    return false;
  }

  await transporter.sendMail({
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to,
    subject,
    text,
    html,
  });

  return true;
};

const sendAppointmentEmails = async (appointment) => {
  const clinicAdminEmail = process.env.CLINIC_ADMIN_EMAIL;
  const tasks = [];

  if (appointment.email) {
    tasks.push(
      sendEmail({
        to: appointment.email,
        subject: 'Appointment request received - Avira Clinic',
        text: `Hi ${appointment.name}, your appointment request has been received. We will contact you soon.`,
        html: `<p>Hi ${appointment.name},</p><p>Your appointment request has been received. We will contact you soon.</p><p>Thank you,<br/>Avira Clinic</p>`,
      })
    );
  }

  if (clinicAdminEmail) {
    const preferredDate = appointment.preferredDate
      ? new Date(appointment.preferredDate).toLocaleString()
      : 'Not provided';

    tasks.push(
      sendEmail({
        to: clinicAdminEmail,
        subject: 'New appointment request - Avira Clinic',
        text: `New appointment request from ${appointment.name}. Phone: ${appointment.phone}. Email: ${appointment.email || 'N/A'}. Preferred date: ${preferredDate}. Message: ${appointment.message || 'N/A'}`,
        html: `
          <h3>New appointment request</h3>
          <p><strong>Name:</strong> ${appointment.name}</p>
          <p><strong>Phone:</strong> ${appointment.phone}</p>
          <p><strong>Email:</strong> ${appointment.email || 'N/A'}</p>
          <p><strong>Preferred Date:</strong> ${preferredDate}</p>
          <p><strong>Message:</strong> ${appointment.message || 'N/A'}</p>
        `,
      })
    );
  }

  if (tasks.length > 0) {
    await Promise.allSettled(tasks);
  }
};

module.exports = {
  sendEmail,
  sendAppointmentEmails,
};
