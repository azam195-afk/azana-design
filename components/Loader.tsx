
import React from 'react';

interface LoaderProps {
    message: string;
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-800/50 rounded-xl border border-gray-700 shadow-lg">
            <div className="relative h-24 w-24">
                <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-purple-500 border-b-purple-500/30 border-l-purple-500/30 animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-4 border-t-pink-500 border-r-pink-500/30 border-b-pink-500 border-l-pink-500/30 animate-spin-reverse"></div>
                <div className="absolute inset-0 flex items-center justify-center text-2xl">📽️</div>
            </div>
            <h2 className="mt-6 text-xl font-semibold text-white">Your video is being created...</h2>
            <p className="mt-2 text-center text-gray-400 max-w-sm">{message}</p>
        </div>
    );
};

// Add custom animations to your tailwind.config.js if you had one,
// but for CDN we can use a style tag.
const style = document.createElement('style');
style.innerHTML = `
    @keyframes spin-reverse {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
    }
    .animate-spin-reverse {
        animation: spin-reverse 1.5s linear infinite;
    }
`;
document.head.appendChild(style);
