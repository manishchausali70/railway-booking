import React, { useEffect, useState } from 'react';
import api from '../../lib/api';

export default function Passengers() {
  const [rows, setRows] = useState([]);

  useEffect(() => { (async () => {
    const res = await api.get('/api/admin/passengers');
    setRows(res.data);
  })(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Passengers</h1>
      <div className="overflow-auto bg-white rounded shadow">
        <table className="w-full min-w-[900px]">
          <thead className="bg-light">
            <tr>
              <th className="text-left p-2">Passenger</th>
              <th className="text-left p-2">Age</th>
              <th className="text-left p-2">Train</th>
              <th className="text-left p-2">Route</th>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">User Email</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.bookingId} className="border-t">
                <td className="p-2">{r.passengerName}</td>
                <td className="p-2">{r.age}</td>
                <td className="p-2">{r.train?.trainNumber} - {r.train?.trainName}</td>
                <td className="p-2">{r.train?.from} → {r.train?.to}</td>
                <td className="p-2">{new Date(r.date).toLocaleDateString()}</td>
                <td className="p-2">{r.user?.email}</td>
                <td className="p-2">{r.bookingStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
