import React, { useState } from 'react'
import { fetchCoachingBySlug } from '@/app/_data/fetchCoachingBySlug'
import { fetchAllCoachings } from '@/app/_data/fetchAllCoachings'
import { notFound } from 'next/navigation'
import { ICoaching } from '@/interface/ICoaching'
import Hero from '../../_sections/Hero';
import CurrentProblems from '../../_sections/CurrentProblems';
import Reviews from '../../_sections/Reviews';
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
    const allCoachings = await fetchAllCoachings();
    if (!currentProduct) {
      return (
        <main className="mx-auto max-w-screen-xl max-xl:px-2">
          <p>Produit non trouvé.</p>
        </main>
      );
    }

    // Filtrer les coachings pour exclure le coaching actuel
    const otherCoachings = allCoachings.data.filter((coaching: ICoaching) => coaching.id !== currentProduct.id);

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
            includes={currentProduct.includes}
            reviews={currentProduct.reviews}
            id={currentProduct.id}
          />
        </div>
        <div className="flex gap-8 mt-8">
          <div className="xl:max-w-[800px] flex-1">
            {currentProduct.currentProblems && (
              <CurrentProblems currentProblems={currentProduct.currentProblems} />
            )}
            {currentProduct.category.name !== undefined && <Reviews categoryName={currentProduct.category.name} productId={currentProduct.id}/>}
            {currentProduct.gains && <Gains gains={currentProduct.gains} />}
            {currentProduct.category.name === 'Ebook' && <Summary includes={currentProduct.includes} />}
            {currentProduct.category.name === 'Formation' && <Plan />}
            {currentProduct.targets && <Targets targets={currentProduct.targets} />}
            {currentProduct.category.name === 'Coaching' && (
              <Coach coach={currentProduct.coach} />
            )}
            <Suggestions suggestions={otherCoachings} />
            {/* <Pack /> */}
          </div>
        </div>
        <ScrollUp />
      </main>
    );
  } catch (error) {
    console.error(error);
    return notFound()
  }
}