"use client";
import React, { useEffect, useState } from 'react'
import Button from '../_global_components/Button';
import { IoSunny } from 'react-icons/io5';
import {  HiOutlineMenuAlt2 } from 'react-icons/hi';
import Link from 'next/link';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openCoachingDropdown, setOpenCoachingDropdown] = useState (false);
  const [openFormationsDropdown, setOpenFormationsDropdown] = useState (false);

  

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, ); 

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
            <NavLinkDropdown onClick={() => setOpenDropdown(!openDropdown)} label='Prestations'/>
              <div className={`z-10 ${!openDropdown ? "hidden" : "fixed"} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <NavLinkDropdown onClick={() => setOpenCoachingDropdown(!openCoachingDropdown)} label='Coachings' className='ps-4'/>
                      <div className={`z-10 ${!openCoachingDropdown && "hidden"} bg-white w-44 dark:bg-gray-700`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                          <ItemLinkDropdown link='/' label='Premier test'/>
                          <ItemLinkDropdown link='/' label='Premier test'/>
                          <ItemLinkDropdown link='/' label='Premier test'/>
                        </ul>
                      </div>
                  <NavLinkDropdown onClick={() => setOpenFormationsDropdown(!openFormationsDropdown)} label='Formations' className='ps-4'/>
                      <div className={`z-10 ${!openFormationsDropdown && "hidden"} bg-white divide-y divide-gray-100  w-44 dark:bg-gray-700`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                          <ItemLinkDropdown link='/formations/negocie-ton-salaire-efficacement' label='Premier test'/>
                          <ItemLinkDropdown link='/formations/negocie-ton-salaire-efficacement' label='Premier test'/>
                          <ItemLinkDropdown link='/formations/negocie-ton-salaire-efficacement' label='Premier test'/>
                        </ul>
                      </div>
                  </ul>
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
          <Button type='link' style='light' className='font-[500]' link='/login'>Se connecter</Button>
          <Button type='link' style='primary' className='font-[500] hover:text-light' link='/contact'>Contacte-moi</Button>
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

const NavLinkDropdown = ({onClick, className, label}: {onClick: () => void, className?: string, label: string}) => {
  return (
    <button onClick={onClick} className={`${className} border-b lg:border-b-2 py-2 border-transparent hover:border-white flex items-center justify-center`}>
      {label}
      <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/></svg>
    </button>
)
}

const ItemLinkDropdown = ({link, className, label}: {link: string, className?: string, label:string}) => {
  return (
    <li>
      <a href={link} className={`${className} block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`}>{label}</a>
    </li>
  )
}

