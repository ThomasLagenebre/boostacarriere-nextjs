import Image from 'next/image'
import React from 'react'
import StarsRate from '../_global_components/StarsRate'
import PriceView from '../_global_components/PriceView'
import Link from 'next/link'

export default function EbooksCard({
  id, 
  title, 
  rate, 
  price, 
  img, 
  promotion
}: {
  id: number
  title: string
  rate?: number
  price: number
  img: string
  promotion?: number
}) {
  
  return (
    <div className="w-full max-w-sm mx-auto">
      <Link 
        href={`prestations/ebooks/${id}`} 
        className="block group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-secondary/10 dark:bg-gray-700">
          <Image 
            alt={`Couverture de l'ebook ${title}`} 
            src={img} 
            width={300} 
            height={400} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          />
          {promotion !== undefined && promotion > 0 && promotion < 100 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{promotion}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight line-clamp-2 group-hover:text-secondary dark:group-hover:text-blue-400 transition-colors duration-200">
            {title}
          </h3>

          {/* Rating */}
          {rate !== undefined && rate > 0 && (
            <div className="flex items-center gap-2">
              <StarsRate rate={rate} />
            </div>
          )}

          {/* Price */}
          <div className="pt-2">
            <PriceView price={price} promotion={promotion} />
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <div className="w-full bg-secondary hover:bg-secondary/90 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors duration-200">
              Voir l&apos;ebook
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}