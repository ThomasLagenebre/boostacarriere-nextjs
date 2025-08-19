import React, { useEffect, useState } from 'react';
import ItemAppointment from './ItemAppointment';
import { useAuth } from '@/app/_context/AuthContext';
import { fetchUserAppointments, AppointmentAPI } from '@/app/_data/fetchUserAppointments';
import DashboardSection from './DashboardSection';
import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle';
import Skeleton from '@/app/_global_components/Skeleton';

export default function AppointmentsList() {
  const { user, loading } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentAPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || loading) return;
    setIsLoading(true);
    setError(null);
    fetchUserAppointments(user.id)
      .then((data) => setAppointments(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [user, loading]);

  if (loading || isLoading) return <Skeleton rows={2} columns={1} width={60}/>;
  if (error) return <DashboardSection className='bg-white col-span-2 px-4 p-4'><SectionTitle title='Mes rendez-vous' /><div className='text-red-500'>{error}</div></DashboardSection>;
  if (!appointments.length) return <DashboardSection className='bg-white col-span-2 px-4 p-4'><SectionTitle title='Mes rendez-vous' /><span className='text-red-500'>Aucun rendez-vous</span></DashboardSection>;

  if (!user) return null;
  return (
    <DashboardSection className='bg-white col-span-2 px-4'>
      <SectionTitle title='Mes rendez-vous' />
      {appointments.map((a, i) => {
        // Construction de la date ISO pour ItemAppointment
        // planedTo: "27/07/2025 06:08" => "2025-07-27T06:08"
        const [day, month, yearAndHour] = a.planedTo.split('/');
        const [year, hour] = yearAndHour.split(' ');
        const appointmentISO = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour}`;
        // Remplacer par les vrais champs si disponibles
        return (
          <ItemAppointment
            key={i}
            appointment={appointmentISO}
            name={user.firstname + ' ' + user.lastname}
            product={a.category}
          />
        );
      })}
    </DashboardSection>
  );
} 