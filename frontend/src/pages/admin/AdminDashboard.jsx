import React from 'react';
import { Link } from 'react-router-dom';
import { Page, Container, PageHeader, Card } from '../../components/UI';
import { Wrench, UsersRound, Train } from 'lucide-react';

export default function AdminDashboard() {
  const tiles = [
    { to: '/admin/trains', title: 'Manage Trains', icon: Train, desc: 'Add/update trains and schedules' },
    { to: '/admin/passengers', title: 'Passengers', icon: UsersRound, desc: 'View passenger bookings' },
    { to: '/search', title: 'Search Trains', icon: Wrench, desc: 'Find and verify trains' },
  ];

  return (
    <Page>
      <Container>
        <PageHeader title="Admin Dashboard" subtitle="Administration tools" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiles.map(t => (
            <Link key={t.to} to={t.to}>
              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <t.icon className="text-primary" />
                  <div>
                    <div className="text-lg font-semibold">{t.title}</div>
                    <div className="text-gray-600">{t.desc}</div>
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
