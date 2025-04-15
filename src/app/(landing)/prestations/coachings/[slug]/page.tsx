import React, { useState } from 'react'
import { fetchCoachingBySlug } from '@/app/_data/fetchCoachingBySlug'
import { notFound } from 'next/navigation'
import Hero from '../../_sections/Hero';
import CurrentProblems from '../../_sections/CurrentProblems';
import Reviews from '@/app/_sections/Reviews';
import Gains from '../../_sections/Gains';
import Summary from '../../_sections/Summary';
import Description from '../../_sections/Description';
import Plan from '../../_sections/Plan';
import Targets from '../../_sections/Targets';
import Suggestions from '../../_sections/Suggestions';
import Coach from '../../_sections/Coach';
import ScrollUp from '../../_components/ScrollUp';

export default async function Page({ params }: { params: { slug: string } }) {

  const { slug } = params;
  

  try {
    
    const currentProduct = await fetchCoachingBySlug(slug);
    
    if (!currentProduct) {
      return (
        <main className="mx-auto max-w-screen-xl max-xl:px-2">
          <p>Produit non trouvé.</p>
        </main>
      );
    }

    

    return (
      <main className="mx-auto max-w-screen-xl max-xl:px-2">
        <Hero
          title={currentProduct.title}
          category={currentProduct.category}
          description={currentProduct.description}
          rate={currentProduct.rate}
          img={currentProduct.picture}
          price={parseInt(currentProduct.price)}
          promotion={currentProduct.promotion}
          limitPromotion={currentProduct.limitPromotion}
          includes={currentProduct.includes}
          reviews={currentProduct.reviews}
          id={currentProduct.id}
        />
        <div className="xl:max-w-[800px]">
          {currentProduct.currentProblems && (
            <CurrentProblems currentProblems={currentProduct.currentProblems} />
          )}
          <Reviews />
          {currentProduct.gains && <Gains gains={currentProduct.gains} />}
          {currentProduct.category.name === 'Ebook' && <Summary />}
          <Description />
          {currentProduct.category.name === 'Formation' && <Plan />}
          {currentProduct.targets && <Targets targets={currentProduct.targets} />}
          {currentProduct.suggestions && (
            <Suggestions suggestions={currentProduct.suggestions} />
          )}
          {currentProduct.category.name === 'Coaching' && (
            <Coach coach={currentProduct.coach} />
          )}
          {/* <Pack /> */}
        </div>
        <ScrollUp />
      </main>
    );
  } catch (error) {
    console.error(error);
    return notFound()
  }
}