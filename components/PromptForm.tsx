
import React, { useState, useCallback, useRef } from 'react';
import type { Duration } from '../types';

interface PromptFormProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    image: File | null;
    setImage: (image: File | null) => void;
    duration: Duration;
    setDuration: (duration: Duration) => void;
    onSubmit: () => void;
    isLoading: boolean;
}

const DURATIONS: Duration[] = [5, 6, 7, 8];

const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);


export const PromptForm: React.FC<PromptFormProps> = ({ prompt, setPrompt, image, setImage, duration, setDuration, onSubmit, isLoading }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [setImage]);

    const handleRemoveImage = () => {
        setImage(null);
        setImagePreview(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-6 bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg">
            <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
                    1. Describe your video
                </label>
                <textarea
                    id="prompt"
                    rows={4}
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 placeholder-gray-500"
                    placeholder="e.g., A cinematic shot of a futuristic city at night, flying cars, neon lights"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isLoading}
                />
            </div>

            <div>
                 <label className="block text-sm font-medium text-gray-300 mb-2">
                    2. Add a starting image (optional)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        {imagePreview ? (
                            <div className="relative group">
                                <img src={imagePreview} alt="Image preview" className="mx-auto h-32 w-auto rounded-md" />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                                    <button onClick={handleRemoveImage} className="text-white p-2 bg-red-600 rounded-full hover:bg-red-700">
                                        <TrashIcon />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <UploadIcon className="mx-auto h-12 w-12 text-gray-500" />
                                <div className="flex text-sm text-gray-400">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-purple-400 hover:text-purple-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:ring-purple-500 p-1">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} ref={fileInputRef} disabled={isLoading} />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                           </>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    3. Choose duration (9:16 aspect ratio is locked)
                </label>
                <div className="flex space-x-2">
                    {DURATIONS.map((d) => (
                        <button
                            key={d}
                            onClick={() => setDuration(d)}
                            disabled={isLoading}
                            className={`w-full py-2 px-4 rounded-md text-sm font-semibold transition-all duration-200 ${
                                duration === d
                                    ? 'bg-purple-600 text-white shadow-lg ring-2 ring-purple-400'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {d} sec
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={onSubmit}
                disabled={isLoading || !prompt.trim()}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                    </>
                ) : '✨ Generate Video'}
            </button>
        </div>
    );
};
