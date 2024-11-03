import React from 'react'
import ReviewContener from './ReviewContener'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'

export default function ReviewsSlider() {
  return (
    <div className='bg-white shadow-lg border-t border-gray-100 dark:border-transparent dark:bg-slate-700 dark:text-white md:w-3/4 md:mx-auto px-10 py-6 rounded-lg my-8'>
        <ReviewContener />
        <div className='flex justify-end mt-6'>
            <div className='flex items-center gap-2'>
                <FaArrowAltCircleLeft size={25} className='fill-secondary cursor-pointer dark:fill-primary'/>
                <FaArrowAltCircleRight size={25} className='fill-secondary cursor-pointer dark:fill-primary'/>
            </div>
        </div>
        
    </div>
  )
}
