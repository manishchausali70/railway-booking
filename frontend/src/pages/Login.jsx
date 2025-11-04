import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRound, Shield, LogIn, UserPlus } from 'lucide-react';
import { Page, Container, Card, PageHeader, Button, Input, FadeIn } from '../components/UI';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Login() {
  const { login, register } = useAuth();
  const [role, setRole] = useState('user');
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'login') {
        const user = await login(email, password);
        navigate(user?.role === 'admin' ? '/admin' : '/user');
      } else {
        const user = await register(name, email, password, role);
        navigate(user?.role === 'admin' ? '/admin' : '/user');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page>
      <Container>
        <FadeIn>
          <PageHeader title={mode === 'login' ? 'Welcome back' : 'Create your account'} subtitle="Railway Booking System" icon={mode === 'login' ? LogIn : UserPlus} />
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <FadeIn delay={0.05}>
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2 bg-blue-50 p-1 rounded-lg w-fit">
                  <Button type="button" variant={role === 'user' ? 'primary' : 'ghost'} onClick={() => setRole('user')} className="gap-2">
                    <UserRound size={18} /> User
                  </Button>
                  <Button type="button" variant={role === 'admin' ? 'primary' : 'ghost'} onClick={() => setRole('admin')} className="gap-2">
                    <Shield size={18} /> Admin
                  </Button>
                </div>
                {mode === 'register' && (
                  <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
                )}
                <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
                <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
                {mode === 'register' && (
                  <p className="text-sm text-gray-500">Account will be created with role: <span className="font-semibold">{role}</span></p>
                )}
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="flex items-center gap-3">
                  <Button type="submit" disabled={loading} className="gap-2">
                    {mode === 'login' ? <LogIn size={18} /> : <UserPlus size={18} />}
                    {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
                    {mode === 'login' ? 'Create an account' : 'I already have an account'}
                  </Button>
                </div>
              </form>
            </Card>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Why use this app?</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Search trains by name/number</li>
                <li>Book tickets quickly and securely</li>
                <li>Track trains and check PNR status</li>
                <li>Admin can manage trains and view passengers</li>
              </ul>
            </Card>
          </FadeIn>
        </div>
      </Container>
    </Page>
  );
}
