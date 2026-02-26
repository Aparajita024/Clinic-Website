// Protected route blocks unauthenticated access to admin dashboard pages.
import { Navigate, Outlet } from 'react-router-dom';
import { getAdminToken } from '../../lib/adminAuth';

export default function ProtectedRoute() {
  const token = getAdminToken();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
