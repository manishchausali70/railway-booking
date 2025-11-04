import React, { useEffect, useState } from 'react';
import api from '../../lib/api';

export default function ManageTrains() {
  const [trains, setTrains] = useState([]);
  const [form, setForm] = useState({ trainNumber: '', trainName: '', from: '', to: '', departure: '', arrival: '', fare: '' });

  async function load() {
    const res = await api.get('/api/admin/trains');
    setTrains(res.data);
  }

  useEffect(() => { load(); }, []);

  async function addTrain(e) {
    e.preventDefault();
    const payload = { ...form, fare: Number(form.fare) };
    await api.post('/api/admin/addTrain', payload);
    setForm({ trainNumber: '', trainName: '', from: '', to: '', departure: '', arrival: '', fare: '' });
    load();
  }

  async function remove(id) {
    await api.delete(`/api/admin/removeTrain/${id}`);
    load();
  }

  function setField(k, v) { setForm(s => ({ ...s, [k]: v })); }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Trains</h1>
      <form onSubmit={addTrain} className="bg-white p-4 rounded shadow grid md:grid-cols-7 gap-2">
        <input className="border p-2 rounded" placeholder="Number" value={form.trainNumber} onChange={e=>setField('trainNumber', e.target.value)} />
        <input className="border p-2 rounded" placeholder="Name" value={form.trainName} onChange={e=>setField('trainName', e.target.value)} />
        <input className="border p-2 rounded" placeholder="From" value={form.from} onChange={e=>setField('from', e.target.value)} />
        <input className="border p-2 rounded" placeholder="To" value={form.to} onChange={e=>setField('to', e.target.value)} />
        <input className="border p-2 rounded" placeholder="Departure (HH:MM)" value={form.departure} onChange={e=>setField('departure', e.target.value)} />
        <input className="border p-2 rounded" placeholder="Arrival (HH:MM)" value={form.arrival} onChange={e=>setField('arrival', e.target.value)} />
        <input className="border p-2 rounded" placeholder="Fare" type="number" value={form.fare} onChange={e=>setField('fare', e.target.value)} />
        <button className="bg-primary text-white px-4 py-2 rounded md:col-span-7" type="submit">Add Train</button>
      </form>

      <div className="mt-4 bg-white rounded shadow overflow-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-light">
            <tr>
              <th className="text-left p-2">Number</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">From</th>
              <th className="text-left p-2">To</th>
              <th className="text-left p-2">Departure</th>
              <th className="text-left p-2">Arrival</th>
              <th className="text-left p-2">Fare</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trains.map(t => (
              <tr key={t.trainId} className="border-t">
                <td className="p-2">{t.trainNumber}</td>
                <td className="p-2">{t.trainName}</td>
                <td className="p-2">{t.from}</td>
                <td className="p-2">{t.to}</td>
                <td className="p-2">{t.departure}</td>
                <td className="p-2">{t.arrival}</td>
                <td className="p-2">₹{t.fare}</td>
                <td className="p-2">
                  <button className="text-red-600 underline" onClick={()=>remove(t.trainId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
