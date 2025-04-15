'use client';
import DashboardSection from '@/app/dashboard/_components/DashboardSection'
import { Include } from '@/interface/ICoaching';
import React, { useState } from 'react'
import { AiFillQuestionCircle } from 'react-icons/ai';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';

interface ContentModuleProps {
  contents?: Include[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function ContentModule({contents, handleChange}: ContentModuleProps) {
  const [fields, setFields] = useState<Include[]>(contents || []);

  const addField = () => {
    setFields([
      ...fields,
      { title: "", description: "", icon: "" },
    ]);
  };
  
  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };
  
  const handleFieldChange = (index: number, field: keyof Include, value: string) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], [field]: value};
    setFields(newFields);
  };

  return (
    <DashboardSection>
      <h4 className='font-bold underline text-secondary mb-4'>Section : ce que tu vas apprendre</h4>
      <div className='my-4'>
        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Contenu <span className='italic text-xs font-normal'>(clique sur le + pour ajouter une autre ligne)</span>
        </label>
        {fields.map((field, index) => (
          <div key={index} className='flex items-center gap-8 my-2'>
            <div className='flex-1'>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Titre"
                required
                value={field.title}
                onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
              />
            </div>
            <div className='flex-1'>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Description"
                required
                value={field.description}
                onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
              />
            </div>
            <div className='flex-1'>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Icône"
                required
                value={field.icon}
                onChange={(e) => handleFieldChange(index, 'icon', e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => removeField(index)}
            >
              <CiSquareMinus size={40} className='text-secondary' />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addField}
          className="flex items-center gap-2 mt-4"
        >
          <CiSquarePlus size={40} className='text-secondary' />
          <span className="text-sm font-medium text-gray-900 dark:text-white">Ajouter un contenu</span>
        </button>
      </div>
    </DashboardSection>
  )
}
