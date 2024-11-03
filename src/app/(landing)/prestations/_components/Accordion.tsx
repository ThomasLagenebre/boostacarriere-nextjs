'use client';
import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io';

export default function Accordion() {
  return (
    <div>
        <ul className='my-4'>
            {PlanData.slice(0,4).map((chapter, idx) => (
              <AccordionItem key={idx} data={chapter}/>
            ))}
        </ul>
        <a className='underline cursor-pointer'>Voir la suite de la formation...</a>
    </div>
  )
}

const AccordionItem = ({data}: {data: { title: string; duration: number; lessons: string[]}}) => { 
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <button className='bg-secondary flex items-center justify-between w-full text-white px-4 py-2' onClick={() => setIsOpen(!isOpen)}>
                <p className='flex items-center gap-2'><IoIosArrowForward className={`${isOpen && 'rotate-90'}`}/>{data.title}</p>
                <p>{data.lessons.length} leçons - 00H{data.duration}</p>
            </button>
            <ul className={`${!isOpen && 'hidden'} px-8 py-4 text-gray-400`}>
                {data.lessons.slice(0,5).map((lesson, idx) => (
                  <li key={idx} className='flex items-center gap-2 py-2'><IoIosArrowForward/>{lesson}</li>
                ))}
            </ul>
            
        </div>
    )
}

const PlanData = [
    {
        title: 'Introduction',
        duration: 30,
        lessons: [
            'Le planning de la formation',
            'Comprendre la négociation salariale',
            "Les enjeux pour l'employé et l'employeur"
        ]
    },
    {
        title: 'Comment devenir riche',
        duration: 30,
        lessons: [
            'Youhou ça marche !',
            'Comprendre la négociation salariale',
            'Comprendre la négociation salariale',
            'Comprendre la négociation salariale',
        ]
    },
    {
        title: 'Comment devenir riche',
        duration: 30,
        lessons: [
            'Youhou ça marche !',
            'Comprendre la négociation salariale',
            'Comprendre la négociation salariale',
            'Comprendre la négociation salariale',
        ]
    },
    {
        title: 'Comment devenir riche yeah!',
        duration: 30,
        lessons: [
            'Youhou ça marche !',
            'Comprendre la négociation salariale',
            'Comprendre la négociation salariale',
            'Comprendre la négociation salariale',
        ]
    },
    {
        title: 'Comment devenir riche 550',
        duration: 30,
        lessons: [
            'Youhou ça marche !',
            'Comprendre la négociation salariale',
            'Comprendre la négociation salariale',
            'Comprendre la négociation salariale',
        ]
    }
]