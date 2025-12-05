'use client';
import DashboardSection from '@/app/dashboard/_components/DashboardSection'
import React, { useState } from 'react'
import Input from '../_components/Input';
import { log } from 'console';

interface PriceModuleProps {
  price?: number;
  promotion?: number;
  promotionTime?: number;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handlePromotionChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handlePromotionTimeChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function PriceModule({price, promotion, promotionTime, handlePriceChange, handlePromotionChange, handlePromotionTimeChange}: PriceModuleProps) {
    const [isUnlimited, setIsUnlimited] = useState<boolean>(promotionTime === null || promotionTime === undefined);
    

    const handleCheckboxChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setIsUnlimited(e.target?.checked);
        if (e.target?.checked) {
            handlePromotionTimeChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
        }
    };
    return (
        <DashboardSection>
          <h4 className="font-bold underline text-secondary mb-4">Prix et réductions</h4>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Prix
            </label>
            <input
              type="number"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Prix de la formation"
              required
              value={price}
              onChange={handlePriceChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Promotion
            </label>
            <input
              type="number"
              id="promotion"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Promotion en pourcentage"
              value={promotion}
              onChange={handlePromotionChange}
            />
          </div>
          {promotion !== undefined && promotion > 0 && (
            <div className="my-4">
              {!isUnlimited && (
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Durée de la promotion (en jours)
                  </label>
                  <input
                    type="number"
                    id="promotionTime"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Durée de la promotion"
                    value={promotionTime}
                    onChange={handlePromotionTimeChange}
                  />
                </div>
              )}
              
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onChange={handleCheckboxChange}
                  checked={isUnlimited}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-secondary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary"></div>
                <span className="ms-3 text-xs font-medium text-gray-500 dark:text-gray-300">Pas de limite</span>
              </label>
            </div>
          )}
        </DashboardSection>
      );
    }
