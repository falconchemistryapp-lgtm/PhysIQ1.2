import React, { useState, useEffect, useRef } from 'react';
import { getTopicExplanationStream, getTutorResponse, getToolbarResponse, getTextToSpeech } from '../services/geminiService';
import { ChatInput } from './ChatInput';
import { ChatMessageComponent } from './ChatMessage';
import { LoadingSpinner } from './LoadingSpinner';
import type { ChatMessage } from '../types';
import { renderMarkdown } from '../utils/markdownRenderer';
import { decode, decodeAudioData } from '../utils/audioUtils';

interface LearnScreenProps {
    chapter: string;
    topic: string;
}

const SpeakerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>;
const StopIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>;
const AudioLoadingIcon = () => <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>;


export const LearnScreen: React.FC<LearnScreenProps> = ({ chapter, topic }) => {
    const [isLoadingInitial, setIsLoadingInitial] = useState(true);
    const [isResponding, setIsResponding] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [initialExplanation, setInitialExplanation] = useState<string>('');
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [audioState, setAudioState] = useState<'idle' | 'generating' | 'playing'>('idle');
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const explanationRef = useRef<string>('');
    const isPlayingRef = useRef(false);
    
    // Refs to manage chunked TTS playback
    const audioChunksRef = useRef<string[]>([]);
    const currentChunkIndexRef = useRef(0);

    const cleanupAudio = () => {
        isPlayingRef.current = false;
        if (audioSourceRef.current) {
            try {
                audioSourceRef.current.onended = null; // Prevent chained playback on manual stop
                audioSourceRef.current.stop();
                audioSourceRef.current.disconnect();
            } catch (e) {
                // Ignore errors if source is already stopped
            } finally {
                audioSourceRef.current = null;
            }
        }
        currentChunkIndexRef.current = 0;
        audioChunksRef.current = [];
        setAudioState('idle');
    };
    
    // Fetches, decodes, and plays the next audio chunk in sequence.
    // It calls itself via the `onended` event of the AudioBufferSourceNode.
    const playNextAudioChunk = async () => {
        if (!isPlayingRef.current || currentChunkIndexRef.current >= audioChunksRef.current.length) {
            cleanupAudio(); // All chunks have been played or stopped
            return;
        }

        try {
            const chunk = audioChunksRef.current[currentChunkIndexRef.current];
            currentChunkIndexRef.current++;

            if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
                 audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            }
            const audioContext = audioContextRef.current;

            // Show generating spinner only for the very first chunk
            if (currentChunkIndexRef.current === 1) {
                setAudioState('generating');
            }
            
            const base64Audio = await getTextToSpeech(chunk);
            
            // If user clicked stop while we were fetching, abort.
            if (!isPlayingRef.current) {
                return;
            }

            if (!base64Audio) {
                console.warn("Skipping a text chunk that produced no audio.");
                playNextAudioChunk(); // Immediately try to play the next chunk
                return;
            }

            const decodedBytes = decode(base64Audio);
            const audioBuffer = await decodeAudioData(decodedBytes, audioContext, 24000, 1);

            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            
            source.onended = playNextAudioChunk; // Chain the next chunk
            
            source.start();
            audioSourceRef.current = source;
            setAudioState('playing');

        } catch (error) {
            console.error("Failed to play audio chunk:", error);
            alert("An error occurred during audio playback. Please try again.");
            cleanupAudio();
        }
    };

    const handleAudioToggle = async () => {
        if (isPlayingRef.current) {
            cleanupAudio();
            return;
        }

        if (isStreaming || !explanationRef.current) {
            return;
        }

        // Split the full text into smaller, more manageable chunks (e.g., sentences)
        // to ensure a fast initial response for Text-to-Speech.
        const paragraphs = explanationRef.current.split(/\n\s*\n/);
        const chunks = paragraphs.flatMap(p => 
            p.replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
             .split("|")
        )
        .map(chunk => chunk.trim())
        .filter(chunk => chunk.length > 0);

        if (chunks.length === 0) {
            alert("There is no text to read aloud.");
            return;
        }
        
        isPlayingRef.current = true;
        audioChunksRef.current = chunks;
        currentChunkIndexRef.current = 0;
        playNextAudioChunk(); // Start the playback chain
    };
    
    // Effect for fetching explanation
    useEffect(() => {
        const fetchContent = async () => {
            setIsLoadingInitial(true);
            setIsStreaming(true);
            setMessages([]);
            setInitialExplanation('');
            explanationRef.current = '';

            const stream = getTopicExplanationStream(chapter, topic);
            let firstChunk = true;
            for await (const chunk of stream) {
                if (firstChunk) {
                    setIsLoadingInitial(false);
                    firstChunk = false;
                }
                explanationRef.current += chunk;
                setInitialExplanation(prev => prev + chunk);
            }
            setIsStreaming(false);

            if (firstChunk) {
                setIsLoadingInitial(false);
            }
        };
        fetchContent();

        // Cleanup on component unmount or dependency change
        return () => {
            cleanupAudio();
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close().catch(e => console.error("Error closing AudioContext", e));
                audioContextRef.current = null;
            }
        };
    }, [chapter, topic]);


    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (text: string) => {
        const userMessage: ChatMessage = { id: Date.now().toString(), sender: 'user', text };
        setMessages(prev => [...prev, userMessage]);
        setIsResponding(true);

        const aiResponseText = await getTutorResponse(text, chapter);
        const aiMessage: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponseText };
        setMessages(prev => [...prev, aiMessage]);
        setIsResponding(false);
    };

    const handleToolbarAction = async (action: string) => {
        const userMessage: ChatMessage = { id: Date.now().toString(), sender: 'user', text: `Can you ${action} for ${topic}?` };
        setMessages(prev => [...prev, userMessage]);
        setIsResponding(true);

        const aiResponseText = await getToolbarResponse(chapter, topic, action);
        const aiMessage: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponseText };
        setMessages(prev => [...prev, aiMessage]);
        setIsResponding(false);
    };
    
    return (
        // Removed flex-col and h-full constraints to allow natural document scrolling with fixed footer
        <div className="min-h-screen">
            <div className="p-4 md:p-6 pb-40"> {/* Added large bottom padding (pb-40) to clear the fixed ChatInput */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-6">
                        <p className="text-sm text-[color:var(--text-secondary)]">{chapter}</p>
                        <h1 className="text-3xl md:text-4xl font-bold text-[color:var(--text-primary)]">{topic}</h1>
                    </div>
                    {isLoadingInitial ? (
                        <div className="flex flex-col items-center justify-center min-h-[50vh]">
                            <LoadingSpinner />
                            <p className="text-lg text-[color:var(--text-secondary)] mt-4 text-center">Preparing your lesson on {topic}...</p>
                        </div>
                    ) : (
                        <div>
                             <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-[color:var(--text-secondary)]">Explanation</h2>
                                <button
                                    onClick={handleAudioToggle}
                                    disabled={isStreaming}
                                    className="p-2 rounded-full text-[color:var(--text-secondary)] hover:bg-[var(--icon-hover-bg)] hover:text-[color:var(--icon-hover-text)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent-secondary)] disabled:cursor-wait disabled:opacity-50"
                                    aria-label={audioState === 'playing' ? 'Stop audio' : 'Play audio explanation'}
                                >
                                    {audioState === 'generating' && <AudioLoadingIcon />}
                                    {audioState === 'playing' && <StopIcon />}
                                    {audioState === 'idle' && <SpeakerIcon />}
                                </button>
                            </div>
                            <div className="p-6 bg-[var(--card-bg)] rounded-xl shadow-md border border-[var(--card-border)] mb-8">
                                <div 
                                    className="prose prose-sm max-w-none prose-p:my-2 prose-headings:mt-4 prose-headings:mb-2" 
                                    dangerouslySetInnerHTML={renderMarkdown(initialExplanation)} 
                                />
                            </div>
                            
                            {messages.length > 0 && (
                                 <div className="text-center mb-4">
                                    <h2 className="text-xl font-semibold text-[color:var(--text-secondary)]">Follow-up Questions</h2>
                                    <div className="w-20 h-0.5 bg-[var(--card-border)] mx-auto mt-2"></div>
                                </div>
                            )}

                            <div>
                                {messages.map(msg => (
                                    <ChatMessageComponent key={msg.id} message={msg} />
                                ))}
                                {isResponding && (
                                    <div className="flex justify-start">
                                        <LoadingSpinner />
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ChatInput 
                onSendMessage={handleSendMessage} 
                onToolbarAction={handleToolbarAction}
                isLoading={isResponding}
            />
        </div>
    );
};