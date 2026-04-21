
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { Loader } from './components/Loader';
import { VideoPreview } from './components/VideoPreview';
import { generateVideo } from './services/geminiService';
import type { GenerationState, Duration } from './types';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [duration, setDuration] = useState<Duration>(5);
    const [generationState, setGenerationState] = useState<GenerationState>('idle');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [progressMessage, setProgressMessage] = useState<string>('');

    const handleGenerate = useCallback(async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt.');
            return;
        }
        
        setError(null);
        setGenerationState('generating');
        setVideoUrl(null);

        try {
            const url = await generateVideo(prompt, image, duration, setProgressMessage);
            setVideoUrl(url);
            setGenerationState('success');
        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Video generation failed: ${errorMessage}`);
            setGenerationState('error');
        }
    }, [prompt, image, duration]);

    const handleReset = () => {
        setPrompt('');
        setImage(null);
        setDuration(5);
        setGenerationState('idle');
        setVideoUrl(null);
        setError(null);
        setProgressMessage('');
    };

    const renderContent = () => {
        switch (generationState) {
            case 'generating':
                return <Loader message={progressMessage} />;
            case 'success':
                return videoUrl && <VideoPreview videoUrl={videoUrl} onReset={handleReset} />;
            case 'idle':
            case 'error':
            default:
                return (
                    <>
                        {error && (
                            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
                                <strong className="font-bold">Error: </strong>
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                        <PromptForm
                            prompt={prompt}
                            setPrompt={setPrompt}
                            image={image}
                            setImage={setImage}
                            duration={duration}
                            setDuration={setDuration}
                            onSubmit={handleGenerate}
                            // FIX: The `isLoading` prop is set to `false`. The original comparison `generationState === 'generating'`
                            // is always false here due to type narrowing in the switch statement, which caused an error.
                            // The loading state is handled by replacing this form with the `Loader` component.
                            isLoading={false}
                        />
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-2xl">
                <Header />
                <main className="mt-8">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default App;
