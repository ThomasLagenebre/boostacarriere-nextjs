'use client';
import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { useRouter } from 'next/navigation';    
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
  email_verified_at: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isHydrated: boolean;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();
  const isNavigating = useRef(false);

  const checkAuth = async () => {
    const token = Cookies.get('auth_token');
    
    if(!token) {
      setUser(null);
      setLoading(false);
      console.log('AuthContext: Pas de token, on ne fait rien');
      return;
    }

    try {
      console.log('AuthContext: Je suis dans la fonction checkAuth');
      console.log('AuthContext: Token:', token);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('AuthContext: Réponse de la requête:', response);
      if (response.ok) {
        const responseData = await response.json();
        setUser(responseData.data);
      } else if (response.status === 401) {
        // Seulement supprimer le token si c'est une erreur d'authentification
        console.log('AuthContext: Token invalide, suppression');
        setUser(null);
        Cookies.remove('auth_token');
      } else {
        // Pour les autres erreurs (500, 404, etc.), garder le token
        console.log('AuthContext: Erreur serveur, on garde le token');
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      // En cas d'erreur réseau, on garde le token
      setUser(null);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    let mounted = true;
    
    const initAuth = async () => {
      if (mounted) {
        await checkAuth();
        setIsHydrated(true);
      }
    };

    initAuth();

    const handleFocus = () => {
      if (mounted && !isNavigating.current) {
        checkAuth();
      }
    };

    // Ajouter l'event listener seulement si le composant est monté
    if (typeof window !== 'undefined') {
      window.addEventListener('focus', handleFocus);
    }

    return () => {
      mounted = false;
      if (typeof window !== 'undefined') {
        window.removeEventListener('focus', handleFocus);
      }
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    
    const interval = setInterval(() => {
      if (mounted && !isNavigating.current) {
        checkAuth();
      }
    }, 5 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isHydrated, checkAuth }}>
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