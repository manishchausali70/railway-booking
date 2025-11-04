import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Page, Container, PageHeader, Card } from '../components/UI';
import { Ticket } from 'lucide-react';

export default function ViewBookings() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/api/booking');
        setRows(res.data);
      } catch (e) {
        setError(e?.response?.data?.message || 'Failed to load bookings');
      }
    })();
  }, []);

  return (
    <Page>
      <Container>
        <PageHeader title="My Bookings" subtitle="Your recent tickets" icon={Ticket} />
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <Card className="p-0 overflow-auto">
          <table className="w-full">
            <thead className="bg-light">
              <tr>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Passenger</th>
                <th className="text-left p-2">Train</th>
                <th className="text-left p-2">Route</th>
                <th className="text-left p-2">PNR</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.bookingId} className="border-t">
                  <td className="p-2">{new Date(r.date).toLocaleDateString()}</td>
                  <td className="p-2">{r.passengerName} ({r.age})</td>
                  <td className="p-2">{r.train?.trainNumber} - {r.train?.trainName}</td>
                  <td className="p-2">{r.train?.from} → {r.train?.to}</td>
                  <td className="p-2">{r.pnr || '-'}</td>
                  <td className="p-2">{r.bookingStatus}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td className="p-4 text-center text-gray-500" colSpan={6}>No bookings yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </Container>
    </Page>
  );
}
