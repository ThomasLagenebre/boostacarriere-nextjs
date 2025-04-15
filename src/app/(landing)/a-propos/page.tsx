import React from 'react'
import SectionTitle from '../prestations/_components/SectionTitle'
import { FaUser } from 'react-icons/fa'

function page() {
  return (
    <main className="">
      <section className='mx-auto max-w-screen-xl'>
        <SectionTitle title='À propos de moi'/>
        <div className='flex items-start'>
          <h3 className='uppercase text-3xl font-bold w-1/3'>Es-tu prêt à te dépasser ?</h3>
          <div className='w-2/3 text-justify'>
            <p>Aujourd&apos;hui, j&apos;ai décidé de partager avec toi mes connaissances et mon expertise à travers ce site. Que tu sois un pro des RH en quête de conseils et d&apos;outils pratiques, ou simplement quelqu&apos;un qui souhaite développer ses compétences et son épanouissement professionnel, tu trouveras ici des ressources adaptées à tes besoins.</p>
            <p className='mt-4'>Mon but est de t&apos;accompagner dans ton parcours professionnel, en te proposant des coachings personnalisés et des contenus pertinents pour relever les défis du monde du travail d&apos;aujourd&apos;hui.</p>
            <p className='mt-4'>N&apos;hésite pas à me contacter si tu as des questions ou besoin d&apos;informations supplémentaires. J&apos;ai hâte de pouvoir contribuer à ton succès professionnel !</p>
          </div>
        </div>
        <div className='grid grid-cols-3 my-10'>
          <div className='flex items-center gap-6 justify-between'>
            <div className='w-20 h-20 bg-secondary'></div>
            <div>
              <h3 className='font-bold text-xl'>AFFORDABLE PRICE</h3>
              <p>Lorem ipsum dolor sit amet consectetur. Lorem, ipsum.</p>
            </div>
          </div>
          <div className='flex items-center gap-6'>
            <div className='w-20 h-20 bg-secondary'></div>
            <div>
              <h3 className='font-bold text-xl'>AFFORDABLE PRICE</h3>
              <p>Lorem ipsum dolor sit amet consectetur. Lorem, ipsum.</p>
            </div>
          </div>
          <div className='flex items-center gap-6'>
            <div className='w-20 h-20 bg-secondary'></div>
            <div>
              <h3 className='font-bold text-xl'>AFFORDABLE PRICE</h3>
              <p>Lorem ipsum dolor sit amet consectetur. Lorem, ipsum.</p>
            </div>
          </div>
        </div>
        
      </section>
      <section className='relative my-6'>
        <div className='absolute inset-0 bg-[url("https://media.istockphoto.com/id/1413759521/fr/photo/femme-daffaires-noire-mature-serrant-la-main-dun-nouveau-partenaire-daffaires.jpg?s=612x612&w=0&k=20&c=tPhZ930-ZgPE3w3K11ujlkEEVrsbn87eJ85A_Up7hEw=")] bg-cover bg-center opacity-20'></div>
        <div className='relative z-10 py-10'>
          <SectionTitle title='Qui suis-je ?' className='text-center'/>
          <h3 className='uppercase text-3xl font-bold w-1/3 text-center mx-auto'>MA COMMUNAUTÉ</h3>
          <p className='text-center'>Après 3 années à passer sur les réseaux sociaux, j&apos;ai réussi à me créer une véritable communauté, qui me suit sur différents réseaux sociaux</p>
          <div className='mx-auto max-w-screen-xl my-6 flex justify-between'>
            <div className='bg-secondary p-6 w-fit flex gap-8 text-white'>
              <FaUser className='fill-white' size={40}/>
              <div className='w-0.5 border-s'></div>
              <div className='text-center'>
                <p className='text-2xl font-bold'>20K+</p>
                <p>abonnés Instagram</p>
              </div>
            </div>
            <div className='bg-secondary p-6 w-fit flex gap-8 text-white'>
              <FaUser className='fill-white' size={40}/>
              <div className='w-0.5 border-s'></div>
              <div className='text-center'>
                <p className='text-2xl font-bold'>20K+</p>
                <p>abonnés Instagram</p>
              </div>
            </div>
            <div className='bg-secondary p-6 w-fit flex gap-8 text-white'>
              <FaUser className='fill-white' size={40}/>
              <div className='w-0.5 border-s'></div>
              <div className='text-center'>
                <p className='text-2xl font-bold'>20K+</p>
                <p>abonnés Instagram</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

    </main>
  )
}

export default page