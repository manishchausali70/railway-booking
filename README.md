# Railway Tracking System

## Overview
The Railway Tracking System is a web-based application designed to address the challenges faced by Indian Railways, including unclear schedules, booking errors, and lack of real-time tracking. This system provides a user-friendly interface for passengers to search for trains, book seats, and track train statuses in real-time. Additionally, it offers an admin dashboard for managing trains and schedules effectively.

## Features
- **Seat Booking**: Users can easily book seats on available trains.
- **Booking Cancellation**: Users can cancel their bookings with a simple interface.
- **Real-Time Tracking**: Passengers can track the current status and location of trains.
- **Admin Dashboard**: Admins can manage train schedules, add or remove trains, and oversee bookings.
- **Data Validation**: The system ensures data integrity through SQL constraints and transactions.

## Technology Stack
- **Backend**: Node.js, Express.js, MySQL
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MySQL

## Project Structure
```
railway-tracking-system
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── db
│   ├── utils
│   └── server.js
├── frontend
│   ├── public
│   ├── views
│   └── package.json
└── README.md
```

## Setup Instructions
1. **Clone the Repository**: 
   ```
   git clone <repository-url>
   cd railway-tracking-system
   ```

2. **Backend Setup**:
   - Navigate to the `backend` directory.
   - Install dependencies:
     ```
     npm install
     ```
   - Set up the MySQL database using the `schema.sql` file located in the `db` directory.
   - Start the server:
     ```
     node server.js
     ```

3. **Frontend Setup**:
   - Navigate to the `frontend` directory.
   - Install dependencies:
     ```
     npm install
     ```
   - Open `index.html` in a web browser to access the application.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.