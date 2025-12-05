'use client'
import React, { useState } from 'react'
import ShadowSection from '../_components/ShadowSection'
import SectionTitle from '../_components/SectionTitle'
import Image from 'next/image'
import { Include } from '@/interface/ICoaching'

export default function Summary({includes = []}: {includes?: Include[]}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className='md:grid grid-cols-3 gap-4 max-md:shadow-lg max-md:bg-white max-md:dark:bg-slate-800 max-md:dark:text-white max-md:rounded-lg items-start '>
          <Image 
            src="https://firebasestorage.googleapis.com/v0/b/boostacarriere-2679a.appspot.com/o/ebooks%2Fsummary-5points.png?alt=media&token=857503f0-9695-4c91-bb98-388227abfc1c" 
            alt='sommaire du ebook' 
            width={500} 
            height={500}  
            className='max-[500px]:shadow-lg md:shadow-lg max-[500px]:rounded-t-lg md:rounded-lg col-span-1 mx-auto cursor-pointer hover:opacity-90 transition-opacity'
            onClick={() => setIsModalOpen(true)}
          />
          <ShadowSection className='col-span-2 max-md:rounded-none max-md:rounded-b-lg max-md:max-w-[500px] max-md:mx-auto min-[500px]:shadow-none md:shadow-lg h-full' marge={false}>
              <SectionTitle title='Que contient cet ebook ?'  />
              <ul className='list-disc px-4 my-2'>
                {includes.map((include, idx) => (
                  <li key={idx}>{include.title}</li>
                ))}
              </ul>
          </ShadowSection>
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-4xl w-full h-full">
            <button 
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <Image 
              src="https://firebasestorage.googleapis.com/v0/b/boostacarriere-2679a.appspot.com/o/ebooks%2Fsummary-5points.png?alt=media&token=857503f0-9695-4c91-bb98-388227abfc1c" 
              alt='sommaire du ebook' 
              width={2000} 
              height={2000}  
              className='w-full h-full rounded-lg object-contain'
            />
          </div>
        </div>
      )}
    </>
  )
}
