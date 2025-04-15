'use client';
import DashboardSection from '@/app/dashboard/_components/DashboardSection'
import React, { useState } from 'react'
import Input from '../_components/Input';

interface PriceModuleProps {
  price?: string;
  promotion?: number;
  promotionTime?: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function PriceModule({price, promotion, promotionTime, handleChange}: PriceModuleProps) {
    const [isUnlimited, setIsUnlimited] = useState<boolean>(promotionTime === null || promotionTime === undefined);
    const [currentPromotion, setCurrentPromotion] = useState(promotion);


    const handleCheckboxChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setIsUnlimited(e.target?.checked);
    };
    return (
        <DashboardSection>
          <h4 className="font-bold underline text-secondary mb-4">Prix et réductions</h4>
          <Input
            id="price"
            value={price}
            type="text"
            placeholder="Prix"
            label="Prix"
            onChange={handleChange}
            required
          />
          <Input
            id="promotion"
            value={currentPromotion}
            type="number"
            placeholder="Promotion"
            label="Promotion (%)"
            onChange={(newValue) => setCurrentPromotion(Number(newValue))}
          />
          {currentPromotion && currentPromotion > 0 && (
            <div className="my-4">
              <Input
                id="promotionTime"
                value={promotionTime}
                type="number"
                placeholder="Durée de la promotion"
                label="Durée de la promotion (jours)"
                onChange={handleChange}
              />
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
