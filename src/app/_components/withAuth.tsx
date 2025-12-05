'use client';
import { useAuth } from '@/app/_context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { ComponentType, useEffect, useState } from 'react';

interface WithAuthProps {
  requiredRole?: string;
  allowUnverified?: boolean; // Nouveau prop pour permettre l'accès aux utilisateurs non vérifiés
}

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  { requiredRole, allowUnverified = false }: WithAuthProps = {}
) {
  return function WithAuthComponent(props: P) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isVerificationPending, setIsVerificationPending] = useState(false);

    // Vérifier si c'est un cas spécial (vérification en attente)
    useEffect(() => {
      // Vérifier l'URL directement pour éviter les problèmes de timing
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const verification = urlParams.get('verification');
        const pending = verification === 'pending';
        setIsVerificationPending(pending);
      }
    }, [pathname]);

    useEffect(() => {
      if (!loading) {
        // Si c'est un cas de vérification en attente, permettre l'accès
        if (isVerificationPending) {
          return;
        }
        
        if (!user) {
          router.push('/login');
        } else if (requiredRole && user.role.name !== requiredRole) {  
          router.push('/');
        }
      }
    }, [user, loading, router, isVerificationPending, requiredRole]);

    if (loading) {
      return <div>Loading...</div>;
    }

    // Permettre l'accès si c'est un cas de vérification en attente
    if (isVerificationPending) {
      return <WrappedComponent {...props} />;
    }

    // Vérification supplémentaire au moment du rendu
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const verification = urlParams.get('verification');
      if (verification === 'pending') {
        return <WrappedComponent {...props} />;
      }
    }

    if (!user) {
      return null;
    }

    if (requiredRole && user.role.name !== requiredRole) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
} 