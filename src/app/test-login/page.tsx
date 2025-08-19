'use client';

import React, { useState } from 'react';
import { useAuth } from '@/app/_context/AuthContext';
import FormInput from '@/app/_global_components/FormInput';
import FormButton from '@/app/_global_components/FormButton';
import Notification from '@/app/_global_components/Notification';
import LoadingSpinner from '@/app/_global_components/LoadingSpinner';

export default function TestLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [debugInfo, setDebugInfo] = useState<any>({});
  
  const { login, user, loading, isHydrated } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');
    setDebugInfo({});

    try {
      console.log('🚀 Début de la connexion...');
      setDebugInfo(prev => ({ ...prev, step: 'Début de la connexion' }));

      await login(formData.email, formData.password);
      
      console.log('✅ Connexion réussie !');
      setSuccess('Connexion réussie ! Redirection en cours...');
      setDebugInfo(prev => ({ ...prev, step: 'Connexion réussie', success: true }));
      
    } catch (err: any) {
      console.error('❌ Erreur de connexion:', err);
      setError(err.message || 'Erreur lors de la connexion. Veuillez réessayer.');
      setDebugInfo(prev => ({ ...prev, step: 'Erreur de connexion', error: err.message }));
    } finally {
      setIsLoading(false);
    }
  };

  const checkCookies = () => {
    const cookies = document.cookie;
    setDebugInfo(prev => ({ ...prev, cookies }));
    console.log('🍪 Cookies actuels:', cookies);
  };

  const checkUserState = () => {
    setDebugInfo(prev => ({ 
      ...prev, 
      userState: {
        user: user ? 'Connecté' : 'Non connecté',
        loading,
        isHydrated,
        userDetails: user
      }
    }));
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="xl" text="Hydratation du contexte..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Test de Connexion - Debug
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire de connexion */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">🔐 Test de Connexion</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="test@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />

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
              />

              <FormButton
                type="submit"
                isLoading={isLoading}
                loadingText="Connexion en cours..."
                fullWidth
              >
                Se connecter
              </FormButton>
            </form>

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
          </div>

          {/* Informations de debug */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">🔍 Informations de Debug</h3>
            
            <div className="space-y-4">
              {/* État de l'authentification */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">État de l'Authentification</h4>
                <div className="text-sm space-y-1">
                  <div>Hydraté: <span className={isHydrated ? 'text-green-600' : 'text-red-600'}>{isHydrated ? '✅' : '❌'}</span></div>
                  <div>Chargement: <span className={loading ? 'text-yellow-600' : 'text-green-600'}>{loading ? '⏳' : '✅'}</span></div>
                  <div>Utilisateur: <span className={user ? 'text-green-600' : 'text-gray-600'}>{user ? `✅ ${user.email}` : '❌'}</span></div>
                </div>
              </div>

              {/* Boutons de debug */}
              <div className="space-y-2">
                <button
                  onClick={checkCookies}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  🍪 Vérifier les Cookies
                </button>
                
                <button
                  onClick={checkUserState}
                  className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors text-sm"
                >
                  👤 Vérifier l'État Utilisateur
                </button>
              </div>

              {/* Informations de debug */}
              {Object.keys(debugInfo).length > 0 && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Debug Info</h4>
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                    {JSON.stringify(debugInfo, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center space-x-4">
          <a 
            href="/login" 
            className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Page de Connexion
          </a>
          <a 
            href="/dashboard" 
            className="bg-secondary text-white py-2 px-6 rounded-lg hover:bg-secondary/90 transition-colors"
          >
            Dashboard
          </a>
          <a 
            href="/" 
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}
