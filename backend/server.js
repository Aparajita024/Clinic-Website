process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

// Main Express server bootstrap with security, routing, and error handling.
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');

const connectDB = require('./config/db');
const appointmentRoutes = require('./routes/appointmentRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const { apiLimiter, authLimiter } = require('./middleware/rateLimiter');

dotenv.config();

const app = express();

const corsOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || corsOrigins.length === 0 || corsOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('CORS not allowed for this origin'));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '200kb' }));
app.use(express.urlencoded({ extended: false }));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is healthy.' });
});

app.use('/api/admin/login', authLimiter);
app.use('/api', apiLimiter);

app.use('/api/admin', adminRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/contact', contactRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  const port = Number(process.env.PORT) || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer().catch((error) => {
  console.error('Server startup failed:', error.message);
  process.exit(1);
});
