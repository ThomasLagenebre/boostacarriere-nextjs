'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import "../globals.css";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Token de vérification manquant');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message || 'Email vérifié avec succès !');
          // Rediriger vers le dashboard après 3 secondes
          setTimeout(() => {
            router.push('/dashboard');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Erreur lors de la vérification de l&apos;email');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Erreur lors de la vérification de l&apos;email');
        console.log(error);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-secondary">
            Vérification de l&apos;email
          </h2>
          <p className="mt-2 text-sm text-green-700">
            Veuillez patienter pendant que nous vérifions votre email...
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {status === 'loading' && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Vérification en cours...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Email vérifié !</h3>
              <p className="mt-2 text-sm text-gray-600">{message}</p>
              <p className="mt-2 text-sm text-gray-500">Redirection vers la page de connexion...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Erreur de vérification</h3>
              <p className="mt-2 text-sm text-gray-600">{message}</p>
              <div className="mt-4">
                <button
                  onClick={() => router.push('/login')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Retour à la connexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 