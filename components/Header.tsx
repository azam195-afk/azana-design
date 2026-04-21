
import React from 'react';

const FilmIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 4h7a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1zm10 0h7a1 1 0 011 1v2a1 1 0 01-1 1h-7a1 1 0 01-1-1V5a1 1 0 011-1z" />
    </svg>
);

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <div className="flex items-center justify-center gap-4">
                 <FilmIcon className="text-purple-400" />
                 <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Text-to-Video Creator
                </h1>
            </div>
            <p className="mt-4 text-lg text-gray-400">
                Craft stunning videos with the power of Gemini AI. Describe your scene, add an image, and watch your vision come to life.
            </p>
        </header>
    );
};
