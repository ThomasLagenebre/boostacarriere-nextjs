import React from 'react'
import ShadowSection from '../_components/ShadowSection'
import SectionTitle from '../_components/SectionTitle'
import Image from 'next/image'

export default function Summary() {
  return (
    <div className='md:grid grid-cols-3 gap-4 max-md:shadow-lg max-md:bg-white max-md:dark:bg-slate-800 max-md:dark:text-white max-md:rounded-lg'>
        <Image src="https://firebasestorage.googleapis.com/v0/b/boostacarriere-2679a.appspot.com/o/ebooks%2Fsummary-5points.png?alt=media&token=857503f0-9695-4c91-bb98-388227abfc1c" alt='sommaire du ebook' width={500} height={500}  className='max-[500px]:shadow-lg md:shadow-lg max-[500px]:rounded-t-lg md:rounded-lg col-span-1 mx-auto'/>
        <ShadowSection className='my-0 col-span-2 max-md:rounded-none max-md:rounded-b-lg max-md:max-w-[500px] max-md:mx-auto min-[500px]:shadow-none md:shadow-lg'>
            <SectionTitle title='Que contient cet ebook ?'  />
            <ul className='list-disc px-4 my-2'>
                <li>Des stratégies de négociations</li>
                <li>Comment formuler ta demande</li>
                <li>Des conseils pour rassembler les informations essentielles</li>
                <li>Comment trouver un terrain d&apos;entente avec l&apos;employeur</li>
            </ul>
        </ShadowSection>
        
    </div>
  )
}
