'use client';
import React from 'react'
import EbooksCard from '../_components/EbooksCard'
import SectionsHead from '../_components/SectionsHead'
import { Swiper, SwiperSlide } from 'swiper/react'
import {  Navigation } from 'swiper/modules'
import 'swiper/swiper-bundle.css';
import "swiper/css";
import allEbooks from '../_data/allEbooks';

export default function Ebooks() {
  return (
    <section className='my-32'>
        <SectionsHead title='La lecture au profit de ta carrière' description='Utilise un outil tout-en-un qui te permettra de suivre l’avancé de ta recherche d’emploi et te donnera des conseils personnalisés directement sur Boostacarriere'/>
        <Swiper
            // ref={swipersRef}
            pagination={true} 
            loop={true}
            navigation
            modules={[Navigation]}
            slidesPerView={1}
            centeredSlides
            className='my-6'
            centeredSlidesBounds
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              728: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 5,
              },
            }}
          >
            {allEbooks.map((ebook) => (
              <SwiperSlide key={ebook.id}>
                <EbooksCard title={ebook.title} rate={ebook.rate} price={parseInt(ebook.price)} img={ebook.picture} promotion={ebook.promotion}/>
              </SwiperSlide>
            ))}
        </Swiper>
    </section>
  )
}
