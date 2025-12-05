'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaUser, FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import FormInput from '@/app/_global_components/FormInput';
import FormButton from '@/app/_global_components/FormButton';
import Notification from '@/app/_global_components/Notification';
import ClientOnly from '@/app/_global_components/ClientOnly';
import AuthGuard from '@/app/_components/AuthGuard';
import LoadingSpinner from '@/app/_global_components/LoadingSpinner';

function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer les messages d'erreur/succès lors de la saisie
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Veuillez remplir tous les champs');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Veuillez saisir une adresse email valide');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Compte créé avec succès ! Vérifiez votre email pour activer votre compte.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        
        // Redirection vers la page de connexion après 3 secondes
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setError(data.message || 'Erreur lors de la création du compte');
      }
    } catch (err: any) {
      setError('Erreur lors de la création du compte. Veuillez réessayer.');
      console.error('Erreur inscription:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUser className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Créer un compte
          </h1>
          <p className="text-gray-600">
            Rejoignez Boostacarriere et boostez votre carrière
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Prénom et Nom */}
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                id="firstName"
                name="firstName"
                type="text"
                label="Prénom"
                placeholder="Votre prénom"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <FormInput
                id="lastName"
                name="lastName"
                type="text"
                label="Nom"
                placeholder="Votre nom"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

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
              placeholder="Minimum 8 caractères"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              icon={FaLock}
              showPasswordToggle
              onPasswordToggle={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
            />

            {/* Confirmation mot de passe */}
            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirmer le mot de passe"
              placeholder="Répétez votre mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={isLoading}
              icon={FaLock}
              showPasswordToggle
              onPasswordToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              showPassword={showConfirmPassword}
            />

            {/* Messages d'erreur et de succès */}
            {error && (
              <Notification
                type="error"
                message={error}
                onClose={() => setError('')}
              />
            )}

            {success && (
              <Notification
                type="success"
                message={success}
                onClose={() => setSuccess('')}
              />
            )}

            {/* Bouton d'inscription */}
            <FormButton
              type="submit"
              isLoading={isLoading}
              loadingText="Création en cours..."
              fullWidth
              icon={FaArrowRight}
              iconPosition="right"
            >
              Créer mon compte
            </FormButton>
          </form>

          {/* Liens utiles */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Déjà un compte ?{' '}
              <Link 
                href="/login" 
                className="font-medium text-primary hover:text-primary/80 transition-colors duration-200"
              >
                Se connecter
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

export default function SignupPage() {
  return (
    <ClientOnly fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
        <LoadingSpinner size="xl" text="Chargement..." />
      </div>
    }>
      <AuthGuard>
        <SignupForm />
      </AuthGuard>
    </ClientOnly>
  );
}
