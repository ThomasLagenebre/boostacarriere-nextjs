'use client';
import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../_components/Breadcrumbs'
import StarsRate from '@/app/_global_components/StarsRate'
import Image from 'next/image'
import Button from '@/app/_global_components/Button';
import RateStats from '../_components/RateStats';
import { Category, Include } from '@/interface/ICoaching';
import PriceView from '@/app/_global_components/PriceView';

export default function Hero({category, title, img, price, promotion, limitPromotion, includes, description, rate, reviews}: {category: Category, title: string, img:string, price:number, promotion: number|null|undefined, limitPromotion?: string, includes: Include[], description: string, rate: number, reviews: string[]}) {
    // Window resize
    const [windowWidth, setWindowWidth] = useState(0);
    const effectivePromotion = promotion ?? 0;

    useEffect(() => {
        if (typeof window !== "undefined") {
          const handleResize = () => setWindowWidth(window.innerWidth);
          handleResize();
          window.addEventListener('resize', handleResize);
  
          return () => window.removeEventListener('resize', handleResize);
        }
      }, []);

      const parseDate = (dateString: string): Date => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day); // Les mois commencent à 0 en JS
      };

      const remainingDays = (limitPromotion?: string): number | null => {
        if (!limitPromotion) return null; // Retourne null si la date n'est pas définie
      
        const limitDate = parseDate(limitPromotion);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Réinitialise l'heure pour la date actuelle
        limitDate.setHours(0, 0, 0, 0); // Réinitialise également l'heure de la date limite
      
        const diffTime = limitDate.getTime() - today.getTime(); // Différence en millisecondes
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Conversion en jours
      
        return diffDays;
      };

      const daysLeft = remainingDays(limitPromotion);

    const linksArray = [
        {
            label: "Accueil",
            href: '/'
        },
        {
            label: category.name,
            href: '/'
        },
        {
            label: title,
            href: '/'
        }
    ]
  return (
    <section className='bg-secondary text-white rounded-lg py-6 px-4 lg:px-8 my-6 relative'>
        <Breadcrumbs linksArray={linksArray} ></Breadcrumbs>
        <div className='md:flex md:items-start md:gap-4'>
            {windowWidth < 1280 && (
                <Image alt="Image d'illustration" src={img} width={400} height={400} className='max-[500px]:h-48 min-[500px]:w-1/2 md:w-1/4 mb-4 object-cover'/>
            )}
            <div className='xl:w-2/3'>
                <h2 className='text-2xl font-bold'>{title}</h2>
                <p>{description}</p>
                {rate > 0 && <RateStats rate={rate} nbOfRates={reviews.length} />}
                
                <a className='underline'>Voir les avis</a>
            </div>
            
        </div>
        
        
        
        {windowWidth >= 1280 && (
            <div className={`mt-10 absolute top-6 right-6 bg-white dark:bg-slate-800 text-gray-800 dark:text-white rounded-lg lg:p-4 max-w-[400px]`}>
                <Image alt="Image d'illustration" src={img} width={400} height={400} className='w-full object-cover rounded-t-md'/>
                <PriceView price={price} promotion={promotion} className='mt-4 text-xl'/>
                {effectivePromotion > 0 && daysLeft && daysLeft > 0 && (
                    <>
                        <p className='text-xs'>{promotion}% de réduction</p>
                        {daysLeft && daysLeft < 15 && daysLeft > 0 && (
                            <p className='text-xs text-red-600'>Plus que {daysLeft} jour{daysLeft > 1 ? "s" : "" } pour bénéficier de la réduction</p>
                        )}
                    </>
                )}
                <div className='my-6'>
                    <h3 className='text-lg font-semibold mb-2'>Ce que contient ce coaching</h3>
                    <ul>
                        {includes.map((include, idx) => (
                          <li key={idx}>{include.title}</li>
                        ))}
                    </ul>
                    <Button type='button' style='secondary' className='text-white hover:text-secondary mt-6'>Réserver un créneau</Button>
                </div>
            </div>
        )}
        
    </section>
  )
}
