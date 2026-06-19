// 1. Import routing hooks and components
import { Navigate, useLocation } from 'react-router-dom';

// 2. Import your custom auth hook (Just ONE time!)
import { useAuth } from '../../context/AuthContext';

export const AuthGuard = ({ children, requireRole, restrictRole }) => {
  const { isAuthenticated, user, isLoading } = useAuth(); 
  const location = useLocation();

  // ... rest of your component coderf

  // 1. Wait for auth to finish checking before doing anything
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireRole && user?.role !== requireRole) {
    return <Navigate to="/" replace />;
  }

  if (restrictRole && user?.role === restrictRole) {
    if (restrictRole === 'admin') {
       return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};