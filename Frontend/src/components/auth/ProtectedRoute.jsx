import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../hooks/useTheme';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme();

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: theme.semantic.background.primary }}
      >
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent mx-auto mb-4"
            style={{ borderColor: theme.colors.primary[500], borderTopColor: 'transparent' }}
          ></div>
          <p style={{ color: theme.semantic.text.secondary }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;