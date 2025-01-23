import React from 'react'
import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import Image from 'next/image'
import { MdDeleteOutline, MdOutlineRemoveRedEye } from 'react-icons/md'
import { FaLongArrowAltLeft, FaRegEdit } from 'react-icons/fa'
import Button from '@/app/_global_components/Button'
import { CiSquarePlus } from 'react-icons/ci'
import { useRouter } from 'next/navigation'
import DashboardSection from '@/app/dashboard/_components/DashboardSection'

export default function page() {
    const allLessons: {
        title: string
        img: string
        presentation: string
      }[] = [
        {
            title: 'Le planning de la formation',
            img: 'https://firebasestorage.googleapis.com/v0/b/boostacarriere-2679a.appspot.com/o/files%2FIMG_0622.jpg?alt=media&token=0cd5f6df-f0e1-4fb4-af87-e612dd969c78',
            presentation: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, exercitationem enim iusto sequi corporis molestias voluptas iure, placeat excepturi dolores nostrum atque distinctio'
        },
        {
            title: 'La deuxième leçon',
            img: 'https://firebasestorage.googleapis.com/v0/b/boostacarriere-2679a.appspot.com/o/files%2FIMG_0622.jpg?alt=media&token=0cd5f6df-f0e1-4fb4-af87-e612dd969c78',
            presentation: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, exercitationem enim iusto sequi corporis molestias voluptas iure, placeat excepturi dolores nostrum atque distinctio'
        },
    ]
  return (
    <>
        <DashboardSection className='flex items-center justify-between'>
            <SectionTitle  title='Chapitre 1 : Introduction'/>
            <Button className='text-white hover:text-secondary flex items-center gap-4' type='link' style='secondary' link='/dashboard/formations/'><FaLongArrowAltLeft />Retour vers la formation</Button>
        </DashboardSection>
        <DashboardSection>
            <a
                href='/dashboard/coachings/add-lesson'
                className="flex items-center gap-2 mt-4" 
            >
                <CiSquarePlus size={40} className='text-secondary' />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Ajouter une leçon</span>
            </a>
            {allLessons.map((lesson, idx) => (
              <LessonItem key={idx} idx={idx} title={lesson.title} img={lesson.img} presentation={lesson.presentation}/>
            ))}
            
        </DashboardSection>
        
    </>
  )
}

const LessonItem = ({title, img,presentation, idx}: {title: string, img:string, presentation: string, idx: number}) => {
    return (
      <div className='flex items-center gap-4 border rounded-md my-4'>
        <div className='w-1/6 h-full relative'>
            <Image className='rounded-l-md ' alt='Présentation chapitre' width={300} height={300} src={img} />
            <p className='absolute top-0 left-0 bg-secondary w-5 h-5 text-white font-bold text-center rounded-tl-md text-xs flex justify-center items-center'>{idx + 1}</p>
        </div>
        
        <div className='w-4/6'>
            <h4 className='font-bold text-lg'>{title}</h4>
            <p>{presentation}</p>
        </div>
        <div className='w-1/6 flex items-center gap-4 justify-center'>
            <a className='cursor-pointer'><MdOutlineRemoveRedEye size={22} className='text-green-500'/></a>
            <a className='cursor-pointer' href='/dashboard/formations/add-lesson'><FaRegEdit size={18} className='text-secondary'/></a>
            <a className='cursor-pointer'><MdDeleteOutline size={22} className='text-red-400'/></a>
        </div>
      </div>
    )
  }