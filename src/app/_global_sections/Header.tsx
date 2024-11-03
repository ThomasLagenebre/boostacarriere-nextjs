"use client";
import React, { useEffect, useState } from 'react'
import Button from '../_global_components/Button';
import { IoSunny } from 'react-icons/io5';
import {  HiOutlineMenuAlt2 } from 'react-icons/hi';
import Link from 'next/link';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

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
          <NavLink onClick={() => setIsOpen(false)} link='/prestations'>Prestations</NavLink>
          <NavLink onClick={() => setIsOpen(false)} link='/'>Blog</NavLink>
          <NavLink onClick={() => setIsOpen(false)} link='/'>À propos</NavLink>
          <hr></hr>
          <li className='lg:hidden'><Link href='/login'>Se connecter</Link></li>
          <li className='lg:hidden'><a href='/login'>Contacte-moi</a></li>
        </ul>
        <div className='max-lg:hidden flex items-center gap-4 max-xl:fixed max-xl:top-2 max-xl:right-4'>
          <Button type='button' onClick={() => {document.body.classList.toggle("dark")}} style='light'><IoSunny size={'20'}/></Button>
          <Button type='link' style='light' className='font-[500]' link='/login'>Se connecter</Button>
          <Button type='link' style='primary' className='font-[500] hover:text-light' link='/login'>Contacte-moi</Button>
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