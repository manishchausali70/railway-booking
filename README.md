# Railway Booking (SQL backend + React Vite Frontend)

- Modernized full-stack app with:
- Backend: Node.js, Express, Mongoose (MongoDB Atlas or local), JWT auth (access + refresh with HttpOnly cookie)
- Frontend: React (Vite) + Tailwind, React Router, Axios

Features
- Role-based login (User/Admin)
- User: Search trains, Book ticket, Search by PNR
- Admin: Manage trains, View passengers (bookings)

Project Structure
```
railway-booking
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── db
│   ├── utils
│   └── server.js
├── frontend (Vite React app)
│   ├── src
│   ├── index.html
│   └── package.json
└── README.md
```

Quick start (Windows PowerShell)

1) MySQL setup
- Create a database (default name): railway_tracking_system
- Set environment variables via .env file (see below)
-- This repo now uses MongoDB. If you run against MongoDB Atlas, set `MONGODB_URI` in `backend/.env`. The backend will create collections automatically.

Detailed MySQL commands (PowerShell)
1. Start MySQL server (if not already running). Use MySQL Workbench or Windows Services.
2. From PowerShell (mysql client must be in PATH):

```powershell
# create database (replace password prompt value when asked)
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS railway_tracking_system;"

# run the schema file (adjust path to your repo)
mysql -u root -p railway_tracking_system < .\backend\db\schema.sql
```

If you prefer GUI tools, open `backend/db/schema.sql` in MySQL Workbench and run the statements.

2) Backend
```
cd backend
ni .env -ItemType File
# Open .env in editor and add values like:
# DB_NAME=railway_tracking_system
# DB_USER=root
# DB_PASS=your_mysql_password
# DB_HOST=127.0.0.1
# DB_PORT=3306
# FRONTEND_ORIGIN=http://localhost:5173
# ACCESS_SECRET=replace_with_strong_secret
# REFRESH_SECRET=replace_with_strong_secret

npm install
npm start
```
The server starts on http://localhost:3000

3) Frontend (Vite React)
```
cd ../frontend
npm install
npm run dev
```
Open the shown URL (default http://localhost:5173)

API overview
- POST /api/auth/register {username,password,role?}
- POST /api/auth/login {username,password}
- POST /api/auth/refresh (uses HttpOnly cookie)
- POST /api/auth/logout
- GET  /api/admin/trains (public list)
- POST /api/admin/addTrain (admin)
- DELETE /api/admin/removeTrain/:trainId (admin)
- PUT /api/admin/updateSchedule/:trainId (admin)
- GET  /api/admin/passengers (admin)
- POST /api/booking/book {userId, seatNumber, trainNumber or trainId}
- GET  /api/booking/:bookingId
- PUT  /api/booking/update/:bookingId {seatNumber}
- DELETE /api/booking/cancel/:bookingId
- GET  /api/booking/pnr/:pnr
- GET  /api/tracking/track/:trainId

Notes
- Configure MySQL credentials in backend/.env; do not hardcode secrets in code.
- CORS is enabled for http://localhost:5173 with credentials for refresh cookie.
-- Mongoose schemas are used and collections will be created automatically when the server runs.