'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_context/AuthContext';
import LoadingSpinner from '@/app/_global_components/LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  redirectTo = '/dashboard' 
}) => {
  const { user, loading, isHydrated } = useAuth();
  const router = useRouter();
  const [redirectAttempted, setRedirectAttempted] = useState(false);

  useEffect(() => {
    // Attendre que le contexte soit hydraté
    if (!isHydrated) return;

    // Si l'utilisateur est connecté, le rediriger
    if (user && !loading && !redirectAttempted) {
      console.log('AuthGuard: Utilisateur connecté, tentative de redirection vers', redirectTo);
      setRedirectAttempted(true);
      
      try {
        router.replace(redirectTo);
        console.log('AuthGuard: Redirection initiée avec succès');
      } catch (error) {
        console.error('AuthGuard: Erreur lors de la redirection:', error);
        // Fallback: essayer avec push
        try {
          router.push(redirectTo);
          console.log('AuthGuard: Redirection de fallback avec push');
        } catch (pushError) {
          console.error('AuthGuard: Erreur avec push aussi:', pushError);
          // En dernier recours, forcer la navigation
          window.location.href = redirectTo;
        }
      }
    }
  }, [user, loading, isHydrated, router, redirectTo, redirectAttempted]);

  // Afficher un loader pendant la vérification
  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <LoadingSpinner size="xl" text="Vérification de l'authentification..." />
      </div>
    );
  }

  // Si l'utilisateur est connecté, ne rien afficher (redirection en cours)
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <LoadingSpinner size="xl" text="Redirection vers le dashboard..." />
      </div>
    );
  }

  // Afficher le contenu si l'utilisateur n'est pas connecté
  return <>{children}</>;
};

export default AuthGuard;
