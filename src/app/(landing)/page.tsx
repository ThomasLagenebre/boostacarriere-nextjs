"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Coachings from "../_sections/Coachings";
import Ebooks from "../_sections/Ebooks";
import Hero from "../_sections/Hero";
import Reviews from "../_sections/Reviews";
import ToolsTuto from "../_sections/ToolsTuto";
import Button from '@/app/_global_components/Button';

export default function Home() {
  const searchParams = useSearchParams();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [paymentIntent, setPaymentIntent] = useState<string>('');

  useEffect(() => {
    const paymentIntentParam = searchParams.get('payment_intent');
    const redirectStatus = searchParams.get('redirect_status');
    
    if (paymentIntentParam && redirectStatus) {
      setPaymentIntent(paymentIntentParam);
      setPaymentStatus(redirectStatus);
      setShowPaymentModal(true);
      
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
    }
  }, [searchParams]);

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case 'succeeded':
        return {
          title: 'Paiement confirmé !',
          message: 'Votre rendez-vous a été réservé avec succès.',
          icon: '✅',
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        };
      case 'failed':
        return {
          title: 'Paiement échoué',
          message: 'Une erreur est survenue lors du traitement de votre paiement.',
          icon: '❌',
          color: 'text-red-600',
          bgColor: 'bg-red-50'
        };
      case 'canceled':
        return {
          title: 'Paiement annulé',
          message: 'Vous avez annulé le processus de paiement.',
          icon: '⏹️',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50'
        };
      default:
        return {
          title: 'Statut inconnu',
          message: 'Impossible de déterminer le statut de votre paiement.',
          icon: '❓',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50'
        };
    }
  };

  const statusInfo = getStatusMessage();

  return (
    <>
      <main className="max-w-screen-xl mx-auto">
        <Hero />
        <Coachings />
        <ToolsTuto />
        <Ebooks />
        <Reviews />
      </main>

      {/* Modal de confirmation de paiement */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full ${statusInfo.bgColor} rounded-lg shadow-xl p-8 text-center relative`}>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
            
            <div className={`text-6xl mb-4 ${statusInfo.color}`}>
              {statusInfo.icon}
            </div>
            
            <h2 className={`text-2xl font-bold mb-4 ${statusInfo.color}`}>
              {statusInfo.title}
            </h2>
            
            <p className="text-gray-700 mb-6">
              {statusInfo.message}
            </p>
            
            {paymentIntent && (
              <div className="bg-white rounded-lg p-4 mb-6">
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
                onClick={() => setShowPaymentModal(false)}
                className="w-full"
              >
                Continuer
              </Button>
              
              {paymentStatus === 'succeeded' && (
                <Button
                  type="button"
                  style="secondary"
                  onClick={() => {
                    setShowPaymentModal(false);
                    window.location.href = '/dashboard';
                  }}
                  className="w-full"
                >
                  Voir mes rendez-vous
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
