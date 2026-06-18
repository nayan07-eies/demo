import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AuthGuard = ({ children, requireRole, restrictRole }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Prevent users without the required role from accessing (e.g., users trying to access admin)
  if (requireRole && user?.role !== requireRole) {
    return <Navigate to="/" replace />;
  }

  // Prevent users with a specific role from accessing (e.g., admins trying to access storefront)
  if (restrictRole && user?.role === restrictRole) {
    // If an admin tries to access a restricted route, send them to the admin dashboard
    if (restrictRole === 'admin') {
       return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
