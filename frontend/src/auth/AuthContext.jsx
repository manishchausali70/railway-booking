import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/api';

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken'));

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  useEffect(() => {
    if (accessToken) localStorage.setItem('accessToken', accessToken);
    else localStorage.removeItem('accessToken');
  }, [accessToken]);

  useEffect(() => {
    // attach token to axios
    api.interceptors.request.use((config) => {
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
      config.withCredentials = true; // for refresh cookie
      return config;
    });
  }, [accessToken]);

  async function login(email, password) {
    const res = await api.post('/api/auth/login', { email, password });
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
    return res.data.user;
  }

  async function register(name, email, password, role) {
    await api.post('/api/auth/register', { name, email, password, role });
    return login(email, password);
  }

  async function refresh() {
    const res = await api.post('/api/auth/refresh');
    setAccessToken(res.data.accessToken);
  }

  async function logout() {
    await api.post('/api/auth/logout');
    setUser(null);
    setAccessToken(null);
  }

  const value = { user, accessToken, login, register, refresh, logout };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() { return useContext(AuthCtx); }
