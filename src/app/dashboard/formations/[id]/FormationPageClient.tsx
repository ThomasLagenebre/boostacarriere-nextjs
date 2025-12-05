'use client';
import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import React, { useEffect, useState } from 'react'
import DashboardSection from '../../_components/DashboardSection'
import { useAuth } from '@/app/_context/AuthContext';
import { fetchUserPurchases } from '@/app/_data/fetchUserPurchases';

interface FormationPageClientProps {
  coaching: any;
}

export default function FormationPageClient({ coaching }: FormationPageClientProps) {
  const { user } = useAuth();
  const [userPurchases, setUserPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserPurchases = async () => {
      if (user) {
        try {
          const purchases = await fetchUserPurchases(user.id);
          setUserPurchases(Array.isArray(purchases) ? purchases : []);
        } catch (error) {
          console.error('Error loading user purchases:', error);
          setUserPurchases([]);
        }
      }
      setLoading(false);
    };

    loadUserPurchases();
  }, [user]);

  // Vérifier si l'utilisateur a acheté cette formation ou s'il est admin
  const hasUserPurchased = userPurchases.some(purchase => 
    purchase.coaching_id === coaching.id || purchase.formation_id === coaching.id
  );
  const isAdmin = user?.role?.name === 'Admin';
  const shouldHidePlan = hasUserPurchased || isAdmin;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='max-lg:px-4'>
      <DashboardSection>
        <SectionTitle title={`TITRE : ${coaching.title}`} className='text-left'/>
      </DashboardSection>
      <form className='my-6'>
        {/* Contenu de la formation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">{coaching.title}</h2>
          <p className="text-gray-600 mb-4">{coaching.description}</p>
          
          {/* Prix */}
          <div className="mb-4">
            <span className="text-2xl font-bold text-green-600">
              {coaching.price}€
            </span>
            {coaching.promotion && (
              <span className="ml-2 text-sm text-red-500">
                Promotion: {coaching.promotion}€
              </span>
            )}
          </div>

          {/* Gains */}
          {coaching.gains && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Ce que vous allez apprendre :</h3>
              <ul className="list-disc list-inside text-gray-700">
                {coaching.gains.map((gain: string, index: number) => (
                  <li key={index}>{gain}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Plan de formation - masqué si acheté ou admin */}
        {!shouldHidePlan && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Plan de la formation</h3>
            <p className="text-gray-600">
              Le plan détaillé de cette formation sera visible après l'achat.
            </p>
          </div>
        )}

        {/* Message pour les utilisateurs qui ont acheté */}
        {shouldHidePlan && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-800 mb-2">
              {isAdmin ? 'Accès administrateur' : 'Formation achetée'}
            </h3>
            <p className="text-green-700">
                             {isAdmin 
                 ? 'Vous avez accès à toutes les fonctionnalités en tant qu&apos;administrateur.'
                 : 'Vous avez accès au contenu complet de cette formation.'
               }
            </p>
          </div>
        )}
      </form>
    </div>
  );
} 