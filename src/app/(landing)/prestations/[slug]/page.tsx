import React from 'react'
import Hero from '../_sections/Hero'
import CurrentProblems from '../_sections/CurrentProblems'
import Reviews from '../_sections/Reviews'
import Gains from '../_sections/Gains'
import Description from '../_sections/Description'
import Targets from '../_sections/Targets'
import Suggestions from '../_sections/Suggestions'
import ScrollUp from '../_components/ScrollUp'
import Coach from '../_sections/Coach'
import Pack from '../_sections/Pack'
import Summary from '../_sections/Summary'
import Plan from '../_sections/Plan'
import allCoachings from '@/app/_data/allCoachings'

export default async function page({params}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  const currentProduct = allCoachings.find((coaching) => coaching.slug === slug);
  
  return (
    <main className='mx-auto max-w-screen-xl max-xl:px-2'>
      {currentProduct && (
        <>
          <Hero title={currentProduct.title} category={currentProduct.category} description={currentProduct.description} rate={currentProduct.rate} img={currentProduct.picture} price={parseInt(currentProduct.price)} promotion={currentProduct.promotion} limitPromotion={currentProduct.limitPromotion} includes={currentProduct.includes} reviews={currentProduct.reviews}/>
          <div className=' xl:max-w-[800px]'>
              {currentProduct.currentProblems && <CurrentProblems currentProblems={currentProduct.currentProblems}/>}
              
              <Reviews />
              {currentProduct.gains && <Gains gains={currentProduct.gains} />}
              {currentProduct.category.name === "Ebook" && <Summary />}
              <Description />
              {currentProduct.category.name === "Formation" && <Plan />}
              {currentProduct.targets && <Targets targets={currentProduct.targets}/>}
              {allCoachings.length > 1 && <Suggestions suggestions={allCoachings.filter((coaching) => coaching.id !== currentProduct.id)}/>}
              {currentProduct.category.name === "Coaching" && <Coach coach={currentProduct.coach}/>}
              
              <Pack />
          </div>
          <ScrollUp />
        </>
    )}
      
    </main>
  )
}
