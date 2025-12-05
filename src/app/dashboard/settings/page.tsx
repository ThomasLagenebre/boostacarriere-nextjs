'use client';

import React, { useState } from 'react';
import DashboardSection from '../_components/DashboardSection';
import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle';
import Button from '@/app/_global_components/Button';
import Input from '../_components/Input';
import { useAuth } from '@/app/_context/AuthContext';
import { updateUser } from '@/app/_data/fetchUsers';

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (loading) return <DashboardSection>Chargement...</DashboardSection>;
  if (!user) return <DashboardSection>Non connecté.</DashboardSection>;

  const handleSubmit = async () => {
    setIsSaving(true);
    setSuccess('');
    setError('');
    try {
      await updateUser(user.id, { email });
      setSuccess('Profil mis à jour avec succès !');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la mise à jour.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardSection className='max-w-xl mx-auto'>
      <SectionTitle title='Mes informations personnelles' />
      <form className='mt-6'>
        <Input
          id='email'
          label='Email'
          type='text'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <Button type='button' style='secondary' className='mt-4' disabled={isSaving} onClick={handleSubmit}>
          {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
        </Button>
        {success && <p className='text-green-600 mt-2'>{success}</p>}
        {error && <p className='text-red-600 mt-2'>{error}</p>}
      </form>
    </DashboardSection>
  );
} 