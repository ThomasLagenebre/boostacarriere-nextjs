'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaQuestionCircle, FaSearch, FaChevronDown, FaChevronUp, FaLightbulb, FaUserGraduate, FaCreditCard, FaCalendarAlt } from 'react-icons/fa';
import { fetchFAQ, FAQItem } from '@/app/_data/faq';

export default function FAQPage() {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const loadFAQ = async () => {
      try {
        setLoading(true);
        const data = await fetchFAQ();
        // S'assurer que data est un tableau
        const faqArray = Array.isArray(data) ? data : [];
        setFaqItems(faqArray);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des questions');
        console.error('Erreur FAQ:', err);
        // En cas d'erreur, utiliser un tableau vide
        setFaqItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadFAQ();
  }, []);

  // S'assurer que faqItems est toujours un tableau
  const safeFaqItems = Array.isArray(faqItems) ? faqItems : [];

  // Catégories pour organiser les questions
  const categories = [
    { id: 'all', name: 'Toutes les questions', icon: <FaQuestionCircle />, count: safeFaqItems.length },
    { id: 'coaching', name: 'Coaching', icon: <FaUserGraduate />, count: safeFaqItems.filter(item => item.question.toLowerCase().includes('coaching')).length },
    { id: 'formations', name: 'Formations', icon: <FaLightbulb />, count: safeFaqItems.filter(item => item.question.toLowerCase().includes('formation')).length },
    { id: 'paiement', name: 'Paiement', icon: <FaCreditCard />, count: safeFaqItems.filter(item => item.question.toLowerCase().includes('paiement') || item.question.toLowerCase().includes('tarif')).length },
    { id: 'organisation', name: 'Organisation', icon: <FaCalendarAlt />, count: safeFaqItems.filter(item => item.question.toLowerCase().includes('inscription') || item.question.toLowerCase().includes('annulation') || item.question.toLowerCase().includes('processus')).length }
  ];

  // Filtrer les questions selon la catégorie et la recherche
  const filteredItems = safeFaqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.response.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeCategory === 'all') return matchesSearch;
    
    const categoryKeywords = {
      coaching: ['coaching', 'session', 'accompagnement'],
      formations: ['formation', 'module', 'apprentissage'],
      paiement: ['paiement', 'tarif', 'prix', 'facturation'],
      organisation: ['inscription', 'annulation', 'processus', 'rendez-vous']
    };
    
    const keywords = categoryKeywords[activeCategory as keyof typeof categoryKeywords] || [];
    const matchesCategory = keywords.some(keyword => 
      item.question.toLowerCase().includes(keyword) || 
      item.response.toLowerCase().includes(keyword)
    );
    
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const toggleAll = () => {
    if (openItems.size === filteredItems.length) {
      setOpenItems(new Set());
    } else {
      setOpenItems(new Set(filteredItems.map((_, index) => index)));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 lg:px-8 bg-secondary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="flex justify-center mb-6">
            <FaQuestionCircle className="text-6xl text-white opacity-80" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Questions Fréquemment Posées
          </h1>
          <p className="text-xl text-gray-100">
            Trouvez rapidement les réponses à vos questions sur nos services
          </p>
        </div>
      </section>

      {/* Barre de recherche */}
      <section className="py-8 px-4 lg:px-8 bg-white border-b">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-6 px-4 lg:px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
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

      {/* Contenu principal */}
      <section className="py-12 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredItems.length} question{filteredItems.length > 1 ? 's' : ''} trouvée{filteredItems.length > 1 ? 's' : ''}
              </h2>
              {searchTerm && (
                <p className="text-gray-600 mt-1">
                  Résultats pour : &quot;{searchTerm}&quot;
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={toggleAll}
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors duration-300 text-sm"
              >
                {openItems.size === filteredItems.length ? 'Tout fermer' : 'Tout ouvrir'}
              </button>
            </div>
          </div>

          {/* Questions */}
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-800 mb-4">{error}</p>
              <p className="text-red-600 text-sm">
                Les questions par défaut sont affichées ci-dessous.
              </p>
            </div>
          ) : null}

          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <FaQuestionCircle className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Aucune question trouvée
              </h3>
              <p className="text-gray-500 mb-6">
                Essayez de modifier vos critères de recherche ou contactez-nous directement.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
              >
                Nous contacter
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-300 flex items-center justify-between"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.question}
                    </h3>
                    {openItems.has(index) ? (
                      <FaChevronUp className="text-primary flex-shrink-0" />
                    ) : (
                      <FaChevronDown className="text-primary flex-shrink-0" />
                    )}
                  </button>
                  
                  {openItems.has(index) && (
                    <div className="px-6 pb-4 border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed pt-4">
                        {item.response}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Section d'aide */}
          <div className="mt-16 bg-white rounded-lg border border-gray-200 p-8 text-center">
            <FaLightbulb className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Vous ne trouvez pas votre réponse ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Notre équipe est là pour vous aider. N&apos;hésitez pas à nous contacter 
              pour toute question spécifique sur nos services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
              >
                Nous contacter
              </Link>
              <Link 
                href="/prestations" 
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
              >
                Découvrir nos prestations
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
