'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { log } from 'console';
import Cookies from 'js-cookie';

interface Role {
  id: number;
  name: string;
  permissions: {
    nothing: boolean;
    all?: boolean;
    view_coachings?: boolean;
    view_formations?: boolean;
    view_ebooks?: boolean;
    view_users?: boolean;
    view_blog?: boolean;
    manage_site?: boolean;
  };
}

interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    const token = Cookies.get('auth_token');
    if(!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const responseData = await response.json();
        console.log('User data:', responseData);
        setUser(responseData.data);
      } else {
        console.log('Response not ok:', response.status);
        setUser(null);
        Cookies.remove('auth_token');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
      Cookies.remove('auth_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
          'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Problème de connexion, veuillez réessayer ultérieurement');
      }

      const data = await response.json();
      console.log('Login response:', data);

      // Stockage du token avec plus d'options
      Cookies.set('auth_token', data.token, { 
        expires: 7,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
      
      console.log('Token stored:', Cookies.get('auth_token'));

      // Stockage direct des informations utilisateur
      if (data.data) {
        setUser(data.data);
      } else {
        await checkAuth();
      }

      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      Cookies.remove('auth_token');
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    checkAuth();

    const handleFocus = () => {
      checkAuth();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkAuth();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 