"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Minus, Sparkles, Send, CheckCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  isQuickReply?: boolean;
};

const FAQ_DATA: Record<string, string> = {
  "Explore Services": "We offer premium website development, website redesign, AI-powered digital experiences, SEO, AI creative services, and website maintenance.",
  "Premium Website Development": "FATE&DESTINY creates premium, responsive websites designed to present businesses professionally and help visitors take meaningful action.",
  "Website Redesign": "We transform outdated websites into modern, mobile-friendly digital experiences.",
  "AI-Powered Experiences": "We create intelligent web features designed to assist users and enhance interactions.",
  "SEO & Visibility": "We provide foundational search optimization that helps search engines understand your website.",
  "Creative & Content": "We create AI-assisted visuals, promotional assets, website copy, and content concepts to support modern marketing campaigns.",
  "What services do you offer?": "We offer premium website development, website redesign, AI-powered digital experiences, SEO, AI creative services, and website maintenance.",
  "Do you work with international clients?": "FATE&DESTINY is presented as a digital solutions brand for businesses worldwide. Project availability, communication, timelines, and delivery requirements can be discussed during consultation.",
  "How can I start a project?": "You can submit your name, email, company information, required service, and project details through the consultation form. Our team can then review your requirements.",
  "Do you provide custom solutions?": "Yes. The final solution depends on your business goals, budget, and technical requirements.",
  "Can you guarantee Google rankings?": "No. We can provide foundational SEO setup and optimization, but search-engine rankings and indexing cannot be guaranteed.",
  "How much does a project cost?": "Project pricing depends on the service, complexity, integrations, content, number of pages, and delivery requirements. Please submit a consultation request for a tailored estimate.",
};

const INITIAL_MESSAGE: Message = {
  id: "msg_welcome",
  sender: "bot",
  text: "Welcome to FATE&DESTINY. I'm your digital assistant. I can help you explore our website development, redesign, AI experiences, creative services, and SEO solutions. What would you like to discover?",
};

const MAIN_OPTIONS = [
  "Explore Services",
  "Premium Website Development",
  "Website Redesign",
  "AI-Powered Experiences",
  "SEO & Visibility",
  "Request a Consultation",
  "Contact FATE&DESTINY"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [showOptions, setShowOptions] = useState(true);
  const [isConsultationMode, setIsConsultationMode] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    description: "",
    budget: "",
    contactMethod: ""
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current && isOpen && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized, showOptions, isConsultationMode]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
  };

  const handleOptionClick = (option: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: option,
      isQuickReply: true
    };
    
    setMessages(prev => [...prev, userMsg]);
    setShowOptions(false);

    if (option === "Request a Consultation" || option === "Contact FATE&DESTINY") {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Excellent. Please provide your details below so our team can review your requirements."
        }]);
        setIsConsultationMode(true);
      }, 500);
      return;
    }

    // Handle standard FAQ
    setTimeout(() => {
      const response = FAQ_DATA[option] || "I'm not certain about that. Please contact FATE&DESTINY directly so the requirement can be reviewed.";
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: response
      }]);
      setTimeout(() => setShowOptions(true), 500);
    }, 600);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData.service) errors.service = "Please select a required service";
    if (!formData.description.trim()) errors.description = "Project description is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const phoneNumber = "919372132828";
      const message = `*New Consultation Request*
*Name:* ${formData.name}
*Email:* ${formData.email}
*Company:* ${formData.company || 'N/A'}
*Service:* ${formData.service}
*Description:* ${formData.description}`;
      
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      setFormSubmitted(true);
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: "bot",
        text: "Thank you! Redirecting you to WhatsApp to securely submit your request."
      }]);
    }
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setShowOptions(true);
    setIsConsultationMode(false);
    setFormSubmitted(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      service: "",
      description: "",
      budget: "",
      contactMethod: ""
    });
  };

  return (
    <div className="fixed bottom-10 right-6 md:bottom-12 md:right-8 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            className="w-[90vw] max-w-[400px] sm:w-[400px] h-[80vh] max-h-[700px] bg-[#050505] border border-[#1A1A1A] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col mb-6"
            role="dialog"
            aria-label="FATE&DESTINY Digital Assistant"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0A0A0A] to-[#151515] border-b border-[#1A1A1A] p-4 flex items-center justify-between shrink-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,_rgba(158,133,87,0.15)_0%,_transparent_70%)] pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#9E8557]/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#9E8557]" />
                </div>
                <div>
                  <h3 className="text-[#F5F0E6] font-abeezee text-lg leading-tight uppercase tracking-wide">F&D Assistant</h3>
                  <span className="text-[#9E8557] font-inter text-[9px] uppercase tracking-[0.2em] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9E8557] animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 relative z-10">
                <button 
                  onClick={handleMinimize}
                  className="p-2 text-[#858585] hover:text-[#F5F0E6] transition-colors focus:outline-none focus:ring-1 focus:ring-[#9E8557] rounded-md"
                  aria-label="Minimize Chat"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleClose}
                  className="p-2 text-[#858585] hover:text-[#F5F0E6] transition-colors focus:outline-none focus:ring-1 focus:ring-[#9E8557] rounded-md"
                  aria-label="Close Chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#050505] flex flex-col gap-4 scrollbar-thin scrollbar-thumb-[#1A1A1A] scrollbar-track-transparent"
            >
              
              {messages.map((msg, idx) => (
                <div key={msg.id} className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`max-w-[85%] rounded-2xl p-4 ${
                      msg.sender === "user" 
                        ? "bg-[#151515] text-[#F5F0E6] rounded-br-sm border border-[#1A1A1A]" 
                        : "bg-gradient-to-br from-[#0A0A0A] to-[#050505] text-[#9B9B9B] rounded-bl-sm border border-[#9E8557]/20 shadow-[0_4px_20px_rgba(158,133,87,0.05)]"
                    }`}
                  >
                    <p className={`font-inter text-[12px] leading-relaxed ${msg.sender === "user" ? "" : "text-[#DCDCDC]"}`}>
                      {msg.text}
                    </p>
                  </motion.div>
                </div>
              ))}

              {/* Consultation Form Mode */}
              {isConsultationMode && !formSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-5 mt-2"
                >
                  <div className="mb-4 pb-4 border-b border-[#1A1A1A]">
                    <h4 className="text-[#F5F0E6] font-abeezee uppercase text-sm mb-1">Consultation Request</h4>
                    <p className="text-[#858585] font-inter text-[10px] tracking-wider uppercase">Secure Data Entry</p>
                  </div>
                  
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                    
                    <div>
                      <label className="block text-[#9B9B9B] font-inter text-[10px] uppercase tracking-wider mb-1">Full Name *</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleFormChange}
                        className={`w-full bg-[#050505] border ${formErrors.name ? 'border-red-900/50 focus:border-red-700' : 'border-[#1A1A1A] focus:border-[#9E8557]'} rounded-lg px-4 py-2.5 text-[#F5F0E6] text-[13px] font-inter focus:outline-none transition-colors`}
                        placeholder="Full Name"
                      />
                      {formErrors.name && <span className="text-red-500 text-[9px] font-inter mt-1 block">{formErrors.name}</span>}
                    </div>

                    <div>
                      <label className="block text-[#9B9B9B] font-inter text-[10px] uppercase tracking-wider mb-1">Email Address *</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleFormChange}
                        className={`w-full bg-[#050505] border ${formErrors.email ? 'border-red-900/50 focus:border-red-700' : 'border-[#1A1A1A] focus:border-[#9E8557]'} rounded-lg px-4 py-2.5 text-[#F5F0E6] text-[13px] font-inter focus:outline-none transition-colors`}
                        placeholder="Gmail"
                      />
                      {formErrors.email && <span className="text-red-500 text-[9px] font-inter mt-1 block">{formErrors.email}</span>}
                    </div>

                    <div>
                      <label className="block text-[#9B9B9B] font-inter text-[10px] uppercase tracking-wider mb-1">Company Name</label>
                      <input 
                        type="text" 
                        name="company" 
                        value={formData.company} 
                        onChange={handleFormChange}
                        className="w-full bg-[#050505] border border-[#1A1A1A] focus:border-[#9E8557] rounded-lg px-4 py-2.5 text-[#F5F0E6] text-[13px] font-inter focus:outline-none transition-colors"
                        placeholder="Optional"
                      />
                    </div>

                    <div>
                      <label className="block text-[#9B9B9B] font-inter text-[10px] uppercase tracking-wider mb-1">Required Service *</label>
                      <select 
                        name="service" 
                        value={formData.service} 
                        onChange={handleFormChange}
                        className={`w-full bg-[#050505] border ${formErrors.service ? 'border-red-900/50 focus:border-red-700' : 'border-[#1A1A1A] focus:border-[#9E8557]'} rounded-lg px-4 py-2.5 text-[#F5F0E6] text-[13px] font-inter focus:outline-none transition-colors appearance-none`}
                      >
                        <option value="" disabled>Select a service...</option>
                        <option value="Premium Website Development">Premium Website Development</option>
                        <option value="Website Redesign">Website Redesign</option>
                        <option value="AI-Powered Experiences">AI-Powered Experiences</option>
                        <option value="SEO & Visibility">SEO & Visibility</option>
                        <option value="AI Creative & Content">AI Creative & Content</option>
                        <option value="Website Maintenance">Website Maintenance</option>
                        <option value="Other">Other</option>
                      </select>
                      {formErrors.service && <span className="text-red-500 text-[9px] font-inter mt-1 block">{formErrors.service}</span>}
                    </div>

                    <div>
                      <label className="block text-[#9B9B9B] font-inter text-[10px] uppercase tracking-wider mb-1">Project Description *</label>
                      <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleFormChange}
                        rows={3}
                        className={`w-full bg-[#050505] border ${formErrors.description ? 'border-red-900/50 focus:border-red-700' : 'border-[#1A1A1A] focus:border-[#9E8557]'} rounded-lg px-4 py-2.5 text-[#F5F0E6] text-[13px] font-inter focus:outline-none transition-colors resize-none`}
                        placeholder="Briefly describe your requirements..."
                      />
                      {formErrors.description && <span className="text-red-500 text-[9px] font-inter mt-1 block">{formErrors.description}</span>}
                    </div>

                    <div className="pt-2">
                      <p className="text-[#858585] text-[9px] font-inter mb-4 leading-relaxed">
                        Privacy Notice: By submitting this form, you agree to allow FATE&DESTINY to securely store your contact details for the sole purpose of responding to your inquiry.
                      </p>
                      <button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#9E8557] to-[#7A643B] text-[#050505] font-inter text-[11px] font-semibold uppercase tracking-[0.1em] py-3.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#9E8557] focus:ring-offset-2 focus:ring-offset-[#050505]"
                      >
                        Submit Request <Send className="w-3 h-3" />
                      </button>
                    </div>

                  </form>
                </motion.div>
              )}

              {/* Form Submitted Success Notice */}
              {formSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full bg-[#151515] border border-[#1A1A1A] rounded-xl p-6 mt-2 flex flex-col items-center text-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#050505] border border-[#9E8557]/30 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-[#9E8557]" />
                  </div>
                  <div>
                    <h4 className="text-[#F5F0E6] font-abeezee uppercase text-lg mb-2">Request Processed</h4>
                    <p className="text-[#858585] font-inter text-[11px] leading-relaxed mb-4">
                      Your details have been successfully prepared. If your WhatsApp didn't open automatically, you can reach us directly at:
                    </p>
                    <p className="text-[#858585] font-inter text-[11px] leading-relaxed">
                      WhatsApp: <a href="https://wa.me/919372132828" target="_blank" rel="noopener noreferrer" className="text-[#F5F0E6] hover:text-[#9E8557] underline">+91 93721 32828</a>
                      <br/>
                      Email: <a href="mailto:fatedestinyofficials@gmail.com" className="text-[#F5F0E6] hover:text-[#9E8557] underline mt-1 inline-block">fatedestinyofficials@gmail.com</a>
                    </p>
                  </div>
                  <button 
                    onClick={resetChat}
                    className="mt-2 text-[#9E8557] font-inter text-[10px] uppercase tracking-wider hover:text-[#F5F0E6] transition-colors"
                  >
                    Reset Conversation
                  </button>
                </motion.div>
              )}

              {/* Quick Reply Options */}
              {showOptions && !isConsultationMode && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {MAIN_OPTIONS.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(opt)}
                      className="bg-[#0A0A0A] border border-[#1A1A1A] text-[#DCDCDC] hover:border-[#9E8557]/50 hover:bg-[#151515] hover:text-[#F5F0E6] transition-all rounded-full px-4 py-2 text-[11px] font-inter text-left focus:outline-none focus:ring-1 focus:ring-[#9E8557]"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer / Disclaimer */}
            <div className="bg-[#050505] border-t border-[#1A1A1A] p-3 text-center shrink-0">
              <p className="text-[#555555] font-inter text-[9px] uppercase tracking-wider">
                FATE&DESTINY DIGITAL ASSISTANT v1.0
              </p>
            </div>
            
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
            onClick={handleOpen}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#151515] to-[#0A0A0A] border border-[#9E8557]/30 shadow-[0_0_30px_rgba(158,133,87,0.15)] flex items-center justify-center text-[#9E8557] hover:text-[#F5F0E6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#9E8557] focus:ring-offset-2 focus:ring-offset-[#050505] z-50 group"
            aria-label="Open Digital Assistant"
          >
            <div className="relative">
              <MessageSquare className="w-8 h-8 md:w-9 md:h-9" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#9E8557] border-2 border-[#050505] group-hover:animate-ping" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
      
    </div>
  );
}
