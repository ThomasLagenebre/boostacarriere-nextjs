'use client';

import React from 'react';
import { useAuth } from '@/app/_context/AuthContext';

interface EmailVerificationGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  action?: string;
}

export default function EmailVerificationGuard({ 
  children, 
  fallback,
  action = "cette action"
}: EmailVerificationGuardProps) {
  const { user } = useAuth();

  // Si l'utilisateur n'est pas connecté, afficher le composant normalement
  if (!user) {
    return <>{children}</>;
  }

  // Si l'email est vérifié, afficher le composant normalement
  if (user.email_verified_at) {
    return <>{children}</>;
  }

  // Si l'email n'est pas vérifié, afficher le fallback ou un message par défaut
  if (fallback) {
    return <>{fallback}</>;
  }

  // Message par défaut
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Action bloquée
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>
              Vous devez vérifier votre adresse email avant de pouvoir {action}. 
              Veuillez vérifier votre boîte email et cliquer sur le lien de vérification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
