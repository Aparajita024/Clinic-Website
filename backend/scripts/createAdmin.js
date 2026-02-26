// Script to create an admin user manually for first-time setup.
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');

dotenv.config();

const parseArgs = () => {
  const args = process.argv.slice(2);
  const getValue = (flag) => {
    const index = args.indexOf(flag);
    return index > -1 ? args[index + 1] : undefined;
  };

  return {
    name: getValue('--name') || process.env.SEED_ADMIN_NAME,
    email: getValue('--email') || process.env.SEED_ADMIN_EMAIL,
    password: getValue('--password') || process.env.SEED_ADMIN_PASSWORD,
  };
};

const createAdmin = async () => {
  const { name, email, password } = parseArgs();

  if (!name || !email || !password) {
    throw new Error('Missing required arguments. Use --name --email --password or set SEED_ADMIN_* env vars.');
  }

  await connectDB();

  const existingAdmin = await Admin.findOne({ email: email.toLowerCase().trim() });
  if (existingAdmin) {
    throw new Error('Admin with this email already exists.');
  }

  const admin = await Admin.create({
    name,
    email: email.toLowerCase().trim(),
    password,
  });

  console.log(`Admin created successfully: ${admin.email}`);
  process.exit(0);
};

createAdmin().catch((error) => {
  console.error('Admin creation failed:', error.message);
  process.exit(1);
});
