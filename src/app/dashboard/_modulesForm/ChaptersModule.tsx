'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react'
import DashboardSection from '../_components/DashboardSection'
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci';
import dynamic from 'next/dynamic';

// Import dynamique de l'éditeur WYSIWYG pour éviter les erreurs SSR
const Editor = dynamic(() => import('@/app/_components/Editor'), {
    ssr: false,
    loading: () => <p>Chargement de l&apos;éditeur...</p>
});

interface Lesson {
    id?: number;
    title: string;
    content: string;
    video: string;
    position: number;
}

interface Chapter {
    id?: number;
    title: string;
    position: number;
    lessons: Lesson[];
}

interface ChaptersModuleProps {
    chapters: Chapter[];
    handleChange: (chapters: Chapter[]) => void;
}

export default function ChaptersModule({ chapters, handleChange }: ChaptersModuleProps) {
    const [fields, setFields] = useState<Chapter[]>(chapters || []);
    const isInitialized = useRef(false);
    const lastChaptersRef = useRef<Chapter[]>([]);
    

    // Mise à jour des champs quand les chapitres changent (seulement si c'est différent)
    useEffect(() => {
        if (chapters && chapters.length > 0 && JSON.stringify(chapters) !== JSON.stringify(lastChaptersRef.current)) {
            lastChaptersRef.current = chapters;
            setFields(chapters);
            isInitialized.current = true;
        } else if (!isInitialized.current) {
            setFields(chapters || []);
            isInitialized.current = true;
        }
    }, [chapters]);

    // Appel de handleChange uniquement quand les champs sont modifiés et après l'initialisation
    useEffect(() => {
        if (isInitialized.current && JSON.stringify(fields) !== JSON.stringify(lastChaptersRef.current)) {
            handleChange(fields);
        }
    }, [fields, handleChange]);

    const addField = useCallback(() => {
        const newPosition = fields.length > 0 
            ? Math.max(...fields.map(f => f.position)) + 1 
            : 1;
        const newFields = [...fields, { title: '', position: newPosition, lessons: [] }];
        setFields(newFields);
    }, [fields]);

    const removeField = useCallback((index: number) => {
        const newFields = fields.filter((_, i) => i !== index);
        setFields(newFields);
    }, [fields]);

    const handleTitleChange = useCallback((index: number, value: string) => {
        const newFields = [...fields];
        newFields[index] = { ...newFields[index], title: value };
        setFields(newFields);
    }, [fields]);

    const handlePositionChange = useCallback((index: number, value: string) => {
        const position = parseInt(value);
        if (isNaN(position) || position < 1) return;
        
        const newFields = [...fields];
        newFields[index] = { ...newFields[index], position };
        setFields(newFields);
    }, [fields]);

    const addLesson = useCallback((chapterIndex: number) => {
        const newFields = [...fields];
        const chapter = newFields[chapterIndex];
        const newLessonPosition = chapter.lessons.length > 0 
            ? Math.max(...chapter.lessons.map(l => l.position)) + 1 
            : 1;
        
        chapter.lessons.push({
            title: '',
            content: '',
            video: '',
            position: newLessonPosition
        });
        setFields(newFields);
    }, [fields]);

    const removeLesson = useCallback((chapterIndex: number, lessonIndex: number) => {
        const newFields = [...fields];
        newFields[chapterIndex].lessons = newFields[chapterIndex].lessons.filter((_, i) => i !== lessonIndex);
        setFields(newFields);
    }, [fields]);

    const handleLessonChange = useCallback((chapterIndex: number, lessonIndex: number, field: keyof Lesson, value: string) => {
        const newFields = [...fields];
        newFields[chapterIndex].lessons[lessonIndex] = {
            ...newFields[chapterIndex].lessons[lessonIndex],
            [field]: value
        };
        setFields(newFields);
    }, [fields]);

    return (
        <DashboardSection>
            <h4 className='font-bold underline text-secondary mb-4'>Section : les chapitres</h4>
            <div className='my-4'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Les chapitres de la formation <span className='italic text-xs font-normal'>(clique sur le + pour ajouter un chapitre)</span>
                </label>
                {fields.map((field, index) => (
                    <div key={field.id || index} className='border border-gray-200 rounded-lg p-4 mb-4'>
                        <div className='flex items-center gap-4 mb-4'>
                            <div className="w-20">
                                <label className="block mb-1 text-xs text-gray-600">Position</label>
                                <input
                                    type="number"
                                    min="1"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={field.position}
                                    onChange={(e) => handlePositionChange(index, e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-1 text-xs text-gray-600">Titre</label>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Titre du chapitre"
                                    required
                                    value={field.title}
                                    onChange={(e) => handleTitleChange(index, e.target.value)}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeField(index)}
                                className="mt-6"
                            >
                                <CiSquareMinus size={40} className='text-secondary' />
                            </button>
                        </div>

                        {/* Leçons du chapitre */}
                        <div className="ml-8 mt-4">
                            <h5 className="font-medium mb-2">Leçons</h5>
                            {field.lessons.map((lesson, lessonIndex) => (
                                <div key={lessonIndex} className="flex flex-col gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Titre de la leçon"
                                                value={lesson.title}
                                                onChange={(e) => handleLessonChange(index, lessonIndex, 'title', e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="URL de la vidéo"
                                                value={lesson.video}
                                                onChange={(e) => handleLessonChange(index, lessonIndex, 'video', e.target.value)}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeLesson(index, lessonIndex)}
                                            className="mt-2"
                                        >
                                            <CiSquareMinus size={30} className='text-secondary' />
                                        </button>
                                    </div>
                                    <div className="mt-2">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Contenu de la leçon
                                        </label>
                                        <Editor
                                            value={lesson.content}
                                            onChange={(content) => handleLessonChange(index, lessonIndex, 'content', content)}
                                        />
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addLesson(index)}
                                className="flex items-center gap-2 mt-2"
                            >
                                <CiSquarePlus size={30} className='text-secondary' />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Ajouter une leçon</span>
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
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Ajouter un chapitre</span>
                </button>
            </div>
        </DashboardSection>
    );
}