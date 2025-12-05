'use client';

import React, { useState, useEffect } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  ssr?: boolean; // Permet de contrôler si le composant doit être rendu côté serveur
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ 
  children, 
  fallback = null,
  ssr = false 
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Si SSR est activé, on peut afficher le fallback côté serveur
  if (ssr && !hasMounted) {
    return <>{fallback}</>;
  }

  // Sinon, on n'affiche rien côté serveur
  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
