import React from 'react'
import { FaCheck, FaPen } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import SectionsHead from '../_components/SectionsHead'
import { MdWork } from 'react-icons/md'

export default function ToolsTuto() {
  return (
    <section className='my-32'>
        <SectionsHead title='Faciliter ta recherche d&apos;emploi' description='Utilise un outil tout-en-un qui te permettra de suivre l’avancé de ta recherche d’emploi et te donnera des conseils personnalisés.'/>
        <div className='flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-20 my-10 max-xl:px-6'>
            <div className='flex flex-col justify-between gap-10 h-full'>
                <div>
                    <div className='text-secondary flex items-center gap-5 font-bold dark:text-primary'>
                        <div className='border border-secondary dark:border-primary w-10 h-10 rounded-xl flex items-center justify-center'><MdWork size={20}/></div>
                        <p>Trouvez un emploi</p>
                    </div>
                    <h3 className='text-xl font-semibold mt-2 dark:text-light'>Être organisé pour trouver</h3>
                    <p className='dark:text-light'>Un fichier qui te permettra de suivre l’avancé de ta recherche d’emploi, de te donner des conseils pour tes candidatures mais également pour tes entretiens d’embauche.  </p>
                </div>
                <div className='flex flex-col gap-8 lg:flex-row lg:items-center'>
                    <div className='lg:w-1/2 dark:text-light'>
                        <FaCheck size={18} className='fill-secondary dark:fill-primary mb-3'/>
                        <h4 className='font-semibold'>Checklist</h4>
                        <p className='text-justify'>Pour ne rien oublier avant l&apos;entretien d&apos;embauche mais également après avec en bonus des templates de mails pour ta candidature et pour tes remerciements. </p>
                        <a className='flex items-center gap-4 mt-5 font-semibold underline'>En savoir plus <IoIosArrowForward /></a>
                    </div>
                    <div className='lg:w-1/2 dark:text-light'>
                        <FaPen size={18} className='fill-secondary dark:fill-primary mb-3'/>
                        <h4 className='font-semibold'>Suivi détaillé</h4>
                        <p className='text-justify'>Des espaces pour mémoriser chaque information importante de ta candidature et pour préparer tes entretiens d&apos;embauche, jusqu&apos;à un espace pour une auto-évaluation. </p>
                        <a className='flex items-center gap-4 mt-5 font-semibold underline'>En savoir plus <IoIosArrowForward /></a>
                    </div>
                </div>
            </div>
            
            <div className='bg-orange-100 w-full sm:w-3/4 md:w-1/2 mx-auto lg:w-full h-[400px] rounded-xl'></div>
        </div>
    </section>
  )
}
