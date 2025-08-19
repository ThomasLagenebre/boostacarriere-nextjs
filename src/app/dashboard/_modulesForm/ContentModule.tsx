'use client';
import DashboardSection from '@/app/dashboard/_components/DashboardSection'
import React, { useState } from 'react'
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';

interface Content {
  title: string;
  description: string;
}

interface ContentModuleProps {
  contents: Content[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function ContentModule({contents, handleChange}: ContentModuleProps) {
    const [fields, setFields] = useState<Content[]>(contents || []);

    const addField = () => {
        const newFields = [...fields, { title: "", description: "" }];
        setFields(newFields);
        handleChange({ target: { value: JSON.stringify(newFields) } } as React.ChangeEvent<HTMLInputElement>);
    };
    
    const removeField = (index: number) => {
        const newFields = fields.filter((_, i) => i !== index);
        setFields(newFields);
        handleChange({ target: { value: JSON.stringify(newFields) } } as React.ChangeEvent<HTMLInputElement>);
    };
    
    const handleFieldChange = (index: number, field: keyof Content, value: string) => {
        const newFields = [...fields];
        newFields[index] = { ...newFields[index], [field]: value };
        setFields(newFields);
        handleChange({ target: { value: JSON.stringify(newFields) } } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <DashboardSection>
            <h4 className='font-bold underline text-secondary mb-4'>Section : contenu du coaching</h4>
            <div className='my-4'>
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Contenu <span className='italic text-xs font-normal'>(clique sur le + pour ajouter une autre ligne)</span>
                </label>
                {fields.map((field, index) => (
                    <div key={index} className='flex flex-col gap-4 my-4'>
                        <div className='flex items-center gap-8'>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Titre du contenu"
                                required
                                value={field.title}
                                onChange={(e) => handleFieldChange(index, 'title', e.target.value)} 
                            />
                            <button
                                type="button"
                                onClick={() => removeField(index)} 
                            >
                                <CiSquareMinus size={40} className='text-secondary' />
                            </button>
                        </div>
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
