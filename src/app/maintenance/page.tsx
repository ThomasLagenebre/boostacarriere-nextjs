'use client';

import { FaLinkedin, FaInstagram, FaTiktok } from 'react-icons/fa';
import "../globals.css";

export default function MaintenancePage() {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://linkedin.com/company/boostacarriere',
      color: 'hover:bg-blue-700'
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://instagram.com/boostacarriere',
      color: 'hover:bg-pink-500'
    },
    {
      name: 'TikTok',
      icon: FaTiktok,
      url: 'https://tiktok.com/@boostacarriere',
      color: 'hover:bg-black'
    }
  ];

  return (
    <div className="min-h-screen bg-light flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo/Image */}
        <p   className='font-bold text-4xl md:text-6xl max-xl:text-center text-secondary'>Boostacarriere</p>

        {/* Titre principal */}
        <h1 className="text-xl md:text-2xl font-bold text-secondary mb-6">
          Site en maintenance
        </h1>

        {/* Message */}
        <div className="bg-primary/30 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
          <p className="text-xl md:text-2xl text-secondary/90 mb-4">
            Nous travaillons actuellement sur des améliorations pour vous offrir une meilleure expérience.
          </p>
          <p className="text-lg text-secondary/80">
            Nous serons de retour très bientôt !
          </p>
        </div>

        {/* Estimation du temps */}
        <div className="bg-primary/30 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
          <p className="text-secondary/90 text-lg mb-2">Date de retour :</p>
          <p className="text-2xl font-bold text-secondary">23 août 2025 à 18h</p>
        </div>

        {/* Réseaux sociaux */}
        <div className="bg-primary/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-secondary mb-6">
            Restez connectés avec nous
          </h2>
          <p className="text-secondary/80 mb-6">
            Suivez-nous sur nos réseaux sociaux pour rester informés de nos actualités
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-white/20 hover:bg-white/30 transition-all duration-300 rounded-xl p-4 border border-white/30 ${social.color}`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <social.icon className="text-2xl text-secondary group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-secondary font-medium text-sm">{social.name}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Contact d'urgence */}
        <div className="mt-8 text-secondary">
          <p className="text-sm">
            Besoin urgent ? Contactez-nous à{' '}
            <a 
              href="mailto:contact.boostacarriere@gmail.com" 
              className="text-secondary hover:text-primary transition-colors duration-300 underline"
            >
              contact.boostacarriere@gmail.com
            </a>
          </p>
        </div>

        {/* Barre de progression */}
        <div className="mt-8">
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '65%' }}></div>
          </div>
          <p className="text-secondary text-sm mt-2">Progression : 65%</p>
        </div>
      </div>
    </div>
  );
}
