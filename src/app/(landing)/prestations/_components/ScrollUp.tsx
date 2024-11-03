'use client';
import React, { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollUp() {
    const [scrollY, setScrollY] = useState(0)
    const scrollToTop = () => {    window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
    useEffect(() => {
        if (typeof window !== "undefined") {
          const handleScroll = () => setScrollY(window.scrollY);

          handleScroll();
    
          window.addEventListener('scroll', handleScroll);
    
          // Nettoyer l'écouteur d'événements au démontage du composant
          return () => window.removeEventListener('scroll', handleScroll);
        }
      }, []);
  return (
    <button onClick={() => scrollToTop()} className={`bg-primary w-12 h-12 rounded-full flex items-center justify-center ${scrollY > 500 && 'fixed bottom-10 right-10'}`}><FaArrowUp className='text-white' size={20}/></button>
  )
}
