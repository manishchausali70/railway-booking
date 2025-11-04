import React from 'react';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import BookTicket from '../pages/BookTicket.jsx';
import SearchTrain from '../pages/SearchTrain.jsx';
import SearchPNR from '../pages/SearchPNR.jsx';
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import ManageTrains from '../pages/admin/ManageTrains.jsx';
import Passengers from '../pages/admin/Passengers.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import ViewBookings from '../pages/ViewBookings.jsx';
import { AuthProvider, useAuth } from '../auth/AuthContext.jsx';

function Protected({ children, admin, userOnly }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (admin && user.role !== 'admin') return <Navigate to="/" replace />;
  if (userOnly && user.role !== 'user') return <Navigate to="/" replace />;
  return children;
}

function HomeRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={user.role === 'admin' ? '/admin' : '/user'} replace />;
}

function Layout({ children }) {
  const { user, logout } = useAuth();
  const brandHref = user ? (user.role === 'admin' ? '/admin' : '/user') : '/login';
  return (
    <div>
      <header className="bg-primary text-white">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <Link to={brandHref} className="font-bold">Railway Booking</Link>
          <nav className="flex gap-4">
            {!user && <Link to="/login" className="hover:underline">Login</Link>}
            {user?.role === 'user' && (
              <>
                <Link to="/user" className="hover:underline">Dashboard</Link>
                <Link to="/book" className="hover:underline">Book</Link>
                <Link to="/user/bookings" className="hover:underline">My Bookings</Link>
              </>
            )}
            {user?.role === 'admin' && (
              <>
                <Link to="/admin" className="hover:underline">Admin</Link>
                <Link to="/admin/trains" className="hover:underline">Manage Trains</Link>
                <Link to="/admin/passengers" className="hover:underline">Passengers</Link>
              </>
            )}
            {user && <button onClick={logout} className="ml-2 underline">Logout</button>}
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<Protected userOnly><Dashboard /></Protected>} />
          <Route path="/book" element={<Protected userOnly><BookTicket /></Protected>} />
          <Route path="/user/bookings" element={<Protected userOnly><ViewBookings /></Protected>} />

          <Route path="/admin" element={<Protected admin><AdminDashboard /></Protected>} />
          <Route path="/admin/trains" element={<Protected admin><ManageTrains /></Protected>} />
          <Route path="/admin/passengers" element={<Protected admin><Passengers /></Protected>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
