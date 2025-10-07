module.exports = {
    validateUserInput: function(input) {
        const { username, password, email } = input;
        const usernameRegex = /^[a-zA-Z0-9]{3,30}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!usernameRegex.test(username)) {
            return { valid: false, message: "Username must be 3-30 characters long and can only contain letters and numbers." };
        }
        if (!passwordRegex.test(password)) {
            return { valid: false, message: "Password must be 6-20 characters long and include at least one uppercase letter, one lowercase letter, and one number." };
        }
        if (!emailRegex.test(email)) {
            return { valid: false, message: "Invalid email format." };
        }
        return { valid: true, message: "Input is valid." };
    },

    validateBooking: function(booking) {
        const { userId, trainId, seatNumber } = booking;

        if (!userId || !trainId || !seatNumber) {
            return { valid: false, message: "User ID, Train ID, and Seat Number are required." };
        }
        return { valid: true, message: "Booking is valid." };
    },

    validateTrainSchedule: function(schedule) {
        const { trainId, departureTime, arrivalTime } = schedule;

        if (!trainId || !departureTime || !arrivalTime) {
            return { valid: false, message: "Train ID, Departure Time, and Arrival Time are required." };
        }
        if (new Date(departureTime) >= new Date(arrivalTime)) {
            return { valid: false, message: "Departure time must be before arrival time." };
        }
        return { valid: true, message: "Schedule is valid." };
    }
};