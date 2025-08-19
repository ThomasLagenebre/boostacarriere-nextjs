import React from 'react'

interface SkeletonProps {
  rows?: number;
  columns?: number;
  isTable?: boolean;
  color?: 'gray' | 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'white' | 'custom';
  customColor?: string;
  className?: string;
  width?: number;
}

function Skeleton({ rows = 5, columns = 2, isTable = true, color = 'gray', customColor, width, className }: SkeletonProps) {
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return {
          primary: 'bg-blue-300 dark:bg-blue-600',
          secondary: 'bg-blue-200 dark:bg-blue-700'
        };
      case 'green':
        return {
          primary: 'bg-green-300 dark:bg-green-600',
          secondary: 'bg-green-200 dark:bg-green-700'
        };
      case 'red':
        return {
          primary: 'bg-red-300 dark:bg-red-600',
          secondary: 'bg-red-200 dark:bg-red-700'
        };
      case 'yellow':
        return {
          primary: 'bg-yellow-300 dark:bg-yellow-600',
          secondary: 'bg-yellow-200 dark:bg-yellow-700'
        };
      case 'purple':
        return {
          primary: 'bg-purple-300 dark:bg-purple-600',
          secondary: 'bg-purple-200 dark:bg-purple-700'
        };
      case 'white':
        return {
          primary: 'bg-white dark:bg-gray-100',
          secondary: 'bg-gray-50 dark:bg-gray-200'
        };
      case 'custom':
        return {
          primary: customColor || 'bg-gray-300 dark:bg-gray-600',
          secondary: customColor || 'bg-gray-200 dark:bg-gray-700'
        };
      default: // gray
        return {
          primary: 'bg-gray-300 dark:bg-gray-600',
          secondary: 'bg-gray-200 dark:bg-gray-700'
        };
    }
  };

  const colors = getColorClasses();

  const generateSkeletonRows = () => {
    return Array.from({ length: rows }, (_, rowIndex) => (
      <div key={rowIndex} className={`flex items-center justify-between ${rowIndex > 0 ? 'pt-4' : ''} ${className}`}>
        <div className="flex gap-4 flex-1">
          {Array.from({ length: columns }, (_, colIndex) => (
            <div key={colIndex} className="flex-1">
              <div className={`h-2.5 rounded-full ${width? `w-${width}` : "w-24"} mb-2.5 ${colors.primary}`}></div>
              <div className={`w-32 h-2 rounded-full ${colors.secondary}`}></div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  const containerClasses = isTable 
    ? "p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded-sm shadow-sm animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
    : "p-4 space-y-4 animate-pulse";

  return (
    <div role="status" className={containerClasses}>
      {generateSkeletonRows()}
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Skeleton 