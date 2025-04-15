'use client';
import { useAuth } from '@/app/_context/AuthContext';
import { ReactNode } from 'react';

interface PermissionGuardProps {
  permission: string;
  children: ReactNode;
}

export function PermissionGuard({ permission, children }: PermissionGuardProps) {
  const { user } = useAuth();

  if (!user) return null;

  // Si l'utilisateur n'a pas de rôle ou de permissions, on n'affiche rien
  if (!user.role?.permissions) return null;

  // Parse les permissions JSON
  let permissions;
  try {
    permissions = typeof user.role.permissions === 'string' 
      ? JSON.parse(user.role.permissions)
      : user.role.permissions;
  } catch (error) {
    console.error('Error parsing permissions:', error);
    return null;
  }

  // Si l'utilisateur a la permission "nothing", on n'affiche rien
  if (permissions.nothing === true) {
    return null;
  }

  // Si l'utilisateur a tous les droits, on affiche tout
  if (permissions.all === true) {
    return <>{children}</>;
  }

  // Sinon, on vérifie la permission spécifique
  if (permissions[permission as keyof typeof permissions]) {
    return <>{children}</>;
  }

  return null;
} 