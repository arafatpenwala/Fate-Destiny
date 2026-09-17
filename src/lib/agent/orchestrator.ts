type AgentResponse = {
  text: string;
  toolUsed?: string;
  options?: string[];
};

export async function processUserMessage(
  message: string, 
  history: any[] = [], 
  pageContext: string = ""
): Promise<AgentResponse> {
  const response = await _processUserMessage(message, history, pageContext);
  
  if (!response.options) {
    response.options = [];
  }
  if (!response.options.includes("What services do you offer?")) {
    response.options.push("What services do you offer?");
  }
  
  return response;
}

async function _processUserMessage(
  message: string, 
  history: any[] = [], 
  pageContext: string = ""
): Promise<AgentResponse> {
  const lowerMsg = message.trim().toLowerCase();
  
  // Normalize input: lowercased, no punctuation, trimmed, single spaces
  const normalizedMsg = lowerMsg.replace(/[.,!?]/g, "").replace(/\s+/g, " ").trim();
  const lastMsg = history.length > 0 ? history[history.length - 1].text.toLowerCase().replace(/[.,!?]/g, "") : "";

  // 1. LEAD CONVERSATION (State Machine)
  const isHire = /hire you|work with you|start a project|talk to someone|contact you|i want to hire you/.test(normalizedMsg) && !normalizedMsg.includes("how");
  if (isHire || normalizedMsg === "i want to speak with the team" || normalizedMsg === "💬 i want to speak with the team" || normalizedMsg === "contact us" || normalizedMsg === "contact fate&destiny") {
    // If it's one of the UI buttons, trigger the UI routing
    if (normalizedMsg === "i want to speak with the team" || normalizedMsg === "💬 i want to speak with the team" || normalizedMsg === "contact us" || normalizedMsg === "contact fate&destiny") {
      return {
        text: "I'd be happy to help you get started. You can connect with the FATE&DESTINY team through the available contact option.",
        toolUsed: "Routing"
      };
    }
    // Otherwise, start the text-based lead capture flow as requested
    return { text: "Absolutely. May I have your name?" };
  }

  if (lastMsg.includes("may i have your name")) {
    return { 
      text: "What type of solution are you looking for?",
      options: ["Website", "AI Automation", "AI Agent", "Website + AI", "Custom"]
    };
  }
  if (lastMsg.includes("what type of solution are you looking for")) {
    return { text: "What would you like us to build or improve?" };
  }
  if (lastMsg.includes("what would you like us to build or improve")) {
    return { text: "What is the best contact method for you?" };
  }
  if (lastMsg.includes("what is the best contact method for you")) {
    // End of lead flow. Provide contact button to use existing UI.
    return { 
      text: "Thank you. I have the information needed to help the FATE&DESTINY team understand your request. You can finalize this by clicking the button below. Do you need any other help?", 
      options: ["💬 I want to speak with the team"] 
    };
  }

  // Helper for keyword matching
  const has = (regex: RegExp) => regex.test(normalizedMsg);
  
  // Fuzzy / synonym dictionaries
  const websiteKW = /website|websit|web site|websitee|web|site|online presence|landing page|ecomm|ecommerce|portfolio/i;
  const automationKW = /automation|automate|automaton|automatoin|workflow|repetitive|reduce manual/i;
  const agentKW = /agent|agen|chat bot|chatbot|intelligent agent|ai employee|receptionist|ai assistant/i;
  const priceKW = /price|prce|cost|costt|charge|expensive|pricing/i;
  const timeKW = /time|long|quick|when/i;
  const processKW = /process|how do you build|how does a project work|how do we work together/i;

  // 2. CONVERSATION CONTEXT (Follow-ups)
  // If the user says "how much?" or "how long?", figure out the context from the last bot message
  if (normalizedMsg === "how much" || normalizedMsg === "what about price" || normalizedMsg === "price" || normalizedMsg === "cost") {
    if (websiteKW.test(lastMsg)) return handleWebsitePricing();
    if (automationKW.test(lastMsg)) return handleAutomationPricing();
    if (agentKW.test(lastMsg)) return handleAgentPricing();
    return handleGeneralPricing();
  }

  if (normalizedMsg === "how long" || normalizedMsg === "what about time") {
    if (websiteKW.test(lastMsg)) return handleWebsiteTimeline();
    if (automationKW.test(lastMsg)) return handleAutomationTimeline();
    if (agentKW.test(lastMsg)) return handleAgentTimeline();
  }

  // --- INTENT ROUTING (Specific first, then general) ---

  // 3. COMPANY INFO
  if (has(/what is fate&destiny|what is fate and destiny|who are you|what do you do|what services do you provide|what does fate&destiny offer|are you an agency/)) {
    return { 
      text: "FATE&DESTINY focuses on premium full-stack websites, AI automation, and AI agents designed around business requirements.",
      options: ["🚀 I need a premium website", "⚙️ I want AI automation", "🤖 I need an AI agent"]
    };
  }
  if (has(/what kind of businesses do you work with|do you work with startups|established businesses/)) {
    return { text: "We work with businesses of various sizes that are looking to improve their digital presence, automate workflows, or implement AI solutions." };
  }
  if (has(/dubai|uae|internationally|indian businesses|remotely|remote/)) {
    return { text: "FATE&DESTINY can work remotely with businesses in different locations, including Dubai and the UAE." };
  }

  // 4. PRICING
  if (has(priceKW) || (has(/how much/) && !has(/time|long|take/))) {
    if (has(websiteKW)) return handleWebsitePricing();
    if (has(automationKW)) return handleAutomationPricing();
    if (has(agentKW)) return handleAgentPricing();
    return handleGeneralPricing();
  }

  // 5. TIMELINE
  if (has(timeKW) || has(/how long|timeline/)) {
    if (has(websiteKW)) return handleWebsiteTimeline();
    if (has(automationKW)) return handleAutomationTimeline();
    if (has(agentKW)) return handleAgentTimeline();
    
    if (has(/take|ready|build|make|create|long/)) {
      return { 
        text: "The timeline depends on what you're looking to build. What are you interested in?", 
        options: ["Website Timeline", "AI Automation Timeline", "AI Agent Timeline"] 
      };
    }
  }

  // 6. PROCESS
  if (has(processKW)) {
    return { text: "Our process generally starts with understanding your business and requirements, followed by planning, design, development, testing, refinement, and launch." };
  }

  // 7. WEBSITE SERVICES
  if (has(websiteKW)) {
    if (has(/redesign|modernize|update/)) {
      return { text: "Yes. We can review your existing website and improve its visual experience, structure, performance, responsiveness, and conversion flow while keeping the parts that are already working.", options: ["🚀 I need a premium website"] };
    }
    if (has(/mobile|phone|responsive/)) {
      return { text: "Yes. Websites are designed to provide a responsive experience across desktop, tablet, and mobile devices.", options: ["🚀 I need a premium website"] };
    }
    if (has(/animation|interactive/)) {
      return { text: "Yes. We can create refined animations and interactive experiences where they support the brand and user experience rather than making the website feel distracting.", options: ["🚀 I need a premium website"] };
    }
    if (has(/seo|search engine|google/)) {
      return { text: "SEO can be included as part of a website project or handled as a separate service, depending on your requirements. We can help with technical foundations, on-page structure, content structure, and other SEO requirements.", options: ["🚀 I need a premium website"] };
    }
    if (has(/e-commerce|ecommerce|store|sell/)) {
      return { text: "Yes. We can create custom e-commerce experiences with product pages, categories, shopping functionality, customer flows, and integrations based on the project's requirements.", options: ["🚀 I need a premium website"] };
    }
    if (has(/real estate|property/)) {
      return { text: "Yes. We can build premium real estate websites with property listings, high-quality visuals, lead capture, contact forms, location information, and other features based on your requirements.", options: ["🚀 I need a premium website"] };
    }
    if (has(/crm|whatsapp|forms|lead capture/)) {
      return { text: "Depending on the platform and its available integrations or API, we can connect website forms, lead flows, and messaging with your CRM or tools like WhatsApp.", options: ["🚀 I need a premium website"] };
    }
    if (has(/business website|portfolio|custom website/)) {
      return { text: "Tell me a little about your business and what you'd like your website to achieve. I can help identify the best approach.", options: ["💬 I want to speak with the team"] };
    }
    
    // General website
    return { 
      text: "We create custom, premium websites designed around your brand, audience, and business goals. Depending on the project, this can include custom interfaces, responsive design, integrations, lead capture, interactive experiences, and other required functionality.",
      options: ["Business Website", "Real Estate Website", "E-commerce Website", "Portfolio", "Custom Website"]
    };
  }

  // 8. AI AGENTS (Must come before generic automation if "agent" is matched)
  if (has(agentKW)) {
    if (has(/voice|call|phone|receptionist/)) {
      return { text: "Our AI Voice Agents can handle inbound and outbound calls, answer common questions, and qualify leads over the phone, acting as a 24/7 virtual receptionist.", options: ["💬 I want to speak with the team"] };
    }
    if (has(/difference|vs/) && has(/chatbot/)) {
      return { text: "A chatbot mainly focuses on conversation and answering questions. An AI agent can go further by using connected systems, following workflows, making decisions within defined rules, and performing specific tasks.", options: ["🤖 I need an AI agent"] };
    }
    if (has(/chatbot/)) {
      return { text: "We build advanced AI Chatbots that can intelligently answer questions, guide visitors, and qualify leads directly on your website or platform.", options: ["💬 I want to speak with the team"] };
    }
    if (has(/custom/)) {
      return { text: "We can build a completely Custom AI Agent tailored to your exact business rules, workflows, and integrations. What specific task do you want the agent to perform?", options: ["💬 I want to speak with the team"] };
    }
    if (has(/services|options|types/)) {
      return { text: "Our AI agent services include AI Chatbots, AI Voice Agents, WhatsApp AI Agents, Sales AI Agents, Customer Support Agents, and completely Custom AI Agents.", options: ["AI Chatbot", "AI Voice Agent", "WhatsApp AI Agent", "Sales AI Agent", "Customer Support Agent", "Custom AI Agent"] };
    }
    if (has(/qualify|leads/)) {
      return { text: "A lead-qualification agent can ask predefined questions, understand responses, collect relevant information, and pass qualified leads directly to your team or CRM.", options: ["💬 I want to speak with the team"] };
    }
    if (has(/book|appointment/)) {
      return { text: "When connected to a suitable calendar or booking system, an AI agent can be designed to handle appointment-related workflows natively.", options: ["💬 I want to speak with the team"] };
    }
    if (has(/crm/)) {
      return { text: "If your CRM provides suitable API access or integrations, an AI agent can be connected to relevant CRM workflows to update records and retrieve data.", options: ["💬 I want to speak with the team"] };
    }
    if (has(/customer|support/)) {
      return { text: "An AI Customer Support Agent provides instant, 24/7 assistance to your clients, resolving common issues and routing complex cases to your human team.", options: ["💬 I want to speak with the team"] };
    }
    if (has(/whatsapp|whatsap/)) {
      return { text: "A WhatsApp AI Agent can have natural conversations with your customers on WhatsApp, answer queries, and execute business workflows directly in the chat.", options: ["💬 I want to speak with the team"] };
    }
    if (has(/sales/)) {
      return { text: "An AI Sales Agent acts as a dedicated assistant to qualify incoming leads, answer product questions, and schedule appointments, keeping your sales pipeline active.", options: ["💬 I want to speak with the team"] };
    }
    
    return {
      text: "An AI agent is a system designed to understand requests, follow defined instructions, use available tools or systems, and perform specific tasks. Depending on the setup, it can go beyond answering questions and actually participate in business workflows.",
      options: ["AI Chatbot", "AI Voice Agent", "WhatsApp AI Agent", "Sales AI Agent", "Customer Support Agent", "Custom AI Agent"]
    };
  }

  // 9. AI AUTOMATION
  if (has(automationKW)) {
    if (has(/whatsapp|whatsap/)) {
      return { text: "WhatsApp automation allows you to instantly engage with customers, send automated updates, and capture leads directly through WhatsApp based on your business rules.", options: ["💬 I want to speak with the team"] };
    }
    if (has(/lead/)) {
      return { text: "Our lead automation captures and qualifies leads across your channels, organizes them in your CRM, and instantly triggers notifications and follow-ups so you never miss an opportunity.", options: ["💬 I want to speak with the team"] };
    }
    if (has(/follow up|follow-up/)) {
      return { text: "Automated follow-up workflows ensure that every prospect receives immediate, consistent communication after they submit an enquiry or enter your sales process.", options: ["💬 I want to speak with the team"] };
    }
    if (has(/crm/)) {
      return { text: "CRM automation connects your website, forms, and communication tools directly to your CRM, ensuring all client data is automatically updated without manual entry.", options: ["💬 I want to speak with the team"] };
    }
    if (has(/sales/)) {
      return { text: "Sales automation streamlines your follow-ups, lead routing, and pipeline management, allowing your team to focus on closing deals rather than admin work.", options: ["💬 I want to speak with the team"] };
    }
    if (has(/workflow|business/)) {
      return { text: "We can automate a wide variety of internal business workflows, such as data processing, client onboarding, and team notifications, tailored to your specific operations.", options: ["💬 I want to speak with the team"] };
    }
    if (has(/services|options|types/)) {
      return { text: "Our AI automation services include Lead Automation, WhatsApp automation, CRM integration, Sales automation, and automating custom Business Workflows.", options: ["Lead Automation", "WhatsApp Automation", "CRM Automation", "Sales Automation", "Business Workflows"] };
    }
    if (has(/what can you automate|what can be automated/)) {
      return { text: "We can explore automations for lead capture, lead follow-up, CRM updates, customer communication, internal workflows, notifications, data processing, sales processes, and other repetitive operations.", options: ["Lead Automation", "Follow-ups"] };
    }
    if (has(/save time|save my team time|save team time/)) {
      return { text: "That is one of the main purposes of automation. The idea is to reduce repetitive manual work so your team can spend more time on tasks that require human attention.", options: ["⚙️ I want AI automation"] };
    }
    
    return {
      text: "AI automation combines AI with business workflows and connected tools to handle defined tasks automatically. For example, a lead can be captured, qualified, added to a CRM, followed up with, and routed to your team without every step being handled manually.",
      options: ["Lead Automation", "WhatsApp Automation", "CRM Automation", "Sales Automation", "Business Workflows"]
    };
  }

  // 10. INTEGRATIONS
  if (has(/api|crm|whatsapp|webhook|database|third party|integrate|connect/)) {
    return { text: "We can explore integrations when the required service provides suitable API access, webhooks, or another supported integration method. The exact setup depends on the systems involved." };
  }

  // 10.1 BOOKING & MEETINGS
  if (has(/book|appointment|meeting|call|schedule/)) {
    return { text: "If you'd like to book a meeting or discuss your project in detail, you can connect with the FATE&DESTINY team directly.", options: ["💬 I want to speak with the team"] };
  }

  // 11. BUSINESS BENEFITS
  if (has(/benefit|improve my business|improve business|help my company|why should i|save time|improve sales|handle customers|help with leads/)) {
    return { text: "AI can dramatically improve your business by reducing repetitive manual work, responding to customers 24/7, organizing data instantly, qualifying leads, and streamlining your operations. The exact impact depends on what you want to achieve.", options: ["⚙️ I want AI automation", "🤖 I need an AI agent"] };
  }

  // 12. CUSTOM PROJECTS
  if (has(/custom|my idea/)) {
    return { text: "Yes. Custom solutions can be scoped around your specific requirements. Tell me what you're trying to build or what problem you're trying to solve, and I can help identify the type of solution that may fit.", options: ["💬 I want to speak with the team"] };
  }

  // 13. SUPPORT & MAINTENANCE
  if (has(/maintenance|support|update|bug|future change/)) {
    return { text: "Maintenance and ongoing support can be discussed based on the project and its requirements." };
  }

  // 14. EXPLICIT UI CONTACT BUTTON (Already handled at top, but just in case)
  if (has(/speak with the team/)) {
    return {
      text: "Absolutely. You can contact FATE&DESTINY directly by providing your details so our team can follow up.",
      toolUsed: "Routing"
    };
  }

  // 14.5 NOT SURE
  if (has(/not sure|don't know|dont know|help me choose|what do i need/)) {
    return { 
      text: "That's completely fine. Many businesses start by identifying a bottleneck or a goal. Are you looking to build a professional online presence, save time on manual tasks, or automate customer interactions?", 
      options: ["🚀 I need a premium website", "⚙️ I want AI automation", "🤖 I need an AI agent"] 
    };
  }

  // 15. FALLBACK
  return {
    text: "I might not have the exact answer for that. You can connect with FATE&DESTINY directly, and our team will be happy to assist you.",
    options: ["💬 I want to speak with the team", "🚀 I need a premium website", "⚙️ I want AI automation", "🤖 I need an AI agent"]
  };

  // Helper Functions
  function handleWebsitePricing() {
    return { text: "Website pricing depends on the scope, number of pages, functionality, integrations, content requirements, design level, and customization. Tell me what you'd like to build and I can help you understand what would affect the project cost. For an exact quote, you can connect with the FATE&DESTINY team.", options: ["💬 I want to speak with the team"] };
  }
  function handleAutomationPricing() {
    return { text: "AI automation pricing depends on the workflow complexity, number of integrations, tools involved, AI usage, and level of customization. The team can provide a project-specific quote after understanding the workflow.", options: ["💬 I want to speak with the team"] };
  }
  function handleAgentPricing() {
    return { text: "AI agent pricing depends on the agent's purpose, complexity, integrations, communication channels, AI usage, and required features. A project-specific quote can be provided after understanding the requirements.", options: ["💬 I want to speak with the team"] };
  }
  function handleGeneralPricing() {
    return { text: "Pricing depends on the scope, features, integrations, and level of customization. Tell me if you are looking for a website, automation, or an AI agent, and I can explain what affects the cost.", options: ["Website", "AI Automation", "AI Agent"] };
  }

  function handleWebsiteTimeline() {
    return { text: "The timeline depends on the size and complexity of the website, required features, integrations, content, revisions, and approvals. A specific timeline can be estimated once the project scope is understood." };
  }
  function handleAutomationTimeline() {
    return { text: "That depends on the workflow, integrations, testing requirements, and complexity. Simple workflows can be scoped differently from larger multi-system automations." };
  }
  function handleAgentTimeline() {
    return { text: "The timeline depends on the agent's capabilities, knowledge requirements, integrations, channels, testing, and customization." };
  }
}
