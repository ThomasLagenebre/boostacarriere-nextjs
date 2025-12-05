'use client';
import { useAuth } from '@/app/_context/AuthContext';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { FaBook, FaHome, FaUser } from 'react-icons/fa'
import { HiMenuAlt2 } from 'react-icons/hi'
import { IoMdExit, IoMdSettings } from 'react-icons/io'
import { MdOutlineEmail, MdVideoCall } from 'react-icons/md'
import { PiStudentFill } from 'react-icons/pi'
import { PermissionGuard } from '@/app/_components/PermissionGuard'
import Link from 'next/link'
import { IoSunny } from 'react-icons/io5';
import { logout } from '@/app/_data/auth';

export default function Sidebar() {
   const sidebarRef = useRef<HTMLDivElement>(null);
   const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
   const { user} = useAuth();
   const [isDark, setIsDark] = useState(() => {
     if (typeof window !== 'undefined') {
       return document.documentElement.classList.contains('dark');
     }
     return false;
   });

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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
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
          <button type='button' onClick={() => {document.body.classList.toggle("dark")}} className='flex w-full items-center bg-transparent gap-4 cursor-pointer border border-transparent hover:border-secondary hover:text-secondary text-secondary rounded-md p-2'><IoSunny /> Darkmode</button>
          <Link 
            href="/dashboard/settings" 
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
  const isExternalLink = link.startsWith('http');
  
  return (
    <li>
      {isExternalLink ? (
        <a 
          href={link} 
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center cursor-pointer gap-3 rounded-md p-2 hover:bg-light hover:shadow-lg`}
        >
          {icon}{label}
        </a>
      ) : (
        <Link 
          href={link} 
          className={`flex items-center cursor-pointer gap-3 rounded-md p-2 hover:bg-light hover:shadow-lg ${isActive && "border shadow-lg"}`}
        >
          {icon}{label}
        </Link>
      )}
    </li>
  )
}


const DashboardPages = [
  {
    label: 'Tableau de bord',
    link: '/dashboard',
    icon: <FaHome size={18}/>,
    permission: 'view_dashboard'
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
    link: '/dashboard/ebooks',
    icon: <FaBook size={18}/>,
    permission: 'view_ebooks'
  },
  {
    label: 'Utilisateurs',
    link: '/dashboard/users',
    icon: <FaUser size={18}/>,
    permission: 'view_users'
  },
  {
    label: 'Newsletter',
    link: 'https://app.brevo.com/marketing-campaign/campaign-setup',
    icon: <MdOutlineEmail size={18}/>,
    permission: 'view_newsletter'
  }

]