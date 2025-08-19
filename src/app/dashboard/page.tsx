'use client';
import React from 'react'
import DashboardSection from './_components/DashboardSection';
import { withAuth } from '@/app/_components/withAuth';
import AdminStatsSection from './_components/AdminStatsSection';
import AppointmentsList from './_components/AppointmentsList';
import PurchasesList from './_components/PurchasesList';
import { useAuth } from '@/app/_context/AuthContext';
import EmailVerificationGuard from '@/app/_global_components/EmailVerificationGuard';

function DashboardPage() {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className='lg:w-5/6 lg:py-6 px-4'>
      {user?.email_verified_at === null && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                En attente de vérification de votre email
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Votre compte a été créé avec succès ! Veuillez vérifier votre boîte email et cliquer sur le lien de vérification pour activer votre compte.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <DashboardSection className='mt-0'>
        <p className='font-bold'>Nous sommes le {today}</p>
      </DashboardSection>
      <EmailVerificationGuard action="accéder aux statistiques et données">
        <AdminStatsSection />
        <div className='grid grid-cols-4 gap-6 my-4'>
          <AppointmentsList />
          <PurchasesList />
        </div>
      </EmailVerificationGuard>
      
      </div>
  )
}

export default withAuth(DashboardPage, { allowUnverified: true });
