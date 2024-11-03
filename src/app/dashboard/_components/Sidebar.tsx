import Image from 'next/image'
import React from 'react'
import { AiFillFileText } from 'react-icons/ai'
import { FaBook, FaHome, FaUser } from 'react-icons/fa'
import { GrArticle } from 'react-icons/gr'
import { IoMdExit, IoMdSettings } from 'react-icons/io'
import { MdVideoCall } from 'react-icons/md'
import { PiStudentFill } from 'react-icons/pi'

export default function Sidebar() {
  return (
    <div className='h-screen sticky top-0 min-w-[250px] w-1/6 bg-white shadow-lg px-4 py-6 flex flex-col justify-between'>
      <div>
        <a className='font-bold text-xl max-xl:text-center text-secondary' href='/'>Boostacarriere</a>
        <div className='flex items-center gap-4 my-3'>
          <Image src='https://firebasestorage.googleapis.com/v0/b/boostacarriere-2679a.appspot.com/o/files%2FIMG_0622.jpg?alt=media&token=0cd5f6df-f0e1-4fb4-af87-e612dd969c78' alt='profile' width={200} height={200} className='rounded-full object-cover w-12 h-12'/>
          <div>
            <p className='font-semibold'>Laurine JANCZAK</p>
            <p className='text-xs'>Administrateur</p>
          </div>
        </div>
        <input placeholder='Recherche' className='border rounded-md py-1 px-3 w-full my-3 text-xs'/>
        <ul className='my-6 flex flex-col gap-2'>
          {DashboardPages.map((item, idx) => (
            <SidebarItems key={idx} label={item.label} link={item.link} icon={item.icon}/>
          ))}
          
        </ul>
      </div>
      <div>
        <a className='flex items-center gap-4 cursor-pointer border border-transparent hover:border-secondary text-secondary rounded-md p-2'><IoMdSettings /> Paramètres</a>
        <a href='/' className='flex items-center gap-4 cursor-pointer border border-transparent hover:border-secondary text-secondary rounded-md p-2'><IoMdExit /> Retour vers le site</a>
      </div>
  </div>
  )
}

const SidebarItems = ({label, link, icon}: {label: string, link: string, icon: JSX.Element}) => {
  return (
    <li><a className='flex items-center cursor-pointer gap-3 rounded-md p-2 hover:bg-light' href={link}>{icon}{label}</a></li>
  )
}


const DashboardPages = [
  {
    label: 'Tableau de bord',
    link: '/dashboard',
    icon: <FaHome size={18}/>
  },
  {
    label: 'Coachings',
    link: '/dashboard/coachings',
    icon: <MdVideoCall size={18}/>
  },
  {
    label: 'Formations',
    link: '/dashboard',
    icon: <PiStudentFill size={18}/>
  },
  {
    label: 'Ebooks',
    link: '/dashboard',
    icon: <FaBook size={18}/>
  },
  {
    label: 'Utilisateurs',
    link: '/dashboard',
    icon: <FaUser size={18}/>
  },
  {
    label: 'Blog',
    link: '/dashboard',
    icon: <GrArticle size={18}/>
  },
  {
    label: 'Gestion du site',
    link: '/dashboard',
    icon: <AiFillFileText size={18}/>
  },
]