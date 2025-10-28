'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LuLoader } from 'react-icons/lu';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login?message=Please login to access admin area');
    }
  }, [isAuthenticated, loading, router]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (

      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LuLoader className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show loading (will redirect in useEffect)
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LuLoader className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
}