import React from 'react'
import Image from 'next/image'
import { FaRocket, FaUsers, FaLightbulb, FaAward, FaHeart, FaCheckCircle } from 'react-icons/fa'
import { MdTrendingUp, MdSecurity } from 'react-icons/md'

export default function AboutPage() {
  const stats = [
    { number: '500+', label: 'Personnes accompagnées' },
    { number: '95%', label: 'Taux de satisfaction' },
    { number: '50+', label: 'Formations créées' },
    { number: '3', label: 'Années d\'expérience' }
  ]

  const values = [
    {
      icon: <FaRocket className="text-4xl text-primary" />,
      title: 'Innovation',
      description: 'Nous repoussons constamment les limites pour offrir des solutions créatives et efficaces.'
    },
    {
      icon: <FaUsers className="text-4xl text-secondary" />,
      title: 'Collaboration',
      description: 'Nous croyons en la force du travail d&apos;équipe et de l&apos;entraide pour atteindre l&apos;excellence.'
    },
    {
      icon: <FaLightbulb className="text-4xl text-primary" />,
      title: 'Excellence',
      description: 'Nous visons l&apos;excellence dans chaque projet, chaque formation et chaque accompagnement.'
    },
    {
      icon: <FaHeart className="text-4xl text-secondary" />,
      title: 'Passion',
      description: 'Notre passion pour le développement personnel et professionnel nous pousse à toujours faire mieux.'
    }
  ]

  const team = [
    {
      name: 'Laurine',
      role: 'Fondatrice & Coach',
      image: '/team-laurine.jpg',
      description: 'Spécialiste en développement de carrière avec plus de 10 ans d&apos;expérience dans l&apos;accompagnement professionnel.'
    },
    {
      name: 'Thomas',
      role: 'Expert Formation',
      image: '/team-thomas.jpg',
      description: 'Formateur certifié passionné par la transmission de connaissances et l&apos;innovation pédagogique.'
    }
  ]

  const testimonials = [
    {
      name: 'Marie D.',
      role: 'Développeuse Senior',
      content: 'Grâce à Boostacarriere, j\'ai pu reprendre confiance en moi et décrocher le poste de mes rêves. Un accompagnement exceptionnel !',
      rating: 5
    },
    {
      name: 'Alexandre L.',
      role: 'Chef de Projet',
      content: 'Les formations sont de qualité et très pratiques. J\'ai pu appliquer directement les concepts dans mon travail quotidien.',
      rating: 5
    },
    {
      name: 'Sophie M.',
      role: 'Manager',
      content: 'Un coaching personnalisé qui m\'a permis de développer mes compétences de leadership. Je recommande vivement !',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-secondary opacity-95"></div>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center text-white">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            À Propos de Nous
          </h1>
          <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Nous transformons les carrières et développons les talents depuis 2021. 
            Notre mission : propulser chaque personne vers son plein potentiel.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Notre Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Chez Boostacarriere, nous croyons que chaque personne mérite d&apos;évoluer dans une carrière 
                qui lui correspond et qui la passionne. Notre approche personnalisée combine expertise, 
                innovation et bienveillance pour créer des parcours de réussite uniques.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nous accompagnons les professionnels à chaque étape de leur développement : 
                reconversion, évolution, prise de poste, ou simplement l&apos;envie de progresser.
              </p>
            </div>
            <div className="relative">
              <div className="bg-primary rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Pourquoi nous choisir ?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-gray-200" />
                    Accompagnement personnalisé sur mesure
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-gray-200" />
                    Expertise reconnue et certifications
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-gray-200" />
                    Suivi continu et résultats garantis
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheckCircle className="text-gray-200" />
                    Communauté active et bienveillante
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident chacune de nos actions et décisions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 lg:px-8 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des experts passionnés qui mettent leur savoir-faire au service de votre réussite
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-secondary font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 leading-relaxed">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les témoignages de ceux qui ont transformé leur carrière avec nous
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaAward key={i} className="text-primary" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 lg:px-8 bg-secondary">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Prêt à transformer votre carrière ?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Rejoignez les centaines de professionnels qui ont déjà franchi le cap
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/prestations" 
              className="bg-white text-secondary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Découvrir nos prestations
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-secondary transition-colors duration-300"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}