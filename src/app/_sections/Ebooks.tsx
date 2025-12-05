'use client';
import React, { useEffect, useState } from 'react'
import EbooksCard from '../_components/EbooksCard'
import SectionsHead from '../_components/SectionsHead'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/swiper-bundle.css';
import "swiper/css";
import "swiper/css/navigation";
import { fetchAllEbooks } from '../_data/fetchAllEbooks';
import { ICoaching } from '@/interface/ICoaching';

export default function Ebooks() {
  const [ebooks, setEbooks] = useState<ICoaching[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEbooks = async () => {
      try {
        const response = await fetchAllEbooks();
        setEbooks(response.data);
      } catch (error) {
        console.error('Error loading ebooks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEbooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className='my-32'>
        <SectionsHead 
          title='La lecture au profit de ta carrière' 
          description="Lis des livres qui te permettront de développer tes compétences et de progresser dans ta carrière."
        />
        <div className="px-16 relative">
          <div className="relative">
            <Swiper
                pagination={true} 
                loop={true}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                modules={[Navigation]}
                slidesPerView={1}
                centeredSlides
                className='my-6'
                centeredSlidesBounds
                spaceBetween={20}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  728: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  1280: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
              >
                {ebooks.map((ebook) => (
                  <SwiperSlide key={ebook.id}>
                    <div className="px-2">
                      <EbooksCard id={ebook.id} title={ebook.title} rate={ebook.rate || 0} price={parseInt(ebook.price)} img={ebook.picture} promotion={ebook.promotion}/>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-button-prev !text-gray-400 !w-10 !h-10 !bg-white !rounded-full !shadow-lg !left-0"></div>
            <div className="swiper-button-next !text-gray-400 !w-10 !h-10 !bg-white !rounded-full !shadow-lg !right-0"></div>
          </div>
          <style jsx global>{`
            .swiper-button-next,
            .swiper-button-prev {
              color: #9CA3AF;
              width: 40px !important;
              height: 40px !important;
              background: white;
              border-radius: 50%;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
              z-index: 50 !important;
            }
            .swiper-button-next:after,
            .swiper-button-prev:after {
              font-size: 20px !important;
            }
            .swiper-button-disabled {
              opacity: 0.35;
              cursor: auto;
              pointer-events: none;
            }
          `}</style>
        </div>
    </section>
  )
}
