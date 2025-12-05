'use client';
import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../_components/Breadcrumbs'
import StarsRate from '@/app/_global_components/StarsRate'
import Image from 'next/image'
import Button from '@/app/_global_components/Button';
import RateStats from '../_components/RateStats';
import { Category, Include } from '@/interface/ICoaching';
import PriceView from '@/app/_global_components/PriceView';
import { FaRegStar } from 'react-icons/fa';
import Calendar from '../_components/Calendar';
import Link from 'next/link';

export default function Hero({category, title, img, price, promotion, limitPromotion, includes, description, rate, reviews, isConnected, id}: {category: Category, title: string, img:string, price:number, promotion: number|null|undefined, limitPromotion?: string, includes?: Include[], description: string, rate: number, reviews: string[], isConnected?: boolean, id: number}) {
    const [isBooking, setIsBooking] = useState(false);
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
        {windowWidth >= 300 && <Breadcrumbs linksArray={linksArray} ></Breadcrumbs>}    
        
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
            {/* Colonne principale - titre et description */}
            <div className='xl:col-span-2'>
                <h2 className='text-2xl font-bold mb-4'>{title}</h2>
                <p className='text-justify mb-6'>{description}</p>
                {isConnected ? (
                    <Button type='button' style='light' className='flex items-center gap-2 group'><FaRegStar className='fill-secondary group-hover:fill-light'/> Noter la formation</Button>
                ): (
                    <div className='space-y-2'>
                        {rate > 0 && 
                            <RateStats rate={rate} nbOfRates={reviews.length} />}
                        <a className='underline block'>Voir les avis</a>
                    </div>
                )}
            </div>
            
            {/* Colonne droite - carte avec image, prix et détails */}
            <div className={`xl:col-span-1 ${windowWidth >= 1280 ? 'xl:relative' : ''}`}>
                <div className={`bg-white dark:bg-slate-800 text-gray-800 dark:text-white rounded-lg p-4 ${windowWidth >= 1280 ? 'xl:absolute xl:top-0 xl:right-0 xl:w-80' : 'w-full'}`}>
                    {isBooking ? (
                        <Calendar 
                            setIsBooking={setIsBooking} 
                            productTitle={title} 
                            productId={id} 
                            initialView={category.name === 'Formation' ? "payment" : category.name === 'Ebook' ? "information" : "calendar"}
                        />
                    ) : (
                        <div className={`${windowWidth >= 700 && windowWidth < 1280 ? 'flex gap-4' : 'space-y-4'}`}>
                            {/* Image avec layout adaptatif */}
                            <div className={`${windowWidth >= 700 && windowWidth < 1280 ? 'w-1/3 flex-shrink-0' : ''}`}>
                                <Image 
                                    alt="Image d'illustration" 
                                    src={img} 
                                    width={400} 
                                    height={400} 
                                    className={`object-cover rounded-md ${
                                        windowWidth < 700 ? 'w-full h-32 sm:h-40 md:h-48' : 
                                        windowWidth >= 700 && windowWidth < 1280 ? 'w-full h-full max-h-[200px] min-h-[200px]' : 
                                        'w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-48'
                                    }`}
                                />
                            </div>
                            
                            {/* Contenu avec layout adaptatif */}
                            <div className={`${windowWidth >= 700 && windowWidth < 1280 ? 'flex-1 min-w-0 w-full' : ''}`}>
                                <PriceView price={price} promotion={promotion} className='text-xl font-semibold'/>
                                
                                {effectivePromotion > 0 && daysLeft && daysLeft > 0 && (
                                    <div className='space-y-1'>
                                        <p className='text-sm text-green-600 font-medium'>{promotion}% de réduction</p>
                                        {daysLeft && daysLeft < 15 && daysLeft > 0 && (
                                            <p className='text-xs text-red-600 font-medium'>
                                                Plus que {daysLeft} jour{daysLeft > 1 ? "s" : "" } pour bénéficier de la réduction
                                            </p>
                                        )}
                                    </div>
                                )}
                                
                                {category.name !== 'Ebook' && (
                                    <div className='space-y-3'>
                                        <h3 className='text-lg font-semibold'>
                                            Ce que contient ce{category.name === 'Coaching' ? ' coaching' : category.name === 'Formation' ? 'tte formation' : category.name}
                                        </h3>
                                        <ul className='space-y-1 text-sm'>
                                            {includes && includes.map((include, idx) => (
                                                <li key={idx} className='flex items-center gap-2'>
                                                    <span className='w-1 h-1 bg-primary rounded-full'></span>
                                                    {include.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                
                                <div className='pt-2'>
                                    {category.name === 'Coaching' && (
                                        <Button 
                                            type='button' 
                                            style='secondary' 
                                            className='xl:w-full text-white hover:text-secondary py-1 px-6 xl:py-3' 
                                            onClick={() => {setIsBooking(true)}}
                                        >
                                            Réserver un créneau
                                        </Button>
                                    )}
                                    {category.name === 'Formation' && (
                                        isConnected ? (
                                            <Button 
                                                type='button' 
                                                style='secondary' 
                                                className='xl:w-full text-white hover:text-secondary py-1 px-6 xl:py-3' 
                                                onClick={() => setIsBooking(true)}
                                            >
                                                Acheter la formation
                                            </Button>
                                        ) : (
                                            <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-3'>
                                                <div className='flex items-center gap-2'>
                                                    <svg className='h-5 w-5 text-yellow-400' viewBox='0 0 20 20' fill='currentColor'>
                                                        <path fillRule='evenodd' d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                                                    </svg>
                                                    <div>
                                                        <p className='text-sm text-yellow-800 font-medium'>Connectez-vous pour accéder à la formation</p>
                                                        <Link href='/login' className='text-xs text-yellow-600 hover:text-yellow-800 underline'>
                                                            Aller à la page de connexion
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                    {category.name === 'Ebook' && (
                                        <Button 
                                            type='button' 
                                            style='secondary' 
                                            className='xl:w-full text-white hover:text-secondary py-1 px-6 xl:py-3' 
                                            onClick={() => {setIsBooking(true)}}
                                        >
                                            En apprendre plus
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </section>
  )
}
