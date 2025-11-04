import React, { useState } from 'react';
import api from '../lib/api';
import { Page, Container, PageHeader, Card, Input, Button } from '../components/UI';
import { QrCode } from 'lucide-react';

export default function SearchPNR() {
  const [pnr, setPnr] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  async function lookup(e) {
    e.preventDefault();
    setError(''); setResult(null);
    try {
      const res = await api.get(`/api/booking/pnr/${pnr}`);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Lookup failed');
    }
  }

  return (
    <Page>
      <Container>
        <PageHeader title="PNR Status" subtitle="Check your ticket" icon={QrCode} />
        <Card className="p-6 max-w-lg">
          <form onSubmit={lookup} className="space-y-3">
            <Input label="PNR" value={pnr} onChange={(e)=>setPnr(e.target.value)} required />
            <Button type="submit">Check Status</Button>
          </form>
          {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
          {result && (
            <div className="mt-4 text-sm">
              <div><span className="font-semibold">PNR:</span> {result.pnr}</div>
              <div><span className="font-semibold">Status:</span> {result.status}</div>
            </div>
          )}
        </Card>
      </Container>
    </Page>
  );
}
