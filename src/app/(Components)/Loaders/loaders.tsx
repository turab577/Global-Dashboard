'use client'
import React, { useState } from 'react';
import Loader from '@/app/ui-components/loaders';

// Define the type for loader categories
type LoaderCategory = 'all' | 'classic' | 'modern' | 'physics' | 'shapes' | 'creative' | 'tech' | 'special';

const LoaderLibrary = () => {
  const [activeCategory, setActiveCategory] = useState<LoaderCategory>('all');
  
  // Organized by categories with proper typing
  const loaderCategories: Record<LoaderCategory, string[]> = {
    all: [
      'spinner', 'dots', 'pulse', 'bars', 'ripple', 
      'clock', 'orbit', 'infinity', 'cube', 'wave', 'neon', 
      'fractal', 'meteor', 'atom', 'zigzag', 'staircase', 
      'flip', 'firework', 'honeycomb', 'cyber', 'snowflake',
      'yinyang', 'spiral', 'heartbeat', 'dots-ring', 'jelly',
      'superballs', 'trinity', 'pong',  'rainbow',
      'morph', 'revolver', 'wobble', 'grow', 'circle-dots',
      'square-dots', 'grid', 'fidget', 'gooey', 'blob',
      'book', 'database', 'layers', 'cpu',
       'cloud', 'wifi', 'bluetooth', 'battery'
    ],
    classic: ['spinner', 'dots', 'pulse', 'bars', 'ripple'],
    modern: ['clock', 'orbit', 'infinity', 'cube', 'wave', 'neon', 'fractal'],
    physics: ['meteor', 'atom', 'zigzag', 'staircase', 'flip', 'firework'],
    shapes: ['honeycomb', 'cyber', 'snowflake', 'yinyang', 'spiral', 'heartbeat'],
    creative: ['dots-ring', 'jelly', 'superballs', 'trinity', 'pong'],
    tech: ['database', 'cpu', 'cloud', 'wifi', 'bluetooth', 'battery'],
    special: ['rainbow', 'morph', 'revolver', 'wobble', 'grow', 'circle-dots']
  };

  const getLoadersToShow = () => {
    if (activeCategory === 'all') return loaderCategories.all;
    return loaderCategories[activeCategory];
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Complete Loader Library</h1>        
        {/* Category Navigation */}
        <div className="flex !overflow-x-auto sm:justify-center gap-2 mb-8">
          {(Object.keys(loaderCategories) as LoaderCategory[]).map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                activeCategory === category 
                  ? '!bg-blue-500 !text-white' 
                  : '!bg-white !text-gray-700 hover:!bg-gray-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Loader Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {getLoadersToShow().map((type: string, index: number) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow">
              <div className="h-16 w-full flex items-center justify-center mb-2">
                <Loader type={type}/>
              </div>
              <p className="text-sm font-medium text-gray-700 text-center capitalize">{type.replace('-', ' ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoaderLibrary;