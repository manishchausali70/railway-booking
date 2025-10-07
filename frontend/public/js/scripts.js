// This file contains JavaScript code for client-side functionality, handling user interactions and AJAX requests.

document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const searchForm = document.getElementById('searchForm');
    const trackingForm = document.getElementById('trackingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const trainNumber = document.getElementById('trainNumber').value;
        const userId = document.getElementById('userId').value;
        const seatNumber = document.getElementById('seatNumber').value;

        try {
            const response = await fetch('http://localhost:3000/api/booking/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ trainNumber, userId, seatNumber })
            });
            const data = await response.json();
            document.getElementById('bookingMessage').innerText = data.message || 'Booking successful!';
            if (data.success) {
                bookingForm.reset();
            }
        } catch (error) {
            document.getElementById('bookingMessage').innerText = 'Booking failed. Please try again.';
            console.error('Error:', error);
        }
    });
// ...existing code...
    }

    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const searchData = new FormData(searchForm);
            fetch('/api/search', {
                method: 'POST',
                body: searchData
            })
            .then(response => response.json())
            .then(data => {
                // Handle search results
                const resultsContainer = document.getElementById('searchResults');
                resultsContainer.innerHTML = '';
                data.trains.forEach(train => {
                    const trainElement = document.createElement('div');
                    trainElement.textContent = `Train Number: ${train.number}, Name: ${train.name}`;
                    resultsContainer.appendChild(trainElement);
                });
            })
            .catch(error => console.error('Error:', error));
        });
    }

    if (trackingForm) {
        trackingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const trackingData = new FormData(trackingForm);
            fetch('/api/track', {
                method: 'POST',
                body: trackingData
            })
            .then(response => response.json())
            .then(data => {
                // Handle tracking results
                const trackingInfo = document.getElementById('trackingInfo');
                trackingInfo.textContent = `Train Status: ${data.status}, Location: ${data.location}`;
            })
            .catch(error => console.error('Error:', error));
        });
    }
});