'use client';

import React, { useState } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from 'react-toastify';
import { paymentIntend } from '@/app/_data/paymentIntend';
import PaymentForm from '@/app/_components/PaymentForm';
import { useAuth } from '@/app/_context/AuthContext';
import Button from '@/app/_global_components/Button';
import EmailVerificationGuard from '@/app/_global_components/EmailVerificationGuard';

interface DirectPurchaseFormProps {
  productTitle: string;
  productId: number;
  onClose: () => void;
}

export default function DirectPurchaseForm({ productTitle, productId, onClose }: DirectPurchaseFormProps) {
  const { user, loading } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');

  const options = {
    clientSecret,
    appearance: { theme: "stripe" as "stripe" | "night" | "flat" },
  };

  const handleDirectPurchase = async () => {
    if (!user) {
      toast.error('Vous devez être connecté pour acheter cette formation');
      return;
    }

    setIsProcessing(true);

    try {
      // Créer un rendez-vous factice pour la formation
      const appointment = `Formation ${productTitle} - Achat direct`;
      
      // Appeler paymentIntend avec les informations de l'utilisateur connecté
      const dataPayment = await paymentIntend(
        appointment,
        0, // Pas de durée pour une formation
        user.firstname + ' ' + user.lastname,
        user.email,
        productId,
        true, // Terms acceptés par défaut
        user.id
      );

      console.log('Paiement formation:', dataPayment);
      
      if (dataPayment.clientSecret) {
        // Si on a un clientSecret, afficher le formulaire de paiement
        setClientSecret(dataPayment.clientSecret);
        setShowPayment(true);
      } else if (dataPayment.url) {
        // Si on a une URL, rediriger directement
        window.location.href = dataPayment.url;
      } else {
        toast.error('Erreur lors de la création du paiement');
      }
    } catch (error: any) {
      console.error('Erreur achat formation:', error);
      toast.error(error.message || 'Erreur lors de l\'achat de la formation');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Connexion requise
          </h3>
          <p className="text-gray-600 mb-6">
            Vous devez être connecté pour acheter cette formation.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              style="primary"
              onClick={() => window.location.href = '/login'}
              className="w-full"
            >
              Se connecter
            </Button>
            <Button
              type="button"
              style="secondary"
              onClick={() => window.location.href = '/inscription'}
              className="w-full"
            >
              Créer un compte
            </Button>
            <Button
              type="button"
              style="secondary"
              onClick={onClose}
              className="w-full"
            >
              Annuler
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showPayment && clientSecret) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md mx-4 w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Paiement - {productTitle}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          
          <Elements options={options} stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Acheter {productTitle}
        </h3>
        <p className="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir acheter cette formation ?
        </p>
        
        <div className="flex flex-col gap-3">
          <EmailVerificationGuard action="acheter cette formation">
            <Button
              type="button"
              style="primary"
              onClick={handleDirectPurchase}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? 'Traitement...' : 'Acheter maintenant'}
            </Button>
          </EmailVerificationGuard>
          
          <Button
            type="button"
            style="secondary"
            onClick={onClose}
            className="w-full"
          >
            Annuler
          </Button>
        </div>
        
        <ToastContainer />
      </div>
    </div>
  );
}
