import { useState, useCallback, useRef, useEffect } from 'react';

// Using Web Speech API for fallback voice capabilities
export function useVoice(onTranscriptionResult: (text: string) => void) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  // Load voices early to prevent the empty array bug on first click
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      
      const loadVoices = () => {
        voicesRef.current = window.speechSynthesis.getVoices();
      };
      
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

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
    if (!synthRef.current) return;
    
    // Function to actually execute the speech once voices are verified
    const executeSpeech = (availableVoices: SpeechSynthesisVoice[]) => {
      synthRef.current?.cancel(); // cancel current speech
      
      const utterance = new SpeechSynthesisUtterance(text);
      const configuredVoiceId = process.env.NEXT_PUBLIC_FEMALE_VOICE_ID?.toLowerCase() || "samantha";
      const configuredLang = process.env.NEXT_PUBLIC_VOICE_LANGUAGE || "en-US";
      
      utterance.pitch = 1.1; // Slightly higher pitch for female baseline
      utterance.rate = parseFloat(process.env.NEXT_PUBLIC_VOICE_SPEED || "1.0");
      utterance.lang = configuredLang;
      
      // 1. Try exact configured female voice ID match
      let preferredVoice = availableVoices.find(v => v.name.toLowerCase().includes(configuredVoiceId));
      
      // 2. Fallback to generic known female voices
      if (!preferredVoice) {
        const femaleNames = [
          "female", "samantha", "victoria", "karen", "tessa", "zira", "moira", 
          "fiona", "luciana", "veena", "hazel", "catherine", "susan", "amelie", 
          "nicky", "ava", "allison", "joelle", "zoe"
        ];
        preferredVoice = availableVoices.find(v => 
          femaleNames.some(name => v.name.toLowerCase().includes(name)) || 
          v.voiceURI.toLowerCase().includes("female")
        );
      }

      // 3. Last resort fallback: pick the first available English voice, but EXCLUDE known male voices
      if (!preferredVoice && availableVoices.length > 0) {
        const maleNames = ["male", "david", "mark", "daniel", "arthur", "aaron", "bruce", "edward", "alex", "fred", "oliver", "tom", "william"];
        const englishVoices = availableVoices.filter(v => v.lang.startsWith("en") && !maleNames.some(name => v.name.toLowerCase().includes(name)));
        preferredVoice = englishVoices[0] || availableVoices.find(v => v.lang.startsWith("en")) || availableVoices[0];
      }

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthRef.current?.speak(utterance);
    };

    let voices = synthRef.current.getVoices();
    
    // If voices haven't loaded yet (safari/chrome bug), wait briefly
    if (voices.length === 0) {
      let retries = 0;
      const interval = setInterval(() => {
        voices = synthRef.current!.getVoices();
        if (voices.length > 0 || retries > 10) {
          clearInterval(interval);
          executeSpeech(voices);
        }
        retries++;
      }, 100);
    } else {
      executeSpeech(voices);
    }
  }, []);

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
