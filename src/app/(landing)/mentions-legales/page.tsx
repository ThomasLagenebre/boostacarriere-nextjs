import React from 'react'
import Link from 'next/link'
import { FaShieldAlt, FaBuilding, FaServer, FaUserShield, FaCopyright, FaExclamationTriangle, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="flex justify-center mb-6">
            <FaShieldAlt className="text-6xl text-white opacity-80" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Mentions Légales
          </h1>
          <p className="text-xl text-gray-100">
            Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l&apos;économie numérique
          </p>
        </div>
      </section>

      {/* Navigation rapide */}
      <section className="py-8 px-4 lg:px-8 bg-white border-b">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#editeur" className="px-4 py-2 bg-gray-100 hover:bg-primary hover:text-white rounded-lg text-sm transition-colors duration-300">
              Éditeur
            </a>
            <a href="#hebergement" className="px-4 py-2 bg-gray-100 hover:bg-primary hover:text-white rounded-lg text-sm transition-colors duration-300">
              Hébergement
            </a>
            <a href="#confidentialite" className="px-4 py-2 bg-gray-100 hover:bg-primary hover:text-white rounded-lg text-sm transition-colors duration-300">
              Confidentialité
            </a>
            <a href="#propriete" className="px-4 py-2 bg-gray-100 hover:bg-primary hover:text-white rounded-lg text-sm transition-colors duration-300">
              Propriété
            </a>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-12 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Éditeur du site */}
          <div id="editeur" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaBuilding className="text-primary" />
              Éditeur du site
            </h2>
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Informations de l&apos;entreprise</h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-start gap-3">
                      <FaBuilding className="text-primary mt-1 flex-shrink-0" />
                      <div>
                        <strong>Raison sociale :</strong> Boostacarriere<br/>
                        <span className="text-sm text-gray-500">Entreprise individuelle</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                      <div>
                        <strong>Adresse :</strong><br/>
                        262 rue Gabriel Péri<br/>
                        94230 Cachan, France
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaEnvelope className="text-primary mt-1 flex-shrink-0" />
                      <div>
                        <strong>Email :</strong><br/>
                        <a href="mailto:contact.boostacarriere@gmail.com" className="text-primary hover:underline">
                          contact.boostacarriere@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Informations légales</h3>
                  <div className="space-y-3 text-gray-700">
                    <div>
                      <strong>SIRET :</strong> 931 740 906 00017
                    </div>
                    <div>
                      <strong>Directrice de la publication :</strong><br/>
                      Laurine Lagenebre
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Note :</strong> Ce site est édité par une entreprise individuelle 
                        spécialisée dans le coaching et la formation professionnelle.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hébergement */}
          <div id="hebergement" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaServer className="text-primary" />
              Hébergement du site
            </h2>
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Hébergeur</h3>
                  <div className="space-y-3 text-gray-700">
                    <div>
                      <strong>Nom :</strong> HOSTINGER INTERNATIONAL LTD
                    </div>
                    <div>
                      <strong>Adresse :</strong><br/>
                      61 Lordou Vironos Street<br/>
                      6023 Larnaca, Chypre
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact hébergeur</h3>
                  <div className="space-y-3">
                    <a 
                      href="https://www.hostinger.fr/contact" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
                    >
                      <FaEnvelope />
                      Contacter l&apos;hébergeur
                    </a>
                    <div className="text-sm text-gray-600">
                      <p>L&apos;hébergeur est responsable de la disponibilité technique du site web.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Politique de confidentialité */}
          <div id="confidentialite" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaUserShield className="text-primary" />
              Politique de confidentialité et cookies
            </h2>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Cadre légal</h3>
              <p className="text-gray-700 mb-4">
                En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978, 
                la loi n° 2004-801 du 6 août 2004, l&apos;article L. 226-13 du Code pénal et la Directive Européenne du 24 octobre 1995.
              </p>
              <p className="text-gray-700">
                À l&apos;occasion de l&apos;utilisation du site, peuvent être recueillies : l&apos;URL des liens visités sur ce site, 
                le fournisseur d&apos;accès de l&apos;utilisateur, l&apos;adresse de protocole Internet (IP) de l&apos;utilisateur, 
                le fuseau horaire de l&apos;utilisateur.
              </p>
            </div>

            <div className="space-y-6">
              {/* Informations collectées */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FaExclamationTriangle className="text-primary" />
                  Informations collectées
                </h4>
                <p className="text-gray-700 mb-4">
                  Lorsque l&apos;utilisateur remplit des formulaires, il fournit volontairement certaines informations énumérées ci-dessous :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Adresse email</li>
                  <li>Nom complet</li>
                  <li>Informations professionnelles (selon le formulaire)</li>
                </ul>
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Consentement :</strong> Sur chacun des formulaires présents, l&apos;utilisateur consent 
                    explicitement l&apos;utilisation de ses données personnelles conformément aux présentes mentions légales.
                  </p>
                </div>
              </div>

              {/* Utilisation des données */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FaUserShield className="text-primary" />
                  Utilisation des données
                </h4>
                <p className="text-gray-700 mb-4">
                  Boostacarriere est responsable du traitement de ces données. Les informations collectées sont utilisées afin de :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                  <li>Partager l&apos;actualité de Boostacarriere</li>
                  <li>Personnaliser les échanges avec Boostacarriere</li>
                  <li>Vous permettre d&apos;accéder aux services demandés</li>
                  <li>Améliorer la qualité de nos prestations</li>
                </ul>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Protection :</strong> Les informations personnelles collectées ne seront utilisées que dans le cadre de nos missions. 
                    Elles ne pourront être utilisées à des fins commerciales et ne sont ni vendues, ni échangées, ni transférées à des tiers.
                  </p>
                </div>
              </div>

              {/* Protection des données */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FaShieldAlt className="text-primary" />
                  Protection des données personnelles
                </h4>
                <p className="text-gray-700 mb-4">
                  Les informations recueillies via le formulaire de contact ou de commande sont destinées à la gestion de la relation commerciale.
                </p>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h5 className="font-semibold text-yellow-900 mb-2">Vos droits RGPD :</h5>
                  <p className="text-yellow-800 text-sm mb-3">
                    Conformément à la loi « Informatique et Libertés », vous disposez d&apos;un droit d&apos;accès, 
                    de rectification, de suppression et d&apos;opposition sur vos données personnelles.
                  </p>
                  <p className="text-yellow-800 text-sm">
                    <strong>Pour exercer ce droit :</strong>{' '}
                    <a href="mailto:contact.boostacarriere@gmail.com" className="underline hover:text-yellow-900">
                      contact.boostacarriere@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Propriété intellectuelle */}
          <div id="propriete" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FaCopyright className="text-primary" />
              Propriété intellectuelle
            </h2>
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Protection des contenus</h3>
                  <p className="text-gray-700 mb-4">
                    Tous les éléments du site (textes, images, logos, etc.) sont protégés par les droits d&apos;auteur. 
                    Toute reproduction, modification, distribution ou exploitation de ces éléments sans autorisation préalable 
                    est strictement interdite.
                  </p>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Attention :</strong> La reproduction non autorisée de tout ou partie de ce site 
                      est formellement interdite et constitue une contrefaçon.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Marques et logos</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Le nom "Boostacarriere" est une marque déposée</li>
                    <li>• Les logos et visuels sont protégés par le droit d&apos;auteur</li>
                    <li>• Les contenus de formation sont protégés par la propriété intellectuelle</li>
                    <li>• Toute utilisation commerciale nécessite une autorisation écrite</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 lg:px-8 bg-secondary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Des questions sur nos mentions légales ?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Notre équipe est là pour vous accompagner
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-secondary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Nous contacter
            </Link>
            <Link 
              href="/cgv" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-secondary transition-colors duration-300"
            >
              Voir nos CGV
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
