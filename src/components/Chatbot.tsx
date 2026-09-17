"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Minus, Sparkles, Send, Mic, MicOff, Volume2, CheckCircle, Copy, RotateCcw, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVoice } from "../hooks/useVoice";
import ReactMarkdown from "react-markdown";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  toolUsed?: string;
  options?: string[];
};

const INITIAL_MESSAGE: Message = {
  id: "msg_welcome",
  sender: "bot",
  text: "Welcome to FATE&DESTINY.\nI’m your AI assistant. I can help you explore our digital solutions, understand what your business needs, or answer any questions you have.\n\nWhat would you like to explore?"
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  
  // Voice Hook
  const { isListening, isSpeaking, error: voiceError, startListening, stopListening, speakText, stopSpeaking } = useVoice(handleVoiceTranscription);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasSpokenWelcomeRef = useRef(false);

  useEffect(() => {
    if (messagesEndRef.current && isOpen && !isMinimized) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 150); // Slightly longer timeout to ensure buttons are fully painted
    }
  }, [messages, isOpen, isMinimized, isProcessing]);

  // Speak the welcome message when the chatbot is first opened
  useEffect(() => {
    if (isOpen && !hasSpokenWelcomeRef.current) {
      hasSpokenWelcomeRef.current = true;
      speakText(INITIAL_MESSAGE.text);
    }
  }, [isOpen, speakText]);

  function handleVoiceTranscription(text: string) {
    if (text.trim()) {
      handleSendMessage(text);
    }
  }

  const toggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      stopSpeaking();
      startListening();
    }
  };

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim() || isProcessing) return;

    stopSpeaking();
    
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsProcessing(true);

    try {
      // Send pageContext (current URL) to backend
      const pageContext = typeof window !== 'undefined' ? window.location.href : "";
      
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId, pageContext })
      });
      
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        sender: "bot", 
        text: data.text, 
        toolUsed: data.toolUsed,
        options: data.options 
      };
      setMessages((prev) => [...prev, botMsg]);
      
      speakText(data.text);
      
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "bot", text: "I'm experiencing a communication error. Please try again." }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearConversation = async (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setMessages([INITIAL_MESSAGE]);
    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, action: "clear" })
      });
    } catch (e) {
      console.error("Failed to clear backend memory");
    }
  };

  const handleRegenerate = async () => {
    // Find last user message
    const lastUserMsg = [...messages].reverse().find(m => m.sender === "user");
    if (lastUserMsg) {
      handleSendMessage(lastUserMsg.text);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Human Handoff Form
  const [isHandoff, setIsHandoff] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", description: "", service: "Consultation" });
  const [handoffSuccess, setHandoffSuccess] = useState(false);

  const handleHandoffSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      setHandoffSuccess(true);
      
      // Redirect to WhatsApp
      const text = `Hello FATE&DESTINY,\n\nMy name is ${formData.name}.\nEmail: ${formData.email}\n\nMessage:\n${formData.description}`;
      window.open(`https://wa.me/919372132828?text=${encodeURIComponent(text)}`, "_blank");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end font-inter">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            className="w-[92vw] sm:w-[420px] h-[75vh] sm:h-[85vh] max-h-[750px] bg-[#050505]/90 backdrop-blur-2xl border border-[#1A1A1A] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col mb-4 md:mb-6 relative"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(158,133,87,0.1)_0%,_transparent_70%)] pointer-events-none" />

            {/* Header */}
            <div className="bg-gradient-to-r from-[#0A0A0A] to-[#151515] border-b border-[#1A1A1A] p-4 flex items-center justify-between shrink-0 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#050505] border border-[#9E8557]/40 flex items-center justify-center relative overflow-hidden">
                  <Sparkles className="w-4 h-4 text-[#9E8557]" />
                  {(isListening || isSpeaking || isProcessing) && (
                    <div className="absolute inset-0 bg-[#9E8557]/20 animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="text-[#F5F0E6] font-abeezee text-lg leading-tight uppercase tracking-wide whitespace-nowrap">AI Assistant</h3>
                  <span className="text-[#9E8557] font-inter text-[9px] uppercase tracking-[0.2em] flex items-center gap-1 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9E8557] animate-pulse shrink-0" />
                    Agentic System
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => handleClearConversation(e)} onTouchEnd={(e) => handleClearConversation(e)} title="Clear Conversation" className="p-3 -m-1 text-[#858585] hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                <button onClick={() => { setIsMinimized(true); stopSpeaking(); }} className="p-2 text-[#858585] hover:text-[#F5F0E6] transition-colors"><Minus className="w-5 h-5" /></button>
                <button onClick={() => { setIsOpen(false); stopSpeaking(); }} className="p-2 text-[#858585] hover:text-[#F5F0E6] transition-colors"><X className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Visual State Orb */}
            <AnimatePresence>
              {(isListening || isSpeaking || isProcessing) && !isHandoff && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 60, opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="w-full flex items-center justify-center border-b border-[#1A1A1A] bg-[#0A0A0A]/50 relative z-10"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-[10px] uppercase text-[#9E8557] tracking-wider">
                      {isListening ? "Listening..." : isProcessing ? "Processing..." : "Speaking"}
                    </div>
                    <div className="relative flex items-center justify-center w-8 h-8">
                      <div className={`absolute inset-0 rounded-full bg-[#9E8557]/30 blur-md ${isListening || isSpeaking ? 'animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]' : 'animate-pulse'}`} />
                      <div className="w-3 h-3 rounded-full bg-[#9E8557] relative z-10" />
                    </div>
                    {isSpeaking && (
                      <button onClick={stopSpeaking} className="text-[#858585] hover:text-[#F5F0E6] ml-2">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-5 scrollbar-thin scrollbar-thumb-[#1A1A1A] scrollbar-track-transparent relative z-10">
              
              {!isHandoff ? (
                <>
                  {messages.map((msg, idx) => (
                    <div key={msg.id} className={`flex flex-col w-full ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`max-w-[90%] rounded-2xl p-4 relative ${
                          msg.sender === "user" 
                            ? "bg-[#151515] text-[#F5F0E6] rounded-br-sm border border-[#222]" 
                            : "bg-gradient-to-br from-[#111] to-[#050505] text-[#DCDCDC] rounded-bl-sm border border-[#9E8557]/30 shadow-[0_4px_20px_rgba(158,133,87,0.05)]"
                        }`}
                      >
                        {msg.toolUsed && (
                          <div className="absolute -top-3 left-4 bg-[#0A0A0A] border border-[#9E8557]/50 px-2 py-0.5 rounded text-[8px] text-[#9E8557] uppercase flex items-center gap-1">
                            <Sparkles className="w-2 h-2" /> Tool: {msg.toolUsed}
                          </div>
                        )}
                        <div className="text-[13px] leading-relaxed prose prose-invert prose-p:my-1 prose-a:text-[#9E8557] prose-strong:text-[#F5F0E6] prose-code:text-[#9E8557] prose-code:bg-[#1A1A1A] prose-code:px-1 prose-code:rounded prose-pre:bg-[#0A0A0A] prose-pre:border prose-pre:border-[#222]">
                          {msg.sender === 'bot' ? (
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                          ) : (
                            <p>{msg.text}</p>
                          )}
                        </div>
                      </motion.div>
                      
                      {/* Dynamic Options returned from backend */}
                      {msg.options && (
                        <div className={`flex flex-wrap gap-2 mt-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                          {msg.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                              if (option === "Contact FATE&DESTINY" || option === "Contact Us" || option === "💬 I want to speak with the team") {
                                setIsHandoff(true);
                              } else {
                                handleSendMessage(option);
                              }
                              }}
                              disabled={isProcessing}
                              className="px-3 py-1.5 rounded-full border border-[#9E8557]/40 bg-[#0A0A0A] text-[#9E8557] text-[11px] font-medium tracking-wide hover:bg-[#9E8557] hover:text-[#050505] transition-colors disabled:opacity-50"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {/* Action Buttons (Only for Bot) */}
                      {msg.sender === "bot" && idx > 0 && (
                        <div className="flex items-center gap-3 mt-1.5 ml-2 text-[#666]">
                          <button onClick={() => handleCopy(msg.text)} className="flex items-center gap-1 hover:text-[#9E8557] transition-colors text-[10px]">
                            <Copy className="w-3 h-3" /> Copy
                          </button>
                          {idx === messages.length - 1 && (
                            <button onClick={handleRegenerate} disabled={isProcessing} className="flex items-center gap-1 hover:text-[#9E8557] transition-colors text-[10px] disabled:opacity-50">
                              <RotateCcw className="w-3 h-3" /> Regenerate
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="flex w-full justify-start">
                      <div className="bg-gradient-to-br from-[#111] to-[#050505] rounded-2xl rounded-bl-sm border border-[#9E8557]/30 p-4 flex gap-1">
                        <span className="w-1.5 h-1.5 bg-[#9E8557] rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-[#9E8557] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <span className="w-1.5 h-1.5 bg-[#9E8557] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex flex-col justify-center">
                  {!handoffSuccess ? (
                    <form onSubmit={handleHandoffSubmit} className="flex flex-col gap-4 bg-[#0A0A0A] p-6 rounded-xl border border-[#1A1A1A]">
                      <h4 className="text-[#F5F0E6] font-abeezee uppercase text-lg mb-2">Connect with us</h4>
                      <input type="text" placeholder="Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#050505] border border-[#222] rounded-lg px-4 py-3 text-[13px] text-[#F5F0E6] focus:border-[#9E8557] focus:outline-none" />
                      <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#050505] border border-[#222] rounded-lg px-4 py-3 text-[13px] text-[#F5F0E6] focus:border-[#9E8557] focus:outline-none" />
                      <textarea placeholder="How can we help?" required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#050505] border border-[#222] rounded-lg px-4 py-3 text-[13px] text-[#F5F0E6] focus:border-[#9E8557] focus:outline-none resize-none" />
                      <button type="submit" className="w-full bg-[#9E8557] text-[#050505] py-3 rounded-lg text-[12px] font-bold uppercase tracking-wider hover:bg-[#C5A46D] transition-colors mt-2">Submit Request</button>
                      <button type="button" onClick={() => setIsHandoff(false)} className="w-full bg-transparent border border-[#333] text-[#858585] py-3 rounded-lg text-[12px] uppercase tracking-wider hover:bg-[#151515] hover:text-[#F5F0E6] transition-colors mt-2">Back to AI Chat</button>
                    </form>
                  ) : (
                    <div className="text-center p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl flex flex-col items-center">
                      <CheckCircle className="w-12 h-12 text-[#9E8557] mb-4" />
                      <h4 className="text-[#F5F0E6] font-abeezee text-lg mb-2">Request Received</h4>
                      <p className="text-[12px] text-[#858585]">Our team will contact you shortly.</p>
                      <button onClick={() => {setIsHandoff(false); setHandoffSuccess(false);}} className="mt-6 text-[#9E8557] text-[11px] uppercase underline">Return to AI Chat</button>
                    </div>
                  )}
                </div>
              )}
              
              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} className="h-4 w-full shrink-0" />
            </div>

            {/* Voice Error Notice */}
            {voiceError && (
              <div className="bg-red-900/20 border-t border-red-900/50 p-2 text-center text-red-400 text-[10px] relative z-10">
                {voiceError}
              </div>
            )}

            {/* Persistent Service Buttons */}
            {!isHandoff && (
              <div className="px-4 py-3 bg-[#0A0A0A] border-t border-[#1A1A1A] flex gap-2 overflow-x-auto scrollbar-none relative z-10 shrink-0">
                {["🚀 I need a premium website", "⚙️ I want AI automation", "🤖 I need an AI agent", "💰 What does it cost?", "📈 How can AI improve my business?", "💬 I want to speak with the team", "✨ Not sure what I need?"].map((service) => (
                  <button
                    key={service}
                    onClick={() => {
                      if (service === "💬 I want to speak with the team") {
                        setIsHandoff(true);
                      } else {
                        handleSendMessage(service);
                      }
                    }}
                    disabled={isProcessing}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full border border-[#9E8557]/30 bg-[#050505] text-[#9E8557] text-[10px] uppercase tracking-wider hover:bg-[#9E8557]/10 hover:border-[#9E8557] transition-colors disabled:opacity-50"
                  >
                    {service}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            {!isHandoff && (
              <div className="p-4 pt-1 bg-[#0A0A0A] relative z-10 shrink-0">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} 
                  className="flex items-center gap-2 relative bg-[#050505] border border-[#222] rounded-full pr-1 pl-4"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Message the AI Assistant..."
                    className="flex-1 bg-transparent py-3.5 text-[13px] text-[#F5F0E6] placeholder:text-[#555] focus:outline-none"
                    disabled={isProcessing}
                  />
                  <div className="flex items-center gap-1 py-1">
                    <button
                      type="button"
                      onClick={toggleMic}
                      className={`p-2.5 rounded-full transition-all ${isListening ? 'bg-[#9E8557]/20 text-[#9E8557]' : 'text-[#858585] hover:text-[#F5F0E6] hover:bg-[#151515]'}`}
                      aria-label="Voice input"
                    >
                      {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </button>
                    <button
                      type="submit"
                      disabled={!inputValue.trim() || isProcessing}
                      className="p-2.5 rounded-full bg-[#9E8557] text-[#050505] disabled:opacity-50 disabled:bg-[#222] disabled:text-[#555] transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}
            
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <AnimatePresence>
        {(!isOpen || isMinimized) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { 
              setIsOpen(true); 
              setIsMinimized(false); 
              if (!hasSpokenWelcomeRef.current) {
                hasSpokenWelcomeRef.current = true;
                speakText(INITIAL_MESSAGE.text);
              }
            }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#050505] border border-[#9E8557]/40 shadow-[0_0_30px_rgba(158,133,87,0.15)] flex items-center justify-center text-[#9E8557] hover:text-[#F5F0E6] transition-colors z-50 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#151515] to-[#0A0A0A] z-0" />
            <div className="relative z-10">
              <MessageSquare className="w-8 h-8 md:w-9 md:h-9" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#9E8557] border-2 border-[#050505] group-hover:animate-ping" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
