'use client';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SwitchButton from '../_components/SwitchButton'
import Login from './Login';
import Signup from './Signup';

export default function Module() {
    const [wantTo, setWantTo] = useState('connect');
    const windowWidth = window.innerWidth;
  return (
    <div className='bg-white shadow-md h-fit xl:py-10 relative'>
        {wantTo === 'connect' && <div className='max-lg:hidden bg-secondary lg:w-1/2 h-full absolute top-0 left-0 z-0'></div>}
        {wantTo === 'register' && <div className='max-lg:hidden bg-secondary lg:w-1/2 h-full absolute top-0 right-0 z-0'></div>}
        <div className='relative z-10'>
            <div className={`flex items-center ps-6 max-lg:bg-secondary gap-6 ${wantTo === 'connect' || windowWidth < 1024 ? '' : 'translate-x-1/2'}`}>
                <Image alt='logo boostacarriere' src="https://firebasestorage.googleapis.com/v0/b/boostacarriere-2679a.appspot.com/o/logo%2Flogo-simpl.png?alt=media&token=f0a86c7d-c208-49af-a8de-693b2f1a7c7f" width={100} height={100}/>
                <h2 className='text-2xl lg:text-lg xl:text-xl font-bold text-white'>Boostacarriere</h2>
            </div>
            <SwitchButton setter={setWantTo} state={wantTo}/>
            {wantTo === 'connect' && <Login />}
            {wantTo === 'register' && <Signup />}
        </div>
        

        
</div>

  )
}
