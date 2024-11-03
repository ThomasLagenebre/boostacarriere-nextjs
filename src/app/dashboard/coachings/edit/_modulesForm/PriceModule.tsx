'useClient';
import DashboardSection from '@/app/dashboard/_components/DashboardSection'
import React, { useState } from 'react'
import Input from '../_components/Input';

export default function PriceModule() {
    const [isUnlimited, setIsUnlimited] = useState(false);

    const handleCheckboxChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setIsUnlimited(e.target?.checked);
    };
  return (
            <DashboardSection>
                <h4 className='font-bold underline text-secondary mb-4'>Prix et réductions</h4>
                <Input id='price' type='number' placeholder='8999' label='Prix' indicationLabel='(en centimes)' required/>
                <Input id='reduction' type='number' placeholder='40' label='Réduction' indicationLabel='(en pourcentage)' required/>
                <div className='my-4'>
                        <Input id='durationReduction' type='number' placeholder='31' label='Durée de la réduction' indicationLabel='(en jours)' required disabled={isUnlimited} inputClassName={`${isUnlimited ? 'placeholder-gray-50 border-gray-50' : 'border-gray-300' }`} />
                        <label className="inline-flex items-center cursor-pointe">
                        <input type="checkbox" value="" className="sr-only peer" onChange={handleCheckboxChange} />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-secondary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary"></div>
                        <span className="ms-3 text-xs font-medium text-gray-500 dark:text-gray-300">Pas de limite</span>
                        </label>
                </div>
            </DashboardSection>
  )
}
