'use client';

import { useAuth } from '@/app/_context/AuthContext';
import { ReactNode } from 'react';

interface AuthHydrationProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function AuthHydrationProvider({ children, fallback = null }: AuthHydrationProviderProps) {
  const { isHydrated } = useAuth();

  if (!isHydrated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
