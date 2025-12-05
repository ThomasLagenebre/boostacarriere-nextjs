'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaUser, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '@/app/_context/AuthContext';
import FormInput from '@/app/_global_components/FormInput';
import FormButton from '@/app/_global_components/FormButton';
import Notification from '@/app/_global_components/Notification';
import ClientOnly from '@/app/_global_components/ClientOnly';
import AuthGuard from '@/app/_components/AuthGuard';
import LoadingSpinner from '@/app/_global_components/LoadingSpinner';
import Cookies from 'js-cookie';
import { login } from '@/app/_data/auth';



function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { isHydrated, user } = useAuth();
  const router = useRouter();

  // Redirection automatique si l'utilisateur est connecté
  useEffect(() => {
    if (user && isHydrated) {
      console.log('LoginForm: Utilisateur connecté, redirection vers dashboard');
      router.push('/dashboard');
    }
  }, [user, isHydrated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    setError('');
    console.log('LoginForm: Je suis dans la fonction handleSubmit');
    try {
      await login(formData.email, formData.password);
      // La redirection est gérée par le useEffect ci-dessus
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la connexion. Veuillez réessayer.');
      console.error('Erreur connexion:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Afficher un loader pendant l'hydratation
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <LoadingSpinner size="xl" text="Chargement..." />
      </div>
    );
  }

  // Si l'utilisateur est connecté, afficher un loader de redirection
  if (user) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
          <LoadingSpinner size="xl" text="Redirection vers le dashboard..." />
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUser className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Connexion
          </h1>
          <p className="text-gray-600">
            Accédez à votre espace personnel
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Adresse email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              icon={FaEnvelope}
            />

            {/* Mot de passe */}
            <FormInput
              id="password"
              name="password"
              type="password"
              label="Mot de passe"
              placeholder="Votre mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              icon={FaLock}
              showPasswordToggle
              onPasswordToggle={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />

            {/* Message d'erreur */}
            {error && (
              <Notification
                type="error"
                message={error}
                onClose={() => setError('')}
              />
            )}

            {/* Bouton de connexion */}
            <FormButton
              type="submit"
              isLoading={isLoading}
              loadingText="Connexion en cours..."
              fullWidth
              icon={FaArrowRight}
              iconPosition="right"
            >
              Se connecter
            </FormButton>
          </form>

          {/* Liens utiles */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{' '}
              <Link 
                href="/inscription" 
                className="font-medium text-primary hover:text-primary/80 transition-colors duration-200"
              >
                Créer un compte
              </Link>
            </p>
          </div>

          {/* Retour à l'accueil */}
          <div className="mt-6 text-center">
            <Link 
              href="/" 
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <ClientOnly fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <LoadingSpinner size="xl" text="Chargement..." />
      </div>
    }>
      <AuthGuard>
        <LoginForm />
      </AuthGuard>
    </ClientOnly>
  );
}
