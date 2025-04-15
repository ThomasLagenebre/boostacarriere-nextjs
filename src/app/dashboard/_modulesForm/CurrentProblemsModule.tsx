'use client';
import DashboardSection from '@/app/dashboard/_components/DashboardSection'
import { CurrentProblem } from '@/interface/ICoaching';
import React, { useState } from 'react'
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';

interface CurrentProblemsModuleProps {
  currentProblems?: any[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function CurrentProblemsModule({currentProblems, handleChange}: CurrentProblemsModuleProps) {
    const [fields, setFields] = useState<CurrentProblem[]>(currentProblems || []);

    const addField = () => {
        setFields([
          ...fields,
          { problem: "" }, // Ajout d'une ligne vide
        ]);
      };
    
      const removeField = (index: number) => {
        // Suppression du champ à l'index spécifié
        setFields(fields.filter((_, i) => i !== index));
      };
    
      const handleFieldChange = (index: number, value: string) => {
        // Mise à jour de la description du problème
        const newFields = [...fields];
        newFields[index] = { ...newFields[index], problem: value};
        setFields(newFields);
      };

    

    return (
        <DashboardSection>
            <h4 className='font-bold underline text-secondary mb-4'>Section : ce que tu vis actuellement</h4>
            <div className='my-4'>
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Problèmes actuels <span className='italic text-xs font-normal'>(clique sur le + pour ajouter une autre ligne)</span>
                </label>
                {fields.map((field, index) => (
                    <div key={index} className='flex items-center gap-8 my-2'>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Travailler sans compter tes heures"
                            required
                            value={field.problem}
                            onChange={(e) => handleFieldChange(index, e.target.value)} 
                        />
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
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Ajouter un problème</span>
                </button>
            </div>
        </DashboardSection>
    )
}
