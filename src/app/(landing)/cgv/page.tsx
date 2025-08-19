import React from 'react'
import Link from 'next/link'
import { FaFileContract, FaShieldAlt, FaCreditCard, FaUserCheck, FaExclamationTriangle } from 'react-icons/fa'

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 lg:px-8 bg-secondary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="flex justify-center mb-6">
            <FaFileContract className="text-6xl text-white opacity-80" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Conditions Générales de Vente
          </h1>
          <p className="text-xl text-gray-100">
            Dernière mise à jour : Janvier 2024
          </p>
        </div>
      </section>

      {/* Navigation rapide */}
      <section className="py-8 px-4 lg:px-8 bg-white border-b">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#preambule" className="px-4 py-2 bg-gray-100 hover:bg-secondary hover:text-white rounded-lg text-sm transition-colors duration-300">
              Préambule
            </a>
            <a href="#services" className="px-4 py-2 bg-gray-100 hover:bg-secondary hover:text-white rounded-lg text-sm transition-colors duration-300">
              Services
            </a>
            <a href="#commandes" className="px-4 py-2 bg-gray-100 hover:bg-secondary hover:text-white rounded-lg text-sm transition-colors duration-300">
              Commandes
            </a>
            <a href="#paiement" className="px-4 py-2 bg-gray-100 hover:bg-secondary hover:text-white rounded-lg text-sm transition-colors duration-300">
              Paiement
            </a>
            <a href="#annulation" className="px-4 py-2 bg-gray-100 hover:bg-secondary hover:text-white rounded-lg text-sm transition-colors duration-300">
              Annulation
            </a>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-12 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Préambule */}
          <div id="preambule" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaShieldAlt className="text-primary" />
              Préambule
            </h2>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700 mb-4">
                Les présentes Conditions Générales de Vente (CGV) s&apos;appliquent à toutes les prestations conclues par Boostacarriere, 
                société de coaching et formation professionnelle, auprès de ses clients professionnels et particuliers.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Éditeur :</strong> Boostacarriere<br/>
                <strong>Adresse :</strong> [Adresse de votre entreprise]<br/>
                <strong>Email :</strong> contact@boostacarriere.fr<br/>
                <strong>SIRET :</strong> [Numéro SIRET]
              </p>
              <p className="text-gray-700">
                Toute commande implique l&apos;acceptation sans réserve par l&apos;acheteur des présentes conditions de vente.
              </p>
            </div>
          </div>

          {/* Services */}
          <div id="services" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaUserCheck className="text-primary" />
              Services proposés
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Coaching individuel</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Accompagnement personnalisé en développement de carrière</li>
                  <li>• Sessions de 1h à 2h selon le programme choisi</li>
                  <li>• Suivi personnalisé et plan d&apos;action</li>
                  <li>• Support par email entre les sessions</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Formations en ligne</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Modules de formation accessibles 24h/24</li>
                  <li>• Contenu vidéo et documents téléchargeables</li>
                  <li>• Accès illimité pendant 12 mois</li>
                  <li>• Certificat de formation délivré</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Commandes */}
          <div id="commandes" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaFileContract className="text-primary" />
              Commandes et réservations
            </h2>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Processus de commande</h3>
              <ol className="text-gray-700 space-y-3 list-decimal list-inside">
                <li>Consultation du catalogue des prestations sur le site</li>
                <li>Sélection du service souhaité et ajout au panier</li>
                <li>Remplissage du formulaire de commande avec les informations requises</li>
                <li>Validation de la commande et paiement sécurisé</li>
                <li>Confirmation par email avec les détails de la prestation</li>
                <li>Pour les coachings : prise de rendez-vous via le calendrier en ligne</li>
              </ol>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Informations requises :</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Nom, prénom et email</li>
                  <li>• Numéro de téléphone pour les coachings</li>
                  <li>• Informations professionnelles (poste, secteur d&apos;activité)</li>
                  <li>• Objectifs et attentes de la prestation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Paiement */}
          <div id="paiement" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaCreditCard className="text-primary" />
              Modalités de paiement
            </h2>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Moyens de paiement acceptés</h3>
              <ul className="text-gray-700 space-y-2 mb-6">
                <li>• Cartes bancaires (Visa, Mastercard, American Express)</li>
                <li>• Paiement en ligne sécurisé via Stripe</li>
                <li>• Virement bancaire (sur devis uniquement)</li>
                <li>• Chèque (sur devis uniquement)</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Tarifs et facturation</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Tous les prix sont exprimés en euros et hors taxes</li>
                <li>• La TVA n&apos;est pas applicable (BIC - Article 293B du CGI)</li>
                <li>• Facturation immédiate lors de la commande</li>
                <li>• Possibilité de paiement en plusieurs fois pour certains programmes</li>
              </ul>
            </div>
          </div>

          {/* Annulation */}
          <div id="annulation" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaExclamationTriangle className="text-primary" />
              Droit de rétractation et annulation
            </h2>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Droit de rétractation</h3>
              <p className="text-gray-700 mb-4">
                Conformément à la législation en vigueur, vous disposez d&apos;un délai de rétractation de 14 jours 
                à compter de la date de commande pour les formations en ligne.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Annulation des coachings</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• Annulation gratuite jusqu&apos;à 48h avant le rendez-vous</li>
                <li>• Annulation entre 48h et 24h : 50% du montant facturé</li>
                <li>• Annulation moins de 24h avant : 100% du montant facturé</li>
                <li>• Report possible gratuitement jusqu&apos;à 24h avant</li>
              </ul>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Cas de force majeure :</h4>
                <p className="text-yellow-800 text-sm">
                  En cas de force majeure (maladie, accident, événement exceptionnel), 
                  l&apos;annulation peut être reportée sans frais sur présentation d&apos;un justificatif.
                </p>
              </div>
            </div>
          </div>

          {/* Protection des données */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaShieldAlt className="text-primary" />
              Protection des données personnelles
            </h2>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700 mb-4">
                Vos données personnelles sont collectées et traitées conformément au Règlement Général 
                sur la Protection des Données (RGPD) et à notre politique de confidentialité.
              </p>
              <p className="text-gray-700">
                Pour plus d&apos;informations, consultez notre{' '}
                <Link href="/mentions-legales" className="text-primary hover:underline">
                  politique de confidentialité
                </Link>.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact et support</h2>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-gray-700 mb-4">
                Pour toute question concernant ces conditions générales de vente, 
                vous pouvez nous contacter :
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• <strong>Email :</strong> contact@boostacarriere.fr</li>
                <li>• <strong>Téléphone :</strong> [Votre numéro]</li>
                <li>• <strong>Adresse :</strong> [Votre adresse]</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Des questions sur nos conditions ?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Notre équipe est là pour vous accompagner
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Nous contacter
            </Link>
            <Link 
              href="/" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-300"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
