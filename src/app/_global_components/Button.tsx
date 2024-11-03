'use client';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';

export default function Button({ type, children, style, className, onClick, link }: {type: 'link' | 'button' | 'back', children: React.ReactNode; style: 'light' | 'dark' | 'secondary' | 'primary' | 'white' , className?: string, onClick?: () => void, link?: string}) {
  let bgStyle = '';

  switch (style) {
    case 'light':
      bgStyle = 'bg-light border border-transparent text-secondary hover:bg-transparent hover:border-light hover:text-light';
      break;
    case 'dark':
      bgStyle = 'bg-black text-white';
      break;
    case 'white':
    bgStyle = 'bg-white  text-secondary ';
      break;
    case 'secondary':
      bgStyle = 'bg-secondary text-primary border border-transparent hover:bg-transparent hover:border-secondary';
      break;
    case 'primary':
      bgStyle = 'bg-primary text-secondary border border-transparent hover:bg-transparent hover:border-primary';
      break;
    default:
      bgStyle = '';
  }
  if(type === 'button' || type === 'back'){
    return (
      <button onClick={type === 'back' ? () => Router.back() : onClick} className={`${bgStyle || undefined} ${className} px-3 py-1 rounded-md`}>
        {children}
      </button>
    );
  } else if(type === 'link' && link){
    return (
      <Link href={link} className={`${bgStyle || undefined} ${className} px-3 py-1 rounded-md`}>
        {children}
      </Link>
    );
  }
  
}
