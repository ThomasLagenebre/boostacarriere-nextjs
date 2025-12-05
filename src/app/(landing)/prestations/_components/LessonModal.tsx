'use client';

import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface Lesson {
  title: string;
  content: string;
  video: string;
  position?: number;
}

interface LessonModalProps {
  lesson: Lesson | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function LessonModal({ lesson, isOpen, onClose }: LessonModalProps) {
  if (!isOpen || !lesson) return null;

  const extractYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  };

  const videoId = extractYouTubeId(lesson.video);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-secondary">{lesson.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Video */}
          {embedUrl && (
            <div className="mb-6">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={embedUrl}
                  title={lesson.title}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Contenu de la leçon</h3>
            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 