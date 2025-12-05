"use client";

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@/app/_global_components/Button';

export default function ConfirmationPage() {
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [paymentIntent, setPaymentIntent] = useState<string>('');

  useEffect(() => {
    // Récupérer les paramètres depuis l'URL de manière plus robuste
    const urlParams = new URLSearchParams(window.location.search);
    const paymentIntentParam = urlParams.get('payment_intent');
    const redirectStatus = urlParams.get('redirect_status');
    
    console.log('URL params:', { paymentIntentParam, redirectStatus });
    console.log('Full URL:', window.location.href);
    
    if (paymentIntentParam && redirectStatus) {
      setPaymentIntent(paymentIntentParam);
      setPaymentStatus(redirectStatus);
      
      // Afficher le toast approprié
      switch (redirectStatus) {
        case 'succeeded':
          toast.success('Paiement confirmé avec succès ! Votre rendez-vous est réservé.');
          break;
        case 'failed':
          toast.error('Le paiement a échoué. Veuillez réessayer.');
          break;
        case 'canceled':
          toast.info('Le paiement a été annulé.');
          break;
        default:
          console.log('Statut de redirection inconnu:', redirectStatus);
      }
      
      // Nettoyer l'URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      console.log('Paramètres manquants:', { paymentIntentParam, redirectStatus });
    }
  }, []);

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case 'succeeded':
        return {
          title: 'Paiement confirmé !',
          message: 'Votre rendez-vous a été réservé avec succès.',
          icon: '✅',
          color: 'text-green-600'
        };
      case 'failed':
        return {
          title: 'Paiement échoué',
          message: 'Une erreur est survenue lors du traitement de votre paiement.',
          icon: '❌',
          color: 'text-red-600'
        };
      case 'canceled':
        return {
          title: 'Paiement annulé',
          message: 'Vous avez annulé le processus de paiement.',
          icon: '⏹️',
          color: 'text-yellow-600'
        };
      default:
        return {
          title: 'Statut inconnu',
          message: 'Impossible de déterminer le statut de votre paiement.',
          icon: '❓',
          color: 'text-gray-600'
        };
    }
  };

  const statusInfo = getStatusMessage();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className={`text-6xl mb-4 ${statusInfo.color}`}>
          {statusInfo.icon}
        </div>
        
        <h1 className={`text-2xl font-bold mb-4 ${statusInfo.color}`}>
          {statusInfo.title}
        </h1>
        
        <p className="text-gray-600 mb-6">
          {statusInfo.message}
        </p>
        
        {paymentIntent && (
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">Référence de paiement :</p>
            <p className="text-xs font-mono text-gray-700 break-all">
              {paymentIntent}
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          <Button
            type="button"
            style="primary"
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Retour à l&apos;accueil
          </Button>
          
          {paymentStatus === 'succeeded' && (
            <Button
              type="button"
              style="secondary"
              onClick={() => window.location.href = '/dashboard'}
              className="w-full"
            >
              Voir mes rendez-vous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
