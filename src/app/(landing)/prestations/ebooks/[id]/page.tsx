import React from 'react'
import { fetchEbookById } from '@/app/_data/fetchEbookById'
import { notFound } from 'next/navigation'
import CurrentProblems from '../../_sections/CurrentProblems';
import Description from '../../_sections/Description';
import Gains from '../../_sections/Gains';
import Summary from '../../_sections/Summary';
import Suggestions from '../../_sections/Suggestions';
import ScrollUp from '../../_components/ScrollUp';
import Hero from '../../_sections/Hero';
import Reviews from '../../_sections/Reviews';

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  try {
    const currentProduct = await fetchEbookById(id);
    
    if (!currentProduct) {
      return notFound();
    }

    return (
      <main className="mx-auto max-w-screen-xl max-xl:px-2">
        <div className="relative">
          <Hero
            title={currentProduct.title}
            category={currentProduct.category}
            description={currentProduct.description}
            rate={currentProduct.rate}
            img={currentProduct.picture}
            price={parseInt(currentProduct.price)}
            promotion={currentProduct.promotion}
            limitPromotion={currentProduct.limitPromotion}
            reviews={currentProduct.reviews}
            id={currentProduct.id}
          />
        </div>
        <div className="flex gap-8 mt-8">
          <div className="xl:max-w-[800px] flex-1">
            {currentProduct.currentProblems && (
              <CurrentProblems currentProblems={currentProduct.currentProblems} />
            )}
            {currentProduct.category.name !== undefined && (
              <Reviews categoryName={currentProduct.category.name} />
            )}
            {currentProduct.gains && <Gains gains={currentProduct.gains} />}
            <Summary includes={currentProduct.includes}/>
            {currentProduct.suggestions && (
              <Suggestions suggestions={currentProduct.suggestions} />
            )}
          </div>
        </div>
        <ScrollUp />
      </main>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}