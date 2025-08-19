'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/_context/AuthContext';
import { fetchUserPurchases } from '@/app/_data/fetchUserPurchases';
import CurrentProblems from '../../../_sections/CurrentProblems';
import Gains from '../../../_sections/Gains';
import Targets from '../../../_sections/Targets';
import Suggestions from '../../../_sections/Suggestions';
import VerticalBreadcrumbs from '../../../_components/VerticalBreadcrumbs';

interface FormationContentProps {
  formation: any;
  isConnected: boolean;
}

export default function FormationContent({ formation, isConnected }: FormationContentProps) {
  const { user } = useAuth();
  const [hasPurchased, setHasPurchased] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPurchase = async () => {
      if (isConnected && user) {
        try {
          // Si l'utilisateur est admin (role_id = 1), il peut voir toutes les formations
          if (user.role && user.role.id === 1) {
            setHasPurchased(true);
          } else {
            // Sinon, vérifier s'il a acheté la formation
            const purchases = await fetchUserPurchases(user.id);
            const purchased = purchases.some((purchase: any) => 
              purchase.product_id === formation.id && purchase.status === 'completed'
            );
            setHasPurchased(purchased);
          }
        } catch (error) {
          console.error('Error fetching user purchases:', error);
        }
      }
      setLoading(false);
    };

    checkPurchase();
  }, [isConnected, user, formation.id]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  // Préparer les steps avec les leçons pour les breadcrumbs
  const breadcrumbSteps = formation.chapters?.map((chapter: any) => ({
    label: chapter.title,
    completed: true,
    lessons: chapter.lessons || []
  })) || [];

  return (
    <div className="xl:max-w-[800px]">
      {/* Contenu restreint - uniquement pour les utilisateurs connectés qui ont acheté OU les admins */}
      {isConnected && hasPurchased && (
        <>
          <VerticalBreadcrumbs steps={breadcrumbSteps} />
          {formation.currentProblems && (
            <CurrentProblems currentProblems={formation.currentProblems} />
          )}
          {formation.gains && <Gains gains={formation.gains} />}
          {formation.targets && <Targets targets={formation.targets} />}
          {formation.suggestions && (
            <Suggestions suggestions={formation.suggestions} />
          )}
        </>
      )}

      {/* Message pour les utilisateurs connectés mais qui n'ont pas acheté (et ne sont pas admin) */}
      {isConnected && !hasPurchased && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Vous devez acheter cette formation pour accéder à son contenu complet.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Message pour les utilisateurs non connectés */}
      {!isConnected && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Connectez-vous pour accéder au contenu complet de cette formation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 