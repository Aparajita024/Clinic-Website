// Admin dashboard lists appointments with filtering, pagination, update, and delete actions.
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { clearAdminToken } from '../lib/adminAuth';
import '../admin.css';

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Cancelled'];

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({ status: '', date: '' });
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalPages: 1, total: 0 });

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
      };

      if (filters.status) {
        params.status = filters.status;
      }
      if (filters.date) {
        params.date = filters.date;
      }

      const response = await api.get('/appointments', { params });
      setAppointments(response.data.data || []);
      setPagination((prev) => ({ ...prev, ...(response.data.pagination || prev) }));
    } catch (requestError) {
      const status = requestError.response?.status;
      if (status === 401) {
        clearAdminToken();
        navigate('/admin/login', { replace: true });
        return;
      }
      setError(requestError.response?.data?.message || 'Failed to fetch appointments.');
    } finally {
      setLoading(false);
    }
  }, [filters.date, filters.status, navigate, pagination.limit, pagination.page]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleStatusFilterChange = (event) => {
    const value = event.target.value;
    setFilters((prev) => ({ ...prev, status: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleDateFilterChange = (event) => {
    const value = event.target.value;
    setFilters((prev) => ({ ...prev, date: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleStatusUpdate = async (appointmentId, status) => {
    try {
      await api.put(`/appointments/${appointmentId}`, { status });
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, status } : appointment
        )
      );
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Failed to update status.');
    }
  };

  const handleDelete = async (appointmentId) => {
    const shouldDelete = window.confirm('Delete this appointment? This action cannot be undone.');
    if (!shouldDelete) {
      return;
    }

    try {
      await api.delete(`/appointments/${appointmentId}`);
      await fetchAppointments();
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Failed to delete appointment.');
    }
  };

  const handleLogout = () => {
    clearAdminToken();
    navigate('/admin/login', { replace: true });
  };

  const goToPreviousPage = () => {
    setPagination((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }));
  };

  const goToNextPage = () => {
    setPagination((prev) => ({ ...prev, page: Math.min(prev.page + 1, prev.totalPages || 1) }));
  };

  return (
    <div className="admin-page">
      <div className="admin-dashboard-container">
        <header className="admin-dashboard-header">
          <div>
            <h1>Appointments Dashboard</h1>
            <p>Manage bookings from the website.</p>
          </div>
          <button type="button" onClick={handleLogout} className="admin-logout-btn">
            Logout
          </button>
        </header>

        <section className="admin-filters">
          <div>
            <label htmlFor="statusFilter">Status</label>
            <select id="statusFilter" value={filters.status} onChange={handleStatusFilterChange}>
              <option value="">All</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dateFilter">Preferred Date</label>
            <input id="dateFilter" type="date" value={filters.date} onChange={handleDateFilterChange} />
          </div>
        </section>

        {error ? <p className="admin-error">{error}</p> : null}

        {loading ? (
          <p className="admin-loading">Loading appointments...</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Preferred Date</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="admin-empty">
                      No appointments found.
                    </td>
                  </tr>
                ) : (
                  appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td>{appointment.name}</td>
                      <td>{appointment.phone}</td>
                      <td>{appointment.email || 'N/A'}</td>
                      <td>
                        {appointment.preferredDate
                          ? new Date(appointment.preferredDate).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td className="admin-message-cell">{appointment.message || 'N/A'}</td>
                      <td>
                        <select
                          value={appointment.status}
                          onChange={(event) => handleStatusUpdate(appointment._id, event.target.value)}
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{new Date(appointment.createdAt).toLocaleString()}</td>
                      <td>
                        <button
                          type="button"
                          className="admin-delete-btn"
                          onClick={() => handleDelete(appointment._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <footer className="admin-pagination">
          <button type="button" onClick={goToPreviousPage} disabled={pagination.page <= 1 || loading}>
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.totalPages || 1} ({pagination.total} total)
          </span>
          <button
            type="button"
            onClick={goToNextPage}
            disabled={pagination.page >= (pagination.totalPages || 1) || loading}
          >
            Next
          </button>
        </footer>
      </div>
    </div>
  );
}
