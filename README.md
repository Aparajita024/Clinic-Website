# Avira Clinic

Production-ready full-stack clinic website with:
- Public marketing site + appointment form (React)
- Secure admin dashboard for appointment management
- Node/Express API with MongoDB Atlas, JWT auth, validation, email, and rate limiting

## Tech Stack

### Frontend
- React 18
- React Router
- Axios
- Sonner (toasts)

### Backend
- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- JWT authentication
- bcrypt password hashing
- express-validator
- Nodemailer
- express-rate-limit
- CORS + Helmet

## Project Structure

```text
.
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── scripts
│   ├── utils
│   ├── server.js
│   └── .env.example
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   └── lib
│   └── .env.example
└── README.md
```

## Features

- Public appointment submission form
- Optional preferred appointment date field
- Contact API support
- Admin login with JWT
- Protected admin dashboard routes
- Appointment list with:
  - Date filter
  - Status filter
  - Status update (`Pending`, `Confirmed`, `Cancelled`)
  - Delete action
  - Pagination
- Email notifications:
  - Patient confirmation email
  - Clinic admin notification email

## Local Setup

## 1) Clone and install

```bash
git clone <your-repo-url>
cd Avira-Clinic
```

### Backend install
```bash
cd backend
npm install
```

### Frontend install
```bash
cd ../frontend
npm install
```

## 2) Environment variables

### Backend
Copy `backend/.env.example` to `backend/.env` and fill real values:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=...
JWT_SECRET=...
JWT_EXPIRES_IN=1d
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MINUTES=15
RATE_LIMIT_MAX_REQUESTS=200
AUTH_RATE_LIMIT_MAX_REQUESTS=10
SMTP_HOST=...
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=...
SMTP_PASS=...
FROM_EMAIL=Avira Clinic <no-reply@aviraclinic.com>
CLINIC_ADMIN_EMAIL=info@aviraclinic.com
```

### Frontend
Copy `frontend/.env.example` to `frontend/.env`:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

## 3) Create admin user

From `backend` folder:

```bash
npm run create-admin -- --name "Admin Name" --email "admin@example.com" --password "StrongPass123!"
```

## 4) Run locally

### Start backend
```bash
cd backend
npm run dev
```

### Start frontend
```bash
cd frontend
npm start
```

Open `http://localhost:3000`.

Admin routes:
- `/admin/login`
- `/admin/dashboard`

## API Endpoints

### Public
- `POST /api/appointments`
- `POST /api/contact`

### Admin
- `POST /api/admin/login`
- `GET /api/appointments`
- `PUT /api/appointments/:id`
- `DELETE /api/appointments/:id`

### Health
- `GET /api/health`

## Deployment

## Backend (Render)
1. Create a new Web Service from `backend`.
2. Build command: `npm install`
3. Start command: `npm start`
4. Add backend environment variables in Render dashboard.
5. Set `CORS_ORIGIN` to your frontend domain.

## Frontend (Vercel)
1. Import `frontend` as a Vercel project.
2. Build command: `npm run build`
3. Output directory: `build`
4. Add env variable:
   - `REACT_APP_API_BASE_URL=https://<your-render-backend>/api`

## Production Security Checklist

- Use a long random `JWT_SECRET`
- Restrict MongoDB network access where possible
- Keep `.env` files out of git
- Use strong admin password and rotate regularly
- Keep rate limiting enabled
- Set `NODE_ENV=production` in production

## Notes

- Public site layout remains unchanged; admin UI is isolated in `/admin/*`.
- Favicon is configured from `frontend/public/favicon.png`.
