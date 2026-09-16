import { useState, useCallback, useRef } from 'react';

// Using Web Speech API for fallback voice capabilities
export function useVoice(onTranscriptionResult: (text: string) => void) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize Speech Recognition
  const initRecognition = useCallback(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onTranscriptionResult(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Voice recognition error", event.error);
        setError("Microphone permission denied or error occurred.");
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setError("Speech recognition not supported in this browser.");
    }
  }, [onTranscriptionResult]);

  // Initialize Speech Synthesis
  const initSynthesis = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const startListening = useCallback(() => {
    setError(null);
    if (!recognitionRef.current) initRecognition();
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Error starting recognition", err);
      }
    }
  }, [initRecognition]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  const speakText = useCallback((text: string) => {
    if (!synthRef.current) initSynthesis();
    
    if (synthRef.current) {
      synthRef.current.cancel(); // cancel current speech
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Use Env Config if available, otherwise fallback
      const configuredVoiceId = process.env.NEXT_PUBLIC_FEMALE_VOICE_ID?.toLowerCase() || "samantha";
      const configuredLang = process.env.NEXT_PUBLIC_VOICE_LANGUAGE || "en-US";
      
      utterance.pitch = 1.1; // Slightly higher pitch for female baseline
      utterance.rate = parseFloat(process.env.NEXT_PUBLIC_VOICE_SPEED || "1.0");
      utterance.lang = configuredLang;
      
      const voices = synthRef.current.getVoices();
      
      // 1. Try exact configured female voice ID match
      let preferredVoice = voices.find(v => v.name.toLowerCase().includes(configuredVoiceId));
      
      // 2. Fallback to generic known female voices
      if (!preferredVoice) {
        preferredVoice = voices.find(v => 
          v.name.toLowerCase().includes("female") || 
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("victoria") ||
          v.name.toLowerCase().includes("karen") ||
          v.name.toLowerCase().includes("tessa") ||
          v.name.toLowerCase().includes("zira") // Windows female voice
        );
      }

      // If absolutely no female voice is found, abort speech to strictly enforce "Female Only"
      if (!preferredVoice) {
        console.warn("No female voice found on this device. Falling back to text-only mode.");
        return; 
      }

      utterance.voice = preferredVoice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthRef.current.speak(utterance);
    }
  }, [initSynthesis]);

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    isListening,
    isSpeaking,
    error,
    startListening,
    stopListening,
    speakText,
    stopSpeaking
  };
}
