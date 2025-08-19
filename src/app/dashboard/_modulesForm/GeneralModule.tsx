'use client';
import DashboardSection from '@/app/dashboard/_components/DashboardSection'
import React, { useState, useEffect } from 'react'
import Input from '../_components/Input'

interface GeneralModuleProps {
  title: string;
  slogan: string;
  shortDescription: string;
  description: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function GeneralModule({title, slogan, shortDescription, description, handleChange}: GeneralModuleProps) {
  const [localValues, setLocalValues] = useState({
    title,
    slogan,
    shortDescription,
    description
  });

  useEffect(() => {
    setLocalValues({
      title,
      slogan,
      shortDescription,
      description
    });
  }, [title, slogan, shortDescription, description]);

  const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setLocalValues(prev => ({ ...prev, [id]: value }));
    handleChange(e);
  };

  return (
    <DashboardSection>
      <h4 className='font-bold underline text-secondary'>Informations générales</h4>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Titre
        </label>
        <input
          type="text"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Titre de la formation"
          required
          value={localValues.title}
          onChange={handleLocalChange}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Slogan
        </label>
        <input
          type="text"
          id="slogan"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Slogan de la formation"
          required
          value={localValues.slogan}
          onChange={handleLocalChange}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Description courte
        </label>
        <textarea
          id="shortDescription"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Description courte de la formation"
          required
          value={localValues.shortDescription}
          onChange={handleLocalChange}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Description
        </label>
        <textarea
          id="description"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Description de la formation"
          required
          value={localValues.description}
          onChange={handleLocalChange}
        />
      </div>
    </DashboardSection>
  )
}
