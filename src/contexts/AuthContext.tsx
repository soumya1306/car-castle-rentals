'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  role: 'admin';
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = user !== null;

  // Check for existing session on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('/api/auth/login', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        
        // Set cookie for middleware
        document.cookie = `accessToken=${token}; path=/; max-age=604800; SameSite=Strict; Secure=${window.location.protocol === 'https:'}`;
      } else {
        // Token is invalid, clear it
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { user: userData, tokens } = data;
        
        // Store tokens
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        
        // Set cookie for middleware (more explicit)
        document.cookie = `accessToken=${tokens.accessToken}; path=/; max-age=604800; SameSite=Strict; Secure=${window.location.protocol === 'https:'}`;
        
        // Update state
        setUser(userData);
        
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Call logout API
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear local storage and cookies regardless of API call result
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      
      // Clear user state
      setUser(null);
    }
  };

  // Auto-refresh token when it's about to expire
  useEffect(() => {
    if (!user) return;

    const refreshToken = async () => {
      try {
        const storedRefreshToken = localStorage.getItem('refreshToken');
        if (!storedRefreshToken) return;

        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: storedRefreshToken }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('accessToken', data.tokens.accessToken);
          localStorage.setItem('refreshToken', data.tokens.refreshToken);
          document.cookie = `accessToken=${data.tokens.accessToken}; path=/; max-age=604800; SameSite=Strict`;
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
        logout();
      }
    };

    // Refresh token every 6 hours
    const interval = setInterval(refreshToken, 6 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}