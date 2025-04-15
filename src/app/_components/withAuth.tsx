'use client';
import { useAuth } from '@/app/_context/AuthContext';
import { useRouter } from 'next/navigation';
import { ComponentType, useEffect } from 'react';

interface WithAuthProps {
  requiredRole?: string;
}

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  { requiredRole }: WithAuthProps = {}
) {
  return function WithAuthComponent(props: P) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push('/login');
        } else if (requiredRole && user.role !== requiredRole) {  
          router.push('/');
        }
      }
    }, [user, loading, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user || (requiredRole && user.role !== requiredRole)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
} 