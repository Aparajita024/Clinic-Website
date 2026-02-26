// Authentication middleware verifies JWT tokens for protected admin routes.
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protectAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: missing token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('_id name email');

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Unauthorized: admin not found.' });
    }

    req.admin = admin;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized: invalid token.' });
  }
};

module.exports = {
  protectAdmin,
};
