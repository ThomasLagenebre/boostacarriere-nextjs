import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import { FaUser, FaBook } from 'react-icons/fa';
import { useAuth } from '@/app/_context/AuthContext';
import { fetchAdminStats, AdminStats } from '@/app/_data/fetchAdminStats';

export default function AdminStatsSection() {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role?.id !== 1) return;
    setLoading(true);
    setError(null);
    fetchAdminStats()
      .then((data) => setStats(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user || user.role?.id !== 1) return null;
  if (loading) return <div className='flex items-center justify-between'>Chargement...</div>;
  if (error) return <div className='flex items-center justify-between text-red-500'>{error}</div>;
  if (!stats) return null;

  return (
    <div className='flex items-center justify-between'>
      <ItemCard title='Nombre de coachings' number={stats.coachings_count} evolution={stats.coachings_last_7_days} icon={FaUser} />
      <ItemCard title="Nombre d'achats" number={stats.orders_count} evolution={stats.orders_last_7_days} icon={FaBook} />
      <ItemCard title="Nombre d'utilisateurs" number={stats.users_count} evolution={stats.users_last_7_days} icon={FaUser} />
    </div>
  );
} 