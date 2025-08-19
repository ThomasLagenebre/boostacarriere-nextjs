'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { fetchEbookById } from '@/app/_data/fetchEbookById'
import DashboardSection from '../../_components/DashboardSection'
import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import GeneralModule from '@/app/dashboard/_modulesForm/GeneralModule'
import ImgModule from '@/app/dashboard/_modulesForm/ImgModule'
import PriceModule from '@/app/dashboard/_modulesForm/PriceModule'
import CurrentProblemsModule from '@/app/dashboard/_modulesForm/CurrentProblemsModule'
import GainsModule from '@/app/dashboard/_modulesForm/GainsModule'
import ContentModule from '@/app/dashboard/_modulesForm/ContentModule'

interface ProblemObject {
  problem: string;
}

interface Ebook {
  id: number
  title: string
  slogan: string
  picture: string
  summary: string | null
  description: string
  shortDescription: string
  rate: number | null
  price: number
  isActive: boolean
  slug: string
  promotion: number
  category: {
    id: number
    name: string
  }
  currentProblems: ProblemObject[]
  chapters: any[]
  gains: any[]
  includes: any[]
  numberOfReviews: number
  reviews: any[]
}

export default function EbookDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [ebook, setEbook] = useState<Ebook | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEbook = async () => {
      try {
        const response = await fetchEbookById(parseInt(params.id))
        setEbook(response)
      } catch (error) {
        console.error('Error loading ebook:', error)
      } finally {
        setLoading(false)
      }
    }

    loadEbook()
  }, [params.id])

  const handleGeneralModuleChange = () => {}
  const handlePriceModuleChange = () => {}
  const handleCurrentProblemsModuleChange = () => {}
  const handleGainsModuleChange = () => {}
  const handleContentModuleChange = () => {}

  if (loading) return <div>Loading...</div>
  if (!ebook) return <div>Ebook not found</div>

  return (
    <div className='max-lg:px-4'>
      <DashboardSection>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <span>←</span>
              Retour
            </button>
            <SectionTitle title={`TITRE : ${ebook.title}`} className='text-left'/>
          </div>
          <button
            onClick={() => router.push(`/dashboard/ebooks/edit/${params.id}`)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <span>✎</span>
            Modifier
          </button>
        </div>
      </DashboardSection>
      <div className='my-6'>
        <GeneralModule 
          title={ebook.title} 
          slogan={ebook.slogan} 
          shortDescription={ebook.shortDescription} 
          description={ebook.description}
          handleChange={handleGeneralModuleChange}
        />
        <ImgModule 
          imgURL={ebook.picture}
          handleChange={handleGeneralModuleChange}
        />
        <PriceModule  
          price={Number(ebook.price)} 
          promotion={ebook.promotion} 
          promotionTime={20}
          handlePriceChange={handlePriceModuleChange}
          handlePromotionChange={handlePriceModuleChange}
          handlePromotionTimeChange={handlePriceModuleChange}
        />
        <CurrentProblemsModule 
          currentProblems={Array.isArray(ebook.currentProblems) ? ebook.currentProblems : []}
          handleChange={handleCurrentProblemsModuleChange}
        />
        <GainsModule 
          gains={ebook.gains}
          handleChange={handleGainsModuleChange}
        />    
        <ContentModule 
          contents={ebook.includes}
          handleChange={handleContentModuleChange}
        />
      </div>
    </div>
  )
} 