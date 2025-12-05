'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import EbookForm from '../_components/EbookForm'
import DashboardSection from '../../_components/DashboardSection'
import SectionTitle from '@/app/(landing)/prestations/_components/SectionTitle'

export default function AddEbookPage() {
  const router = useRouter()

  return (
    <div className='max-lg:px-4'>
      <DashboardSection>
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <span>←</span>
            Retour
          </button>
          <SectionTitle title="Ajouter un ebook" className='text-left'/>
        </div>
      </DashboardSection>
      <EbookForm />
    </div>
  )
} 