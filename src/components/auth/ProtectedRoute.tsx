import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './AuthModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback 
}) => {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Access Required
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            You need to be signed in to access this feature. Please sign in or create an account to continue.
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>
        </div>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </>
    );
  }

  return <>{children}</>;
};