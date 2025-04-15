'use client';
import React, { useState } from 'react'
import ReviewContener from './ReviewContener'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'
import allReviews from '../_data/allReviews'

export default function ReviewsSlider() {
  const [idxReview, setIdxReview] = useState(0);

  const handleNext = () => {
    setIdxReview((prev) => (prev < allReviews.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIdxReview((prev) => (prev > 0 ? prev - 1 : allReviews.length - 1));
  };
  return (
    <div className='bg-white shadow-lg border-t border-gray-100 dark:border-transparent dark:bg-slate-700 dark:text-white md:w-3/4 md:mx-auto px-10 py-6 rounded-lg my-8'>
        <ReviewContener profilePicture={allReviews[idxReview].profilePicture} username={allReviews[idxReview].username} job={allReviews[idxReview].job} review={allReviews[idxReview].review}/>
        <div className='flex justify-end mt-6'>
            <div className='flex items-center gap-2'>
                <FaArrowAltCircleLeft size={25} className='fill-secondary cursor-pointer dark:fill-primary' onClick={handlePrev}/>
                <FaArrowAltCircleRight size={25} className='fill-secondary cursor-pointer dark:fill-primary' onClick={handleNext}/>
            </div>
        </div>
        
    </div>
  )
}
