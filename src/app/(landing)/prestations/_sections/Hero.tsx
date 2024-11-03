'use client';
import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../_components/Breadcrumbs'
import StarsRate from '@/app/_global_components/StarsRate'
import Image from 'next/image'
import Button from '@/app/_global_components/Button';
import RateStats from '../_components/RateStats';

export default function Hero() {
    // Window resize
    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        if (typeof window !== "undefined") {
          const handleResize = () => setWindowWidth(window.innerWidth);
          handleResize();
          window.addEventListener('resize', handleResize);
  
          return () => window.removeEventListener('resize', handleResize);
        }
      }, []);


    const linksArray = [
        {
            label: "Accueil",
            href: '/'
        },
        {
            label: "Coachings",
            href: '/'
        },
        {
            label: "Obtiens le CV parfait",
            href: '/'
        }
    ]
  return (
    <section className='bg-secondary text-white rounded-lg py-6 px-4 lg:px-8 my-6 relative'>
        <Breadcrumbs linksArray={linksArray} ></Breadcrumbs>
        <div className='md:flex md:items-start md:gap-4'>
            {windowWidth < 1280 && (
                <Image alt="Image d'illustration" src='https://firebasestorage.googleapis.com/v0/b/boostacarriere-2679a.appspot.com/o/files%2Frelecture-cv-lettre-motivation.jpg?alt=media&token=a33237d8-e146-40e5-8e50-a980f63a2f23' width={400} height={400} className='max-[500px]:h-48 min-[500px]:w-1/2 md:w-1/4 mb-4 object-cover'/>
            )}
            <div>
                <h2 className='text-2xl font-bold'>Obtiens le CV parfait</h2>
                <p>Donne un coup de boost à ta carrière avec le service de création de CV et d&apos;entretien personnalisé</p>
                <RateStats rate={3.9} nbOfRates='543' />
                <p className='underline'>Voir les avis</p>
            </div>
            
        </div>
        
        
        
        {windowWidth >= 1280 && (
            <div className={`mt-10 absolute top-6 right-6 bg-white text-gray-800 rounded-lg lg:p-4 max-w-[400px]`}>
                <Image alt="Image d'illustration" src='https://firebasestorage.googleapis.com/v0/b/boostacarriere-2679a.appspot.com/o/files%2Frelecture-cv-lettre-motivation.jpg?alt=media&token=a33237d8-e146-40e5-8e50-a980f63a2f23' width={400} height={400} className='w-full object-cover rounded-t-md'/>
                <div className='flex items-center gap-6 mt-4'>
                    <p className=' text-xl font-bold'>79.99€</p>
                    <p className='text-gray-600 dark:text-gray-400 line-through'>99.99€</p>
                </div>
                <p className='text-xs'>20% de réduction</p>
                <p className='text-xs text-red-600'>Plus que 2 jours pour bénéficier de la réduction</p>
                <div className='my-6'>
                    <h3 className='text-lg font-semibold mb-2'>Ce que contient ce coaching</h3>
                    <ul>
                        <li>3 CV sur mesure</li>
                        <li>1 entretien de 45 minutes</li>
                    </ul>
                    <Button type='button' style='secondary' className='text-white hover:text-secondary mt-6'>Réserver un créneau</Button>
                </div>
            </div>
        )}
        
    </section>
  )
}
