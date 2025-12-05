'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaClock, FaUsers, FaArrowRight, FaGraduationCap, FaCheckCircle, FaShoppingCart, FaUserGraduate, FaBook } from 'react-icons/fa';
import allCoachings from '@/app/_data/allCoachings';
import allEbooks from '@/app/_data/allEbooks';
import { fetchAllFormations } from '@/app/_data/fetchAllFormations';
import DirectPurchaseForm from './_components/DirectPurchaseForm';
import EmailVerificationGuard from '@/app/_global_components/EmailVerificationGuard';

interface Formation {
  id: number;
  title: string;
  slogan: string;
  picture: string;
  price: string;
  promotion?: number;
  category: {
    id: number;
    name: string;
  };
  isActive: boolean;
}

interface PrestationItem {
  id: number;
  title: string;
  slogan: string;
  picture: string;
  price: string;
  promotion?: number;
  category: {
    id: number;
    name: string;
  };
  isActive: boolean;
  slug?: string;
  rate?: number;
}

export default function PrestationsPage() {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ title: string; id: number } | null>(null);

  useEffect(() => {
    const loadFormations = async () => {
      try {
        const data = await fetchAllFormations();
        setFormations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Erreur lors du chargement des formations:', error);
        setFormations([]);
      } finally {
        setLoading(false);
      }
    };

    loadFormations();
  }, []);

  // Créer les catégories de manière dynamique pour éviter l'erreur undefined
  const categories = [
    { id: 'all', name: 'Toutes nos prestations', icon: <FaGraduationCap />, count: allCoachings.length + allEbooks.length + (formations?.length || 0) },
    { id: 'coaching', name: 'Coaching', icon: <FaUserGraduate />, count: allCoachings.length },
    { id: 'ebooks', name: 'Ebooks', icon: <FaBook />, count: allEbooks.length },
    { id: 'formations', name: 'Formations', icon: <FaGraduationCap />, count: formations?.length || 0 }
  ];

  const getFilteredItems = (): PrestationItem[] => {
    switch (activeCategory) {
      case 'coaching':
        return allCoachings;
      case 'ebooks':
        return allEbooks;
      case 'formations':
        return formations || [];
      default:
        return [...allCoachings, ...allEbooks, ...(formations || [])];
    }
  };

  const formatPrice = (price: string, promotion?: number) => {
    const numPrice = parseInt(price) / 100; // Conversion des centimes en euros
    if (promotion && promotion > 0) {
      const discountedPrice = numPrice * (1 - promotion / 100);
      return (
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">{discountedPrice.toFixed(0)}€</span>
          <span className="text-sm text-gray-500 line-through">{numPrice.toFixed(0)}€</span>
          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">-{promotion}%</span>
        </div>
      );
    }
    return (
      <span className="text-lg font-bold text-primary">
        {numPrice === 0 ? 'Gratuit' : `${numPrice.toFixed(0)}€`}
      </span>
    );
  };

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'coaching':
        return <FaUserGraduate className="text-primary" />;
      case 'ebook':
        return <FaBook className="text-primary" />;
      case 'formation':
        return <FaGraduationCap className="text-primary" />;
      default:
        return <FaGraduationCap className="text-primary" />;
    }
  };

  const getCategoryColor = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'coaching':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'ebook':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'formation':
        return 'bg-purple-50 border-purple-200 text-purple-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const handlePurchaseFormation = (title: string, id: number) => {
    setSelectedProduct({ title, id });
    setShowPurchaseForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 lg:px-8 bg-secondary">
        <div className="max-w-6xl mx-auto text-center text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Nos Prestations
          </h1>
          <p className="text-xl lg:text-2xl text-gray-100 max-w-3xl mx-auto mb-8">
            Découvrez notre gamme complète de services pour booster votre carrière : 
            coaching personnalisé, ebooks pratiques et formations expertes
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.slice(1).map((category) => (
              <div key={category.id} className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="flex items-center gap-2">
                  {category.icon}
                  <span className="font-semibold">{category.name}</span>
                  <span className="bg-white/30 px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filtres par catégorie */}
      <section className="py-8 px-4 lg:px-8 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon}
                {category.name}
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grille des prestations */}
      <section className="py-16 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des prestations...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getFilteredItems().map((item: PrestationItem, index: number) => (
                  <div
                    key={`${item.category.name}-${index}`}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.picture}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-2 rounded-full text-xs font-medium border flex items-center gap-2 ${getCategoryColor(item.category.name)}`}>
                          {getCategoryIcon(item.category.name)}
                          <span>{item.category.name}</span>
                        </span>
                      </div>
                      {item.promotion && item.promotion > 0 && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            -{item.promotion}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {item.slogan}
                      </p>

                      {/* Prix */}
                      <div className="mb-4">
                        {formatPrice(item.price, item.promotion)}
                      </div>

                      {/* Caractéristiques */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                        {item.rate && (
                          <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-400" />
                            <span>{item.rate}</span>
                          </div>
                        )}
                        {item.category.name === 'Coaching' && (
                          <div className="flex items-center gap-1">
                            <FaClock className="text-blue-400" />
                            <span>1-2h</span>
                          </div>
                        )}
                        {item.category.name === 'Formation' && (
                          <div className="flex items-center gap-1">
                            <FaUsers className="text-purple-400" />
                            <span>Groupe</span>
                          </div>
                        )}
                      </div>

                      {/* Bouton */}
                      <div className="space-y-3">
                        <Link
                          href={`/prestations/${item.category.name.toLowerCase() === 'coaching' ? 'coachings' : item.category.name.toLowerCase() === 'ebook' ? 'ebooks' : 'formations'}/${item.category.name.toLowerCase() === 'coaching' ? item.slug : item.id}`}
                          className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2 group-hover:gap-3"
                        >
                          Découvrir
                          <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                        
                        {/* Bouton Acheter la formation pour les formations */}
                        {item.category.name === 'Formation' && (
                          <EmailVerificationGuard action="acheter cette formation">
                            <button
                              onClick={() => handlePurchaseFormation(item.title, item.id)}
                              className="w-full bg-secondary text-white py-3 px-4 rounded-lg hover:bg-secondary/90 transition-colors duration-300 flex items-center justify-center gap-2 group-hover:gap-3"
                            >
                              <FaShoppingCart className="text-sm" />
                              Acheter la formation
                            </button>
                          </EmailVerificationGuard>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message si aucune prestation */}
              {getFilteredItems().length === 0 && (
                <div className="text-center py-12">
                  <FaGraduationCap className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Aucune prestation trouvée
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Essayez de modifier vos filtres ou contactez-nous directement.
                  </p>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
                  >
                    Nous contacter
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 px-4 lg:px-8 bg-secondary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Prêt à booster votre carrière ?
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Nos experts sont là pour vous accompagner dans votre réussite professionnelle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-secondary rounded-lg hover:bg-gray-100 transition-colors duration-300 font-semibold"
            >
              <FaCheckCircle />
              Commencer maintenant
            </Link>
            <Link 
              href="/a-propos" 
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-secondary transition-colors duration-300 font-semibold"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* Formulaire d'achat direct */}
      {showPurchaseForm && selectedProduct && (
        <DirectPurchaseForm
          productTitle={selectedProduct.title}
          productId={selectedProduct.id}
          onClose={() => {
            setShowPurchaseForm(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}
