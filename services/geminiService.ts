
import { GoogleGenAI } from "@google/genai";
import type { Duration } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PROGRESS_MESSAGES = [
    "Warming up the creative engines...",
    "Gathering stardust and pixels...",
    "Directing the digital actors...",
    "Compositing the main scenes...",
    "Rendering the first few frames...",
    "Applying cinematic filters...",
    "Syncing audio and visuals (just kidding!)...",
    "Adding the final touches of magic...",
    "Almost there, preparing for the premiere!"
];

const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
};

export const generateVideo = async (
    prompt: string,
    image: File | null,
    duration: Duration,
    onProgress: (message: string) => void
): Promise<string> => {
    
    const requestPayload: any = {
        model: 'veo-2.0-generate-001',
        prompt: `${prompt}, 9:16 aspect ratio`,
        config: {
            numberOfVideos: 1,
            videoLengthInSeconds: duration,
        }
    };

    if (image) {
        const imagePart = await fileToGenerativePart(image);
        requestPayload.image = {
            imageBytes: imagePart.inlineData.data,
            mimeType: imagePart.inlineData.mimeType,
        };
    }
    
    let operation = await ai.models.generateVideos(requestPayload);
    
    let messageIndex = 0;
    onProgress(PROGRESS_MESSAGES[messageIndex]);

    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        
        messageIndex = (messageIndex + 1) % PROGRESS_MESSAGES.length;
        onProgress(PROGRESS_MESSAGES[messageIndex]);
        
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    
    onProgress("Finalizing your video...");

    if (operation.error) {
        throw new Error(operation.error.message || 'An unknown error occurred during video generation.');
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

    if (!downloadLink) {
        throw new Error("Video generation succeeded but no download link was provided.");
    }
    
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch video file: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    return URL.createObjectURL(blob);
};
