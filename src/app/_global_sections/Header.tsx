"use client";
import React, { useEffect, useState } from 'react'
import Button from '../_global_components/Button';
import { IoSunny } from 'react-icons/io5';
import {  HiOutlineMenuAlt2 } from 'react-icons/hi';
import Link from 'next/link';
import NavlinkDropdown from '../_components/NavlinkDropdown';
import PrestationsNavbar from '../_components/PrestationsNavbar';
import Image from 'next/image';
import { useAuth } from '@/app/_context/AuthContext';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); 

  return (
    <header className='xl:py-6'>
      <nav className={`py-2 px-4 bg-secondary  mx-auto  flex items-center justify-between xl:flex lg:block xl:justify-between text-white z-50 ${isScroll ? 'fixed w-full top-0' : 'xl:rounded-lg max-w-screen-xl'}`}>
        <button data-collapse-toggle="navbar-cta" type="button" className={`inline-flex items-center w-10 h-10 justify-center lg:hidden`} onClick={() => setIsOpen(!isOpen)}>
            <span className="sr-only">Open main menu</span>
            <HiOutlineMenuAlt2 size={"80%"} />
        </button>
        <a className='font-bold text-xl max-xl:text-center' href='/'>Boostacarriere</a>
        <ul className={`${!isOpen && 'max-lg:hidden'} max-lg:fixed top-8 left-0 w-1/2 lg:w-fit mx-auto bg-secondary z-50 max-lg:py-4 max-lg:px-4 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-20 justify-center max-xl:mt-6`}>
          <NavLink onClick={() => setIsOpen(false)} link='/'>Accueil</NavLink>
          <li>
            <NavlinkDropdown onClick={() => setOpenDropdown(!openDropdown)} label='Prestations'/>
              <div className={`z-10 ${!openDropdown ? "hidden" : "fixed"} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
                  <PrestationsNavbar />
              </div>
          </li>
          {/* <NavLink onClick={() => setIsOpen(false)} link='/'>Blog</NavLink> */}
          {/* <NavLink onClick={() => setIsOpen(false)} link='/'>Entreprise<span className="bg-blue-100 text-blue-800 text-xs font-medium ms-4 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Bientôt</span></NavLink> */}
          
          
          <NavLink onClick={() => setIsOpen(false)} link='/a-propos'>À propos</NavLink>
          <hr></hr>
          <li className='lg:hidden'><Link href='/login'>Se connecter</Link></li>
          <li className='lg:hidden'><a href='/contact'>Contacte-moi</a></li>
        </ul>
        <div className='max-lg:hidden flex items-center gap-4 max-xl:fixed max-xl:top-2 max-xl:right-4'>
          <Button type='button' onClick={() => {document.body.classList.toggle("dark")}} style='light'><IoSunny size={'20'}/></Button>
          {user ? (
            <>
            <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" onClick={() => {setOpenUserMenu(!openUserMenu)}}>
            <span className="sr-only">Open user menu</span>
            <Image 
              className="w-8 h-8 rounded-full"
              src="https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
              alt="user photo"
              width={32}
              height={32}
            />
            </button>
            <div className={`z-50 ${openUserMenu ? "fixed" : "hidden"} my-4 top-14 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">{user.firstname} {user.lastname}</span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</Link>
              </li>
              <li>
                <button onClick={logout} className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
              </li>
            </ul>
          </div>
          </>
          ) : (
            <>
              <Button type='link' style='light' className='font-[500]' link='/login'>Se connecter</Button>
              <Button type='link' style='primary' className='font-[500] hover:text-light' link='/contact'>Contacte-moi</Button>
            </>
          )}
          
        </div>
        <Button type='button' onClick={() => {document.body.classList.toggle("dark")}} style='light' className='lg:hidden'><IoSunny size={'20'}/></Button>
      </nav>
    </header>
    
  )
}

export default Header

const NavLink = ({children, link, onClick}: {children: React.ReactNode, link: string, onClick?: React.MouseEventHandler<HTMLAnchorElement>}) => {
  return <li className='border-b lg:border-b-2 py-2 border-transparent hover:border-white'><Link href={link} onClick={onClick}>{children}</Link></li>
}

