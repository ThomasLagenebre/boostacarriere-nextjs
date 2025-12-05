import React from 'react'
import SectionTitle from '../_components/SectionTitle'
import ReviewsSlider from '@/app/_global_components/ReviewsSlider'
import ShadowSection from '../_components/ShadowSection'
import { Category } from '@/interface/ICoaching'

export default function Reviews({categoryName, productId}: {categoryName?: string, productId?: number}) {
  const getPreposition = (category: string | undefined) => {
    if (!category) return 'du';
    
    const categoryLower = category.toLowerCase();
    if (categoryLower === 'formations') return 'de la formation';
    if (categoryLower === 'ebooks') return 'du ebook';
    if (categoryLower === 'coaching') return 'du coaching';
    return '';
  };

  return (
    <ShadowSection>
        <SectionTitle title={`Ce qu'ils ont pensé ${categoryName ? `${getPreposition(categoryName)}` : 'de la prestation'}`}/>
        <ReviewsSlider productId={productId} />
    </ShadowSection>
  )
}
