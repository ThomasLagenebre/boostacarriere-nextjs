import React from 'react'
import Button from '../_global_components/Button'
import textSettings from '../_data/settings'

export default function Hero() {
  const arrayDescription = textSettings.home.description.split(/<primary>|<\/primary>/);

  return (
    <section className="md:w-3/5 mx-auto mt-20">
      <h1 className="text-3xl md:text-5xl xl:text-6xl font-extrabold text-secondary text-center mb-4 dark:text-light">
        {textSettings.home.slogan}
      </h1>
      <p className="text-center text-gray-500 dark:text-light">
        {arrayDescription.map((text, index) => 
          index % 2 === 1 ? (
            <span key={index} className="text-secondary dark:text-primary">
              {text}
            </span>
          ) : (
            text
          )
        )}
      </p>
      <Button type="link" link="/" style="primary" className="mt-4 mx-auto block w-fit dark:hover:text-light">
        {textSettings.home.cta}
      </Button>
    </section>
  )
}
