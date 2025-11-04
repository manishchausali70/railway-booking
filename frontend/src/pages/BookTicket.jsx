import React, { useState } from 'react';
import api from '../lib/api';
import { Page, Container, PageHeader, Card, Input, Button } from '../components/UI';
import { TicketCheck } from 'lucide-react';

export default function BookTicket() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [trains, setTrains] = useState([]);
  const [selected, setSelected] = useState(null);
  const [passengerName, setPassengerName] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function search(e) {
    e?.preventDefault();
    setError('');
    setMessage('');
    setSelected(null);
    try {
      const res = await api.get('/api/trains/search', { params: { from, to } });
      setTrains(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Search failed');
    }
  }

  async function book(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!selected) return setError('Please select a train');
    setLoading(true);
    try {
      const res = await api.post('/api/booking/book', {
        trainId: selected.trainId,
        passengerName,
        age: Number(age),
        date
      });
      setMessage(`${res.data.message}`);
      // reset
      setSelected(null);
      setPassengerName('');
      setAge('');
      setDate('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page>
      <Container>
        <PageHeader title="Book Ticket" subtitle="Search a route and add passenger details" icon={TicketCheck} />
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <form onSubmit={search} className="space-y-4">
              <Input label="From" value={from} onChange={e=>setFrom(e.target.value)} placeholder="Origin station" required />
              <Input label="To" value={to} onChange={e=>setTo(e.target.value)} placeholder="Destination station" required />
              <Input label="Travel Date" type="date" value={date} onChange={e=>setDate(e.target.value)} required />
              <Button type="submit">Search Trains</Button>
            </form>
            <div className="mt-4">
              {trains.length > 0 ? (
                <div className="divide-y">
                  {trains.map(t => (
                    <div key={t.trainId} className={`p-3 cursor-pointer ${selected?.trainId===t.trainId ? 'bg-blue-50 border border-blue-200 rounded' : ''}`} onClick={()=>setSelected(t)}>
                      <div className="font-medium">{t.trainNumber} - {t.trainName}</div>
                      <div className="text-sm text-gray-600">{t.from} → {t.to} • {t.departure} → {t.arrival} • ₹{t.fare}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500">No results yet</div>
              )}
            </div>
          </Card>
          <Card className="p-6">
            <form onSubmit={book} className="space-y-4">
              <div className="text-sm text-gray-700">Selected Train</div>
              <div className="p-3 bg-light rounded border border-gray-200 min-h-[56px]">
                {selected ? (
                  <>
                    <div className="font-medium">{selected.trainNumber} - {selected.trainName}</div>
                    <div className="text-sm text-gray-600">{selected.from} → {selected.to} • {selected.departure} → {selected.arrival} • ₹{selected.fare}</div>
                  </>
                ) : 'None'}
              </div>
              <Input label="Passenger Name" value={passengerName} onChange={e=>setPassengerName(e.target.value)} required />
              <Input label="Age" type="number" value={age} onChange={e=>setAge(e.target.value)} required />
              <Button type="submit" disabled={loading || !selected}>{loading ? 'Booking...' : 'Confirm Booking'}</Button>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              {message && <div className="text-green-700 text-sm">{message}</div>}
            </form>
          </Card>
        </div>
      </Container>
    </Page>
  );
}
