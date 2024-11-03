import React from 'react'
import Hero from './_sections/Hero'
import CurrentProblems from './_sections/CurrentProblems'
import Reviews from './_sections/Reviews'
import Gains from './_sections/Gains'
import Description from './_sections/Description'
import Targets from './_sections/Targets'
import Suggestions from './_sections/Suggestions'
import ScrollUp from './_components/ScrollUp'
import Coach from './_sections/Coach'
import Pack from './_sections/Pack'
import Summary from './_sections/Summary'
import Plan from './_sections/Plan'

export default function page() {
  return (
    <main className='mx-auto max-w-screen-xl max-xl:px-2'>
      <Hero />
      <div className=' xl:max-w-[800px]'>
        <CurrentProblems />
        <Reviews />
        <Gains />
        <Summary />
        <Description />
        <Plan />
        <Targets />
        <Suggestions />
        <Coach />
        <Pack />
      </div>
      <ScrollUp />
    </main>
  )
}
