import React from 'react';
import { Search, TicketCheck, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Page, Container, PageHeader, Card } from '../components/UI';

export default function Dashboard() {
  const links = [
    { to: '/search', title: 'Search Trains', icon: Search, desc: 'Find trains by name or number' },
    { to: '/book', title: 'Book Ticket', icon: TicketCheck, desc: 'Reserve your seat quickly' },
    { to: '/pnr', title: 'PNR Status', icon: QrCode, desc: 'Check booking status by PNR' }
  ];

  return (
    <Page>
      <Container>
        <PageHeader title="Your Dashboard" subtitle="Quick actions" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((x) => (
            <Link to={x.to} key={x.to}>
              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <x.icon className="text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">{x.title}</h3>
                    <p className="text-gray-600">{x.desc}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Page>
  );
}
