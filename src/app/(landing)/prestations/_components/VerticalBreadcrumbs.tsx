"use client";
import React, { useState, useEffect } from "react";
import ShadowSection from "./ShadowSection";
import SectionTitle from "./SectionTitle";
import Image from "next/image";
import { FaPlayCircle } from "react-icons/fa";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import LessonModal from "./LessonModal";
import { extractYouTubeId, getYouTubeVideoDuration, formatDuration } from "@/lib/youtubeUtils";

interface Lesson {
  title: string;
  content: string;
  video: string;
  position?: number;
}

interface Chapter {
  id?: number;
  title: string;
  position: number;
  lessons: Lesson[];
}

interface BreadcrumbStep {
  label: string;
  completed?: boolean;
  lessons?: Lesson[];
}

interface VerticalBreadcrumbsProps {
  steps: BreadcrumbStep[];
}

const VerticalBreadcrumbs: React.FC<VerticalBreadcrumbsProps> = ({ steps = [] }) => {
  const [openSteps, setOpenSteps] = useState<boolean[]>(new Array(steps?.length || 0).fill(false));
  const [lessonDurations, setLessonDurations] = useState<{ [key: string]: number }>({});
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculer les durées des leçons
  useEffect(() => {
    const calculateDurations = async () => {
      const durations: { [key: string]: number } = {};
      
      for (const step of steps) {
        if (step.lessons) {
          for (const lesson of step.lessons) {
            const videoId = extractYouTubeId(lesson.video);
            if (videoId) {
              try {
                const duration = await getYouTubeVideoDuration(videoId);
                // Ajouter 2 minutes comme demandé
                durations[`${step.label}-${lesson.title}`] = duration + 2;
              } catch (error) {
                console.error('Error calculating duration for lesson:', lesson.title, error);
                durations[`${step.label}-${lesson.title}`] = 17; // 15 + 2 par défaut
              }
            } else {
              durations[`${step.label}-${lesson.title}`] = 17; // Durée par défaut
            }
          }
        }
      }
      
      setLessonDurations(durations);
    };

    calculateDurations();
  }, [steps]);

  const toggleStep = (index: number) => {
    setOpenSteps((prev) => {
      const newOpenSteps = [...prev];
      newOpenSteps[index] = !newOpenSteps[index];
      return newOpenSteps;
    });
  };

  const openLessonModal = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const closeLessonModal = () => {
    setIsModalOpen(false);
    setSelectedLesson(null);
  };

  // Fonction pour décoder les entités HTML
  const decodeHtmlEntities = (text: string): string => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <>
      <div className="relative grid grid-cols-8">
        {/* Barre verticale ajustée */}
        <div className="absolute left-5 top-0 bottom-0 w-1 bg-secondary"></div>

        {steps.map((chapter, idx) => (
          <ShadowSection key={idx} className="col-span-7 my-1 relative translate-x-12">
            {/* Numéro du chapitre */}
            <div className={`w-6 h-6 rounded-full ${chapter.completed ? "bg-secondary" : "bg-gray-500"} flex items-center justify-center text-white font-bold absolute -left-[2.3rem]`}>
              {idx + 1}
            </div>

            {/* Titre du chapitre */}
            <div
              className={`${openSteps[idx] ? "mb-4" : ""} flex justify-between cursor-pointer`}
              onClick={() => toggleStep(idx)}
            >
              <SectionTitle className={`${chapter.completed ? "text-secondary" : "text-gray-500"}`} title={chapter.label} />
              <IoMdArrowDroprightCircle
                size={30}
                className={`${openSteps[idx] ? "rotate-90" : ""} fill-secondary`}
              />
            </div>

            {/* Contenu des leçons */}
            <div className={`${!openSteps[idx] ? "hidden" : "flex flex-col gap-4"}`}>
              {chapter.lessons && chapter.lessons.map((lesson, lessonIndex) => {
                const durationKey = `${chapter.label}-${lesson.title}`;
                const duration = lessonDurations[durationKey] || 17;
                const videoId = extractYouTubeId(lesson.video);
                const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

                return (
                  <LessonsCard
                    key={lessonIndex}
                    lesson={lesson}
                    lessonNumber={lessonIndex + 1}
                    duration={duration}
                    thumbnailUrl={thumbnailUrl || ''}
                    onClick={() => openLessonModal(lesson)}
                    decodeHtmlEntities={decodeHtmlEntities}
                  />
                );
              })}
            </div>
          </ShadowSection>
        ))}
      </div>

      {/* Modal pour afficher la leçon complète */}
      <LessonModal
        lesson={selectedLesson}
        isOpen={isModalOpen}
        onClose={closeLessonModal}
      />
    </>
  );
};

export default VerticalBreadcrumbs;

const LessonsCard = ({
  lesson,
  lessonNumber,
  duration,
  thumbnailUrl,
  onClick,
  decodeHtmlEntities,
}: {
  lesson: Lesson;
  lessonNumber: number;
  duration: number;
  thumbnailUrl: string;
  onClick: () => void;
  decodeHtmlEntities: (text: string) => string;
}) => {
  const videoId = extractYouTubeId(lesson.video);
  const hasValidVideo = !!videoId;

  // Décoder le contenu HTML
  const decodedContent = decodeHtmlEntities(lesson.content.replace(/<[^>]*>/g, ''));

  return (
    <div 
      className="p-2 shadow-lg border border-gray-100 rounded-md flex items-start gap-5 cursor-pointer hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      <div className="relative w-fit">
        {hasValidVideo ? (
          <Image 
            src={thumbnailUrl}
            width={150} 
            height={150} 
            alt={lesson.title} 
            className="rounded-md"
          />
        ) : (
          <div className="w-[150px] h-[150px] bg-gray-200 rounded-md flex items-center justify-center">
            <FaPlayCircle className="fill-gray-400" size={40} />
          </div>
        )}
        <div className="bg-secondary w-5 h-5 rounded-tl-md rounded-br-md flex items-center justify-center text-light font-bold absolute top-0 left-0">
          {lessonNumber}
        </div>
        {hasValidVideo && (
          <FaPlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-light" size={40} />
        )}
      </div>
      <div>
        <h3 className="text-lg font-bold text-secondary">{lesson.title}</h3>
        <p className="text-xs text-gray-600">{formatDuration(duration)}</p>
        <p className="text-sm text-gray-700 mt-2">
          {decodedContent.substring(0, 100)}...
        </p>
      </div>
    </div>
  );
};
