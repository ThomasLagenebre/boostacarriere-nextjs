"use client";
import React, { useState } from "react";
import ShadowSection from "./ShadowSection";
import SectionTitle from "./SectionTitle";
import Image from "next/image";
import { FaPlayCircle } from "react-icons/fa";
import { IoMdArrowDroprightCircle } from "react-icons/io";

interface BreadcrumbStep {
  label: string;
  completed?: boolean;
}

interface VerticalBreadcrumbsProps {
  steps: BreadcrumbStep[];
}

const VerticalBreadcrumbs: React.FC<VerticalBreadcrumbsProps> = ({ steps }) => {
  const [openSteps, setOpenSteps] = useState<boolean[]>(new Array(steps.length).fill(false));

  const toggleStep = (index: number) => {
    setOpenSteps((prev) => {
      const newOpenSteps = [...prev];
      newOpenSteps[index] = !newOpenSteps[index];
      return newOpenSteps;
    });
  };

  return (
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
            <LessonsCard
              lessonTitle="Le planning de la formation"
              videoCover="https://firebasestorage.googleapis.com/v0/b/boostacarriere-2679a.appspot.com/o/files%2FIMG_0622.jpg?alt=media&token=0cd5f6df-f0e1-4fb4-af87-e612dd969c78"
              lessonNumber={1}
              description="Merci pour tout ça marche"
              duration={15}
            />
          </div>
        </ShadowSection>
      ))}
    </div>
  );
};

export default VerticalBreadcrumbs;

const LessonsCard = ({
  lessonTitle,
  videoCover,
  lessonNumber,
  description,
  duration,
}: {
  lessonTitle: string;
  videoCover: string;
  lessonNumber: number;
  description: string;
  duration: number;
}) => {
  return (
    <div className="p-2 shadow-lg border border-gray-100 rounded-md flex items-start gap-5">
      <div className="relative w-fit">
        <Image src={videoCover} width={150} height={150} alt="Superbe image" className="rounded-md" />
        <div className="bg-secondary w-5 h-5 rounded-tl-md rounded-br-md flex items-center justify-center text-light font-bold absolute top-0 left-0">
          {lessonNumber}
        </div>
        <FaPlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-light" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-secondary">{lessonTitle}</h3>
        <p className="text-xs text-gray-600">{duration} minutes</p>
        <p>{description}</p>
      </div>
    </div>
  );
};
