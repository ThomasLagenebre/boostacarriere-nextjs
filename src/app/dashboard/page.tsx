import React from 'react'
import DashboardSection from './_components/DashboardSection';
import ItemCard from './_components/ItemCard';
import { FaUser, FaBook } from 'react-icons/fa';
import ItemAppointment from './_components/ItemAppointment';

export default function page() {
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className='lg:w-5/6 lg:py-6 px-4'>
      <DashboardSection className='mt-0'>
        <p className='font-bold'>Nous sommes le {today}</p>
      </DashboardSection>
      <div className='flex items-center justify-between'>
        <ItemCard title='Nombre de coachings' number={854} evolution={-1} icon={FaUser} />
        <ItemCard title="Nombre d'ebook téléchargés" number={121} evolution={5} icon={FaBook} />
        <ItemCard title='Nombre de coachings' number={854} evolution={-1} icon={FaUser} />
      </div>
      
      <div className='grid grid-cols-4 gap-6 my-4'>
        <div className='bg-white col-span-2 px-4'>
          <ItemAppointment  appointment='2025-01-11T02:30' name='Axel Constance' product='Négocie ton salaire'/>
          <ItemAppointment  appointment='2025-01-17T10:00' name='Axel Constance' product='Négocie ton salaire'/>
          <ItemAppointment  appointment='2025-02-02T08:00' name='Axel Constance' product='Négocie ton salaire'/>
        </div>
        
      </div>
      
      </div>
  )
}
