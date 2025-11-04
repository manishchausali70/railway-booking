import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Page, Container, PageHeader, Card, Input } from '../components/UI';
import { Search } from 'lucide-react';

export default function SearchTrain() {
  const [q, setQ] = useState('');
  const [trains, setTrains] = useState([]);

  useEffect(() => { (async () => {
    const res = await api.get('/api/admin/trains');
    setTrains(res.data);
  })(); }, []);

  const filtered = trains.filter(t => {
    const s = (t.trainNumber + ' ' + t.trainName).toLowerCase();
    return s.includes(q.toLowerCase());
  });

  return (
    <Page>
      <Container>
        <PageHeader title="Search Trains" subtitle="Find by number or name" icon={Search} />
        <Card className="p-6">
          <Input label="Search" placeholder="e.g. 12345 or Rajdhani" value={q} onChange={(e)=>setQ(e.target.value)} />
          <div className="mt-4 grid md:grid-cols-2 gap-3">
            {filtered.map(t => (
              <div key={t.trainId} className="p-4 rounded border bg-white">
                <div className="font-semibold">{t.trainNumber}</div>
                <div className="text-gray-600">{t.trainName}</div>
              </div>
            ))}
            {filtered.length === 0 && <p className="text-gray-500">No trains found.</p>}
          </div>
        </Card>
      </Container>
    </Page>
  );
}
