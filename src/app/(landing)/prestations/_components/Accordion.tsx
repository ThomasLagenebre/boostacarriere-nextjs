'use client';
import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io';

interface Chapter {
  id: number;
  title: string;
  lessons: {
    id: number;
    title: string;
    duration: number;
  }[];
}

interface AccordionProps {
  chapters: Chapter[];
}

export default function Accordion({ chapters }: AccordionProps) {
  return (
    <div>
        <ul className='my-4'>
            {chapters.slice(0,4).map((chapter) => (
              <AccordionItem key={chapter.id} data={chapter}/>
            ))}
        </ul>
        {chapters.length > 4 && (
          <a className='underline cursor-pointer'>Voir la suite de la formation...</a>
        )}
    </div>
  )
}

const AccordionItem = ({data}: {data: Chapter}) => { 
    const [isOpen, setIsOpen] = useState(false);
    const totalDuration = data.lessons.reduce((acc, lesson) => acc + lesson.duration, 0);
    const hours = Math.floor(totalDuration / 60);
    const minutes = totalDuration % 60;
    
    return (
        <div>
            <button className='bg-secondary flex items-center justify-between w-full text-white px-4 py-2' onClick={() => setIsOpen(!isOpen)}>
                <p className='flex items-center gap-2'><IoIosArrowForward className={`${isOpen && 'rotate-90'}`}/>{data.title}</p>
                <p>{data.lessons.length} leçons</p>
            </button>
            <ul className={`${!isOpen && 'hidden'} px-8 py-4 text-gray-400`}>
                {data.lessons.slice(0,5).map((lesson) => (
                  <li key={lesson.id} className='flex items-center gap-2 py-2'>
                    <IoIosArrowForward/>
                    {lesson.title}
                  </li>
                ))}
            </ul>
        </div>
    )
}