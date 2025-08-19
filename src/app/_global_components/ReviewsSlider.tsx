'use client';
import React, { useState, useEffect } from 'react'
import ReviewContener from './ReviewContener'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'
import { fetchReviews, Review, ProductReview} from '@/app/_data/fetchReviews'
import Skeleton from '@/app/_global_components/Skeleton'

export default function ReviewsSlider({ productId }: { productId?: number }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [idxReview, setIdxReview] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews(productId)
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [productId]);

  const handleNext = () => {
    setIdxReview((prev) => (prev < reviews.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIdxReview((prev) => (prev > 0 ? prev - 1 : reviews.length - 1));
  };

  const isProductReview = (review: Review): review is ProductReview => {
    return 'comment' in review && 'rate' in review;
  };

  if (loading) return <Skeleton rows={2} columns={1} isTable={false} />;
  if (error) return <div className='bg-white shadow-lg border-t border-gray-100 dark:border-transparent dark:bg-slate-700 dark:text-white md:w-3/4 md:mx-auto px-10 py-6 rounded-lg my-8 text-red-500'>{error}</div>;
  if (!reviews.length) return <div className='bg-white shadow-lg border-t border-gray-100 dark:border-transparent dark:bg-slate-700 dark:text-white md:w-3/4 md:mx-auto px-10 py-6 rounded-lg my-8'>Aucun avis disponible</div>;
  if (!reviews.length) return <div className='bg-white shadow-lg border-t border-gray-100 dark:border-transparent dark:bg-slate-700 dark:text-white md:w-3/4 md:mx-auto px-10 py-6 rounded-lg my-8'>Aucun avis disponible</div>;

  const currentReview = reviews[idxReview];

  return (  
    <div className='bg-white shadow-lg border-t border-gray-100 dark:border-transparent dark:bg-slate-700 dark:text-white md:w-3/4 md:mx-auto px-10 py-6 rounded-lg my-8'>
        {isProductReview(currentReview) ? (
          <ReviewContener 
            profilePicture="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" 
            username={`${currentReview.user.firstname} ${currentReview.user.lastname}`} 
            job={`Note: ${currentReview.rate}/5`} 
            review={currentReview.comment}
            productName={currentReview.product.title}
          />
        ) : null}
        <div className='flex justify-end mt-6'>
            <div className='flex items-center gap-2'>
                <FaArrowAltCircleLeft size={25} className='fill-secondary cursor-pointer dark:fill-primary' onClick={handlePrev}/>
                <FaArrowAltCircleRight size={25} className='fill-secondary cursor-pointer dark:fill-primary' onClick={handleNext}/>
            </div>
        </div>
        
    </div>
  )
}
