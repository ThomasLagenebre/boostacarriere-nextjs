'use client';
import React, { useState, useEffect } from 'react'
import Button from '../_global_components/Button'
import textSettings from '../_data/settings'
import { InputIcon } from '../_global_components/InputIcon'
import { FaEnvelope, FaUser } from 'react-icons/fa'
import { createBrevoContact } from '../_data/createBrevoContact'

export default function Hero() {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [step, setStep] = useState<'email' | 'firstname'>('email');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const arrayDescription = textSettings.home.description.split(/<primary>|<\/primary>/);

  const getRandomPrestationLink = () => {
    const prestations = [
      '/prestations/coachings/negocie-ton-salaire',
      '/prestations/coachings/entretien-embauche',
      '/prestations/formations/1',
      '/prestations/formations/2',
      '/prestations/ebooks/1',
      '/prestations/ebooks/2'
    ];
    const randomIndex = Math.floor(Math.random() * prestations.length);
    return prestations[randomIndex];
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (step === 'email') {
      if (email.trim() && email.includes('@')) {
        setStep('firstname');
      } else {
        setError('Veuillez saisir une adresse email valide');
      }
      return;
    }

    setLoading(true);

    try {
      // Envoi vers l'endpoint Brevo
      await createBrevoContact({
        email: email.trim(),
        firstname: firstname.trim(),
        lastname: ''
      });
      
      // Reset du formulaire après succès
      setEmail('');
      setFirstname('');
      setStep('email');
      setLoading(false);
      
      // Afficher le message de succès
      setSuccess('Inscription à la newsletter réussie ! 🎉');
      
      // Effacer le message de succès après 5 secondes
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'envoi');
      setLoading(false);
    }
  };

  return (
    <section className="md:w-3/5 mx-auto mt-20">
      <h1 className="text-3xl md:text-5xl xl:text-6xl font-extrabold text-secondary text-center mb-4 dark:text-light">
        {textSettings.home.slogan}
      </h1>
      <p className="text-center text-gray-500 dark:text-light">
        {arrayDescription.map((text, index) => 
          index % 2 === 1 ? (
            <span key={index} className="text-secondary dark:text-primary">
              {text}
            </span>
          ) : (
            text
          )
        )}
      </p>
      {mounted && (
        <div className="flex flex-col items-center gap-2 justify-center mt-4">
          <form
            className="min-[600px]:flex-row flex flex-col gap-2 my-6 lg:my-0"
            onSubmit={handleSubmit}
          >
            <InputIcon
              iconSvg={step === 'email' ? <FaEnvelope /> : <FaUser />}
              placeholder={step === 'email' ? "Ton adresse email" : "Ton prénom"}
              className={"font-medium w-3/4 mx-auto lg:w-[400px]"}
              id={step === 'email' ? "input-email" : "input-firstname"}
              onChange={step === 'email' ? setEmail : setFirstname}
              value={step === 'email' ? email : firstname}
              type={step === 'email' ? "email" : "text"}
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-2 bg-secondary w-3/4 mx-auto text-white rounded-lg hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed lg:w-fit"
            >
              {loading ? "Envoi..." : step === 'email' ? "Suivant" : "Je veux"}
            </button>
          </form>
          
          {/* Messages d'erreur et de succès sous le formulaire */}
          {(error || success) && (
            <div className="w-full max-w-md mx-auto text-center mt-4">
              {error && (
                <div className="text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3">
                  <p className="text-sm font-medium">❌ {error}</p>
                </div>
              )}
              
              {success && (
                <div className="text-green-700 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3">
                  <p className="text-sm font-medium">✅ {success}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
