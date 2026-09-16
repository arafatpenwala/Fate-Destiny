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
      
      let voices = synthRef.current.getVoices();
      
      // 1. Try exact configured female voice ID match
      let preferredVoice = voices.find(v => v.name.toLowerCase().includes(configuredVoiceId));
      
      // 2. Fallback to generic known female voices
      if (!preferredVoice) {
        const femaleNames = [
          "female", "samantha", "victoria", "karen", "tessa", "zira", "moira", 
          "fiona", "luciana", "veena", "hazel", "catherine", "susan", "amelie", 
          "nicky", "ava", "allison", "joelle", "zoe"
        ];
        preferredVoice = voices.find(v => 
          femaleNames.some(name => v.name.toLowerCase().includes(name)) || 
          v.voiceURI.toLowerCase().includes("female")
        );
      }

      // 3. Last resort fallback: pick the first available English voice, but EXCLUDE known male voices
      if (!preferredVoice && voices.length > 0) {
        const maleNames = ["male", "david", "mark", "daniel", "arthur", "aaron", "bruce", "edward", "alex", "fred", "oliver", "tom", "william"];
        const englishVoices = voices.filter(v => v.lang.startsWith("en") && !maleNames.some(name => v.name.toLowerCase().includes(name)));
        // Try to get a non-male English voice, otherwise just take the first English voice, otherwise the first available
        preferredVoice = englishVoices[0] || voices.find(v => v.lang.startsWith("en")) || voices[0];
      }

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      } else {
        console.warn("No voices found on this device yet. The browser might still be loading them.");
        utterance.voice = null;
      }

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
