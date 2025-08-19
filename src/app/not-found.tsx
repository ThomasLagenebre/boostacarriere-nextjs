'use client';

import React from 'react';
import Link from 'next/link';
import { FaHome, FaSearch, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import Header from './_global_sections/Header';
import Footer from './_global_sections/Footer';
import './globals.css';

export default function NotFound() {
  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          
          {/* Illustration et titre principal */}
          <div className="mb-8">
            <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaExclamationTriangle className="text-primary text-6xl" />
            </div>
            
            <h1 className="text-8xl font-bold text-primary mb-4">
              404
            </h1>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Page introuvable
            </h2>
            
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Oups ! Il semble que la page que vous recherchez n&apos;existe pas ou ait été déplacée.
            </p>
          </div>

          {/* Suggestions d'actions */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Que souhaitez-vous faire ?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Retour à l'accueil */}
              <Link 
                href="/"
                className="group flex items-center justify-center gap-3 bg-primary text-white py-4 px-6 rounded-xl hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
              >
                <FaHome className="text-lg group-hover:rotate-12 transition-transform duration-200" />
                <span className="font-medium">Retour à l&apos;accueil</span>
              </Link>

              {/* Retour en arrière */}
              <button 
                onClick={() => window.history.back()}
                className="group flex items-center justify-center gap-3 bg-secondary text-white py-4 px-6 rounded-xl hover:bg-secondary/90 transition-all duration-200 transform hover:scale-105"
              >
                <FaArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="font-medium">Retour en arrière</span>
              </button>
            </div>
          </div>

          {/* Navigation rapide */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Navigation rapide
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link 
                href="/prestations"
                className="flex items-center justify-center gap-2 bg-gray-50 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-sm font-medium">Nos prestations</span>
              </Link>
              
              <Link 
                href="/a-propos"
                className="flex items-center justify-center gap-2 bg-gray-50 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-sm font-medium">À propos</span>
              </Link>
              
              <Link 
                href="/contact"
                className="flex items-center justify-center gap-2 bg-gray-50 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-sm font-medium">Contact</span>
              </Link>
              
              <Link 
                href="/faq"
                className="flex items-center justify-center gap-2 bg-gray-50 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-sm font-medium">FAQ</span>
              </Link>
              
              <Link 
                href="/login"
                className="flex items-center justify-center gap-2 bg-gray-50 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-sm font-medium">Connexion</span>
              </Link>
              
              <Link 
                href="/inscription"
                className="flex items-center justify-center gap-2 bg-gray-50 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-sm font-medium">Inscription</span>
              </Link>
            </div>
          </div>

          {/* Message d'aide */}
          <div className="mt-8 p-4 bg-white border-2 border-primary/30 rounded-xl shadow-sm">
            <p className="text-sm text-gray-800">
              <strong className="text-primary font-semibold">Besoin d&apos;aide ?</strong> Si vous pensez qu&apos;il s&apos;agit d&apos;une erreur, 
              n&apos;hésitez pas à nous contacter via notre page de contact.
            </p>
          </div>

          {/* Recherche (optionnel) */}
          <div className="mt-8">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Rechercher sur le site..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}