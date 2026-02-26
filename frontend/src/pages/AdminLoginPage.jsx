// Admin login page authenticates clinic staff and stores JWT token.
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { getAdminToken, setAdminToken } from '../lib/adminAuth';
import '../admin.css';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const existingToken = getAdminToken();

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (existingToken) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/admin/login', form);
      setAdminToken(response.data.token);
      navigate('/admin/dashboard', { replace: true });
    } catch (requestError) {
      const message = requestError.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page admin-login-page">
      <div className="admin-card">
        <h1>Admin Login</h1>
        <p>Sign in to manage appointments.</p>

        <form onSubmit={handleSubmit} className="admin-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />

          {error ? <p className="admin-error">{error}</p> : null}

          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
