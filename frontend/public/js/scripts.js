// This file contains JavaScript code for client-side functionality, handling user interactions and AJAX requests.

document.addEventListener('DOMContentLoaded', function () {
    const API_BASE = 'http://localhost:3000';

    const bookingForm = document.getElementById('bookingForm');
    const searchForm = document.getElementById('searchForm');
    const trackingForm = document.getElementById('trackingForm');
    const manageTrainForm = document.getElementById('manageTrainForm');
    const trainsTable = document.getElementById('trainsTable');

    // Helpers
    async function fetchJSON(url, options = {}) {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    }

    async function loadTrains() {
        if (!trainsTable) return;
        try {
            const data = await fetchJSON(`${API_BASE}/api/admin/trains`);
            const tbody = trainsTable.querySelector('tbody');
            tbody.innerHTML = '';
            data.forEach((t) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${t.trainNumber}</td>
                    <td>${t.trainName}</td>
                    <td>-</td>
                    <td>
                        <button class="button" data-delete="${t.trainId}">Delete</button>
                    </td>`;
                tbody.appendChild(tr);
            });
            tbody.querySelectorAll('button[data-delete]').forEach((btn) => {
                btn.addEventListener('click', async (e) => {
                    const id = e.target.getAttribute('data-delete');
                    try {
                        await fetchJSON(`${API_BASE}/api/admin/removeTrain/${id}`, { method: 'DELETE' });
                        await loadTrains();
                    } catch (err) {
                        console.error('Delete failed', err);
                        alert('Failed to delete train');
                    }
                });
            });
        } catch (err) {
            console.error('Failed to load trains', err);
        }
    }

    // Booking form
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const trainNumber = document.getElementById('trainNumber').value.trim();
            const userId = document.getElementById('userId').value.trim();
            const seatNumber = document.getElementById('seatNumber').value.trim();

            try {
                const data = await fetchJSON(`${API_BASE}/api/booking/book`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ trainNumber, userId, seatNumber })
                });
                const msg = document.getElementById('bookingMessage');
                if (msg) msg.innerText = data.message || 'Booking successful!';
                bookingForm.reset();
            } catch (error) {
                const msg = document.getElementById('bookingMessage');
                if (msg) msg.innerText = 'Booking failed. Please try again.';
                console.error('Error:', error);
            }
        });
    }

    // Search form - simple client-side filter using all trains
    if (searchForm) {
        searchForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const from = document.getElementById('from').value.trim().toLowerCase();
            const to = document.getElementById('to').value.trim().toLowerCase();
            const date = document.getElementById('date').value; // currently unused
            try {
                const trains = await fetchJSON(`${API_BASE}/api/admin/trains`);
                const resultsContainer = document.getElementById('searchResults');
                resultsContainer.innerHTML = '';
                const filtered = trains.filter((t) =>
                    t.trainName.toLowerCase().includes(from) ||
                    t.trainName.toLowerCase().includes(to) ||
                    t.trainNumber.toLowerCase().includes(from) ||
                    t.trainNumber.toLowerCase().includes(to)
                );
                if (filtered.length === 0) {
                    resultsContainer.textContent = 'No matching trains found.';
                } else {
                    filtered.forEach((t) => {
                        const el = document.createElement('div');
                        el.textContent = `Train Number: ${t.trainNumber}, Name: ${t.trainName}`;
                        resultsContainer.appendChild(el);
                    });
                }
            } catch (error) {
                console.error('Search error:', error);
            }
        });
    }

    // Tracking form - find train by number then call tracking API
    if (trackingForm) {
        trackingForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const numberInput = document.getElementById('trainNumber');
            const trainNumber = numberInput ? numberInput.value.trim() : '';
            const resultBox = document.getElementById('trackingResult');
            try {
                const trains = await fetchJSON(`${API_BASE}/api/admin/trains`);
                const match = trains.find((t) => t.trainNumber === trainNumber);
                if (!match) {
                    resultBox.textContent = 'Train not found.';
                    return;
                }
                const data = await fetchJSON(`${API_BASE}/api/tracking/track/${match.trainId}`);
                resultBox.textContent = `Train ${data.train.trainNumber} - ${data.train.trainName}` +
                    (data.schedule ? ` | Last departure: ${new Date(data.schedule.departureTime).toLocaleString()}` : ' | No schedule available');
            } catch (error) {
                console.error('Tracking error:', error);
                if (resultBox) resultBox.textContent = 'Failed to fetch tracking info.';
            }
        });
    }

    // Manage trains page
    if (manageTrainForm) {
        manageTrainForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const trainNumber = document.getElementById('trainNumber').value.trim();
            const trainName = document.getElementById('trainName').value.trim();
            try {
                await fetchJSON(`${API_BASE}/api/admin/addTrain`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ trainNumber, trainName })
                });
                manageTrainForm.reset();
                await loadTrains();
            } catch (err) {
                console.error('Add train failed', err);
                alert('Failed to add train');
            }
        });
        // Initial load
        loadTrains();
    }
});