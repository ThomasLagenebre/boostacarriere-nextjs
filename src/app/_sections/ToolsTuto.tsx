import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { FaUserGroup } from 'react-icons/fa6'
import { IoIosArrowForward } from 'react-icons/io'
import SectionsHead from '../_components/SectionsHead'

export default function ToolsTuto() {
  return (
    <section className='my-32'>
        <SectionsHead title='Faciliter ta recherche d&apos;emploi' description='Utilise un outil tout-en-un qui te permettra de suivre l’avancé de ta recherche d’emploi et te donnera des conseils personnalisés directement sur Boostacarriere'/>
        <div className='flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-20 my-10 max-xl:px-6'>
            <div className='flex flex-col justify-between gap-10 h-full'>
                <div>
                    <div className='text-secondary flex items-center gap-5 font-bold dark:text-primary'>
                        <div className='border border-secondary dark:border-primary w-10 h-10 rounded-xl flex items-center justify-center'><FaUsers size={20}/></div>
                        <p>Trouvez un emploi</p>
                    </div>
                    <h3 className='text-xl font-semibold mt-2 dark:text-light'>Être organisé pour trouver</h3>
                    <p className='dark:text-light'>Drime est votre espace unique pour la collaboration de contenu entre équipe ou pour vos besoins personnels. Arrêtez d&apos;utiliser des dizaines d&apos;outils différents, Drime rassemble plusieurs outils en un seul endroit, vous permettant d&apos;économiser beaucoup de ressources.</p>
                </div>
                <div className='flex flex-col gap-8 lg:flex-row lg:items-center'>
                    <div className='lg:w-1/2 dark:text-light'>
                        <FaUserGroup size={20} className='fill-secondary dark:fill-primary mb-3'/>
                        <h4 className='font-semibold'>Tes démarches</h4>
                        <p>Collaborez efficacement avec vos collègues et vos clients, en veillant à ce que vos informations soient sécurisées</p>
                        <a className='flex items-center gap-4 mt-5 font-semibold underline'>En savoir plus <IoIosArrowForward /></a>
                    </div>
                    <div className='lg:w-1/2 dark:text-light'>
                        <FaUserGroup size={20} className='fill-secondary dark:fill-primary mb-3'/>
                        <h4 className='font-semibold'>Tes démarches</h4>
                        <p>Collaborez efficacement avec vos collègues et vos clients, en veillant à ce que vos informations soient sécurisées</p>
                        <a className='flex items-center gap-4 mt-5 font-semibold underline'>En savoir plus <IoIosArrowForward /></a>
                    </div>
                </div>
            </div>
            
            <div className='bg-orange-100 w-full sm:w-3/4 md:w-1/2 mx-auto lg:w-full h-[400px] rounded-xl'></div>
        </div>
    </section>
  )
}
