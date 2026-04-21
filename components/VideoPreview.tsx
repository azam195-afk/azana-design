
import React from 'react';

interface VideoPreviewProps {
    videoUrl: string;
    onReset: () => void;
}

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const RefreshIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0112 3v0a9 9 0 019 9h-3a6 6 0 00-6-6v0a6 6 0 00-5.2 3L4 10" />
 </svg>
);


export const VideoPreview: React.FC<VideoPreviewProps> = ({ videoUrl, onReset }) => {
    return (
        <div className="flex flex-col items-center space-y-6 bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-purple-500">
                Your Masterpiece is Ready!
            </h2>
            <div className="w-full max-w-xs rounded-xl overflow-hidden shadow-2xl border-2 border-purple-500/50">
                 <video
                    src={videoUrl}
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-contain aspect-[9/16]"
                />
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-4">
                <a
                    href={videoUrl}
                    download="gemini-video.mp4"
                    className="flex-1 flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
                >
                    <DownloadIcon />
                    Download Video
                </a>
                <button
                    onClick={onReset}
                    className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-600 rounded-lg shadow-sm text-base font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500"
                >
                    <RefreshIcon />
                    Create Another
                </button>
            </div>
        </div>
    );
};
