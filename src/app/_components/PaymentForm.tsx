'use client';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import Button from '@/app/_global_components/Button';

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/confirmation`,
      },
    });

    if (error) {
      setMessage(error.message ?? 'Une erreur est survenue');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <PaymentElement />
      <Button
        type="button"
        style="primary"
        onClick={handleSubmit}
        disabled={isProcessing || !stripe || !elements}
        className="mt-4 w-full"
      >
        {isProcessing ? 'Traitement...' : 'Payer maintenant'}
      </Button>
      {message && (
        <div className="mt-4 text-red-500 text-sm text-center">
          {message}
        </div>
      )}
    </form>
  );
} 