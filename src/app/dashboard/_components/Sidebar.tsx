'use client';
import { useAuth } from '@/app/_context/AuthContext';
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { AiFillFileText } from 'react-icons/ai'
import { FaBook, FaHome, FaUser } from 'react-icons/fa'
import { GrArticle } from 'react-icons/gr'
import { HiMenuAlt2 } from 'react-icons/hi'
import { IoMdExit, IoMdSettings } from 'react-icons/io'
import { MdVideoCall } from 'react-icons/md'
import { PiStudentFill } from 'react-icons/pi'
import { PermissionGuard } from '@/app/_components/PermissionGuard'
import Link from 'next/link'

export default function Sidebar() {
   const sidebarRef = useRef<HTMLDivElement>(null);
   const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
   const { user, logout } = useAuth();
   // Fonction pour basculer l'état de la sidebar
   const toggleSidebar = () => setSidebarIsOpen(!sidebarIsOpen);
 
   // Fermer la sidebar en cliquant à l'extérieur
   useEffect(() => {
     const handleClickOutside = (event: MouseEvent) => {
       if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
         setSidebarIsOpen(false);
       }
     };
 
     document.addEventListener('mousedown', handleClickOutside);
     return () => document.removeEventListener('mousedown', handleClickOutside);
   }, [setSidebarIsOpen]);
    

  return (
   <>
      {/* Bouton pour ouvrir/fermer la sidebar */}
      <button onClick={toggleSidebar} className='bg-primary p-2 rounded-md fixed lg:hidden top-4 left-4 z-50'>
        <HiMenuAlt2 size={25} />
      </button>

      {/* Overlay qui assombrit l'arrière-plan */}
      {sidebarIsOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`${sidebarIsOpen ? 'fixed z-40 left-0 top-0 bottom-0' : 'hidden'} lg:flex lg:sticky lg:top-0 h-screen min-w-[250px] w-1/6 bg-white shadow-lg px-4 py-6 flex flex-col justify-between transition-transform`}
      >
        <div>
          <Link href='/' className='font-bold text-xl max-lg:ms-16 text-secondary'>
            Boostacarriere
          </Link>
          <div className='flex items-center gap-4 my-6 lg:my-3 '>
            <Image
              src='https://firebasestorage.googleapis.com/v0/b/boostacarriere-2679a.appspot.com/o/files%2FIMG_0622.jpg?alt=media&token=0cd5f6df-f0e1-4fb4-af87-e612dd969c78'
              alt='profile'
              width={200}
              height={200}
              className='rounded-full object-cover w-12 h-12'
            />
            <div>
              <p className='font-semibold'>{user?.firstname} {user?.lastname}</p>
              <p className='text-xs'>{user?.role?.name === 'User' ? 'Utilisateur' : user?.role?.name === 'Admin' ? 'Administrateur' : 'Non spécifié'}</p>
            </div>
          </div>
          <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
         <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
            </div>
            <input type="search" id="search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
         </div>
          <ul className='my-6 flex flex-col gap-2'>
            {DashboardPages.map((item, idx) => (
              <PermissionGuard key={idx} permission={item.permission}>
                <SidebarItems 
                  label={item.label} 
                  link={item.link} 
                  icon={item.icon} 
                />
              </PermissionGuard>
            ))}
          </ul>
        </div>
        <div>
          <Link 
            href="/settings" 
            className='flex items-center gap-4 cursor-pointer border border-transparent hover:border-secondary text-secondary rounded-md p-2'
          >
            <IoMdSettings /> Paramètres
          </Link>
          <Link 
            href='/' 
            className='flex items-center gap-4 cursor-pointer border border-transparent hover:border-secondary text-secondary rounded-md p-2'
          >
            <IoMdExit /> Retour vers le site
          </Link>
          <button 
            onClick={logout}
            className='flex items-center gap-4 cursor-pointer border border-transparent hover:border-red-500 text-red-500 rounded-md p-2 w-full mt-2'
          >
            <IoMdExit /> Déconnexion
          </button>
        </div>
      </div>
    </>
    
  )
}

const SidebarItems = ({label, link, icon}: {label: string, link: string, icon: JSX.Element}) => {
  const pathname = usePathname();
  const currentPath = pathname.replace("/dashboard", "");
  const isActive = currentPath === link.replace("/dashboard", "");
  
  return (
    <li>
      <Link 
        href={link} 
        className={`flex items-center cursor-pointer gap-3 rounded-md p-2 hover:bg-light hover:shadow-lg ${isActive && "border shadow-lg"}`}
      >
        {icon}{label}
      </Link>
    </li>
  )
}


const DashboardPages = [
  {
    label: 'Tableau de bord',
    link: '/dashboard',
    icon: <FaHome size={18}/>,
    permission: 'all'
  },
  {
    label: 'Coachings',
    link: '/dashboard/coachings',
    icon: <MdVideoCall size={18}/>,
    permission: 'view_coachings'
  },
  {
    label: 'Formations',
    link: '/dashboard/formations',
    icon: <PiStudentFill size={18}/>,
    permission: 'view_formations'
  },
  {
    label: 'Ebooks',
    link: '/dashboard',
    icon: <FaBook size={18}/>,
    permission: 'view_ebooks'
  },
  {
    label: 'Utilisateurs',
    link: '/dashboard',
    icon: <FaUser size={18}/>,
    permission: 'view_users'
  },
  {
    label: 'Blog',
    link: '/dashboard',
    icon: <GrArticle size={18}/>,
    permission: 'view_blog'
  },
  {
    label: 'Gestion du site',
    link: '/dashboard',
    icon: <AiFillFileText size={18}/>,
    permission: 'manage_site'
  },
]