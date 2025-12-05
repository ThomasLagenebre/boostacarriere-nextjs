'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'
import DashboardSection from '../../../_components/DashboardSection'
import { fetchEbookById } from '@/app/_data/fetchEbookById'
import GeneralModule from '@/app/dashboard/_modulesForm/GeneralModule'
import ImgModule from '@/app/dashboard/_modulesForm/ImgModule'
import PriceModule from '@/app/dashboard/_modulesForm/PriceModule'
import CurrentProblemsModule from '@/app/dashboard/_modulesForm/CurrentProblemsModule'
import GainsModule from '@/app/dashboard/_modulesForm/GainsModule'
import ContentModule from '@/app/dashboard/_modulesForm/ContentModule'
import { updateEbook } from '@/app/_data/updateEbook'

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

export default function EditEbookPage({ params }: { params: { id: number } }) {
  const router = useRouter()
  const [ebook, setEbook] = useState<Ebook | null>(null)
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    const loadEbook = async () => {
      try {
        const response = await fetchEbookById(params.id)
        setEbook(response)
      } catch (error) {
        console.error('Error loading ebook:', error)
      } finally {
        setLoading(false)
      }
    }

    loadEbook()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ebook) return

    try {
      await updateEbook(params.id, {
        title: ebook.title,
        slogan: ebook.slogan,
        picture: ebook.picture,
        description: ebook.description,
        shortDescription: ebook.shortDescription,
        price: Number(ebook.price),
        promotion: ebook.promotion,
        promotionTime: 20,
        currentProblems: ebook.currentProblems,
        gains: ebook.gains,
        content: ebook.includes
      })
      router.push('/dashboard/ebooks')
    } catch (error) {
      console.error('Error updating ebook:', error)
    }
  }

  const handleGeneralModuleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!ebook) return
    const { id, value } = e.target
    const fieldMap: { [key: string]: string } = {
      'title': 'title',
      'slogan': 'slogan',
      'shortDescription': 'shortDescription',
      'description': 'description'
    }
    
    if (fieldMap[id]) {
      setEbook(prev => prev ? { ...prev, [fieldMap[id]]: value } : null)
    }
  }

  const handlePriceModuleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!ebook) return
    const { id, value } = e.target
    const fieldMap: { [key: string]: string } = {
      'price': 'price',
      'promotion': 'promotion',
      'promotionTime': 'promotionTime'
    }
    
    if (fieldMap[id]) {
      setEbook(prev => prev ? { ...prev, [fieldMap[id]]: Number(value) } : null)
    }
  }

  const handleCurrentProblemsModuleChange = (problems: ProblemObject[]) => {
    if (!ebook) return
    setEbook(prev => prev ? { ...prev, currentProblems: problems } : null)
  }

  const handleGainsModuleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!ebook) return
    try {
      const parsedGains = JSON.parse(e.target.value)
      setEbook(prev => prev ? { ...prev, gains: parsedGains } : null)
    } catch (error) {
      console.error('Error parsing gains:', error)
    }
  }

  const handleContentModuleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!ebook) return
    try {
      const parsedContent = JSON.parse(e.target.value)
      setEbook(prev => prev ? { ...prev, includes: parsedContent } : null)
    } catch (error) {
      console.error('Error parsing content:', error)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!ebook) return <div>Ebook not found</div>

  return (
    <div className='max-lg:px-4'>
      <DashboardSection>
        <SectionTitle title={`TITRE : ${ebook.title}`} className='text-left'/>
      </DashboardSection>
      <form className='my-6' onSubmit={handleSubmit}>
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
        <button 
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  )
} 