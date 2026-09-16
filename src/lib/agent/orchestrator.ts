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
  
  const lowerMsg = message.toLowerCase();

  // Handle Contact Us Action natively
  if (lowerMsg === "contact us" || lowerMsg === "contact fate&destiny" || lowerMsg.includes("human") || lowerMsg.includes("hire")) {
    return {
      text: "Absolutely. You can contact FATE&DESTINY directly using the Contact button on the website.",
      toolUsed: "Routing"
    };
  }

  // --- PROJECT INQUIRY DETECTION ---
  const isProjectInquiry = /(want|need|require|would like|looking for|want to build)/i.test(lowerMsg);
  
  if (isProjectInquiry) {
    let serviceContext = "a solution";
    
    if (lowerMsg.includes("website") || lowerMsg.includes("web app") || lowerMsg.includes("ecommerce") || lowerMsg.includes("store")) {
      serviceContext = lowerMsg.includes("product") ? "a product-focused website" :
                       lowerMsg.includes("ecommerce") || lowerMsg.includes("store") ? "an e-commerce website" :
                       lowerMsg.includes("custom") ? "a custom website" : "a modern website";
    } else if (lowerMsg.includes("automation") || lowerMsg.includes("automate")) {
      serviceContext = lowerMsg.includes("lead") ? "an AI-powered lead automation solution" :
                       lowerMsg.includes("whatsapp") ? "a WhatsApp automation solution" : "an AI automation solution";
    } else if (lowerMsg.includes("agent") || lowerMsg.includes("assistant") || lowerMsg.includes("agentic")) {
      serviceContext = lowerMsg.includes("support") ? "an AI customer support agent" :
                       lowerMsg.includes("sales") ? "an AI sales agent" : "an AI agent";
    }

    return {
      text: `Absolutely. We can discuss ${serviceContext} tailored to your requirements. For this project inquiry and further information, please contact FATE&DESTINY using the Contact button.`,
      options: ["Contact FATE&DESTINY"]
    };
  }
  // --- END PROJECT INQUIRY DETECTION ---

  // Handle "Full-Stack Website" Branch
  if (lowerMsg === "full-stack website") {
    return {
      text: "Absolutely. FATE&DESTINY creates modern, premium, responsive websites and web applications tailored to your business.\n\nWhat are you looking to build?",
      options: ["Business Website", "E-commerce Website", "Web Application", "Custom Website", "Discuss My Project"]
    };
  }
  if (lowerMsg === "business website") {
    return { text: "We can create a professional website designed around your brand, services, goals, and customers.\n\nTell me a little about your business and what you'd like your website to achieve." };
  }
  if (lowerMsg === "e-commerce website") {
    return { text: "We can create an online store with a professional customer experience and the functionality your business requires.\n\nWhat type of products or services do you want to sell online?" };
  }
  if (lowerMsg === "web application") {
    return { text: "We can develop custom web applications designed around your specific business workflow and requirements.\n\nWhat would you like the application to do?" };
  }
  if (lowerMsg === "custom website") {
    return { text: "We can build a completely custom website tailored exactly to your needs.\n\nCould you describe the unique features you are looking for?" };
  }
  if (lowerMsg === "discuss my project") {
    return { text: "Perfect. Please use the Contact Us button to discuss your project directly with FATE&DESTINY." };
  }

  // Handle "AI Automation" Branch
  if (lowerMsg === "ai automation") {
    return {
      text: "AI automation can help businesses reduce repetitive work, streamline workflows, manage leads, automate follow-ups, and connect different business processes.\n\nWhat would you like to automate?",
      options: ["Lead Automation", "CRM Automation", "WhatsApp Automation", "Customer Support", "Business Workflow", "Something Else"]
    };
  }
  if (lowerMsg === "lead automation") {
    return { text: "We can design workflows that capture, organize, qualify, and follow up with leads automatically.\n\nTell me where your leads currently come from." };
  }
  if (lowerMsg === "crm automation") {
    return { text: "We can connect your business workflows with your CRM to reduce manual work and improve how leads and customer information are handled.\n\nWhich CRM are you currently using?" };
  }
  if (lowerMsg === "whatsapp automation") {
    return { text: "We can design WhatsApp-based business workflows for customer inquiries, lead handling, notifications, and follow-ups.\n\nTell me what you want WhatsApp to automate." };
  }
  if (lowerMsg === "customer support") {
    return { text: "AI automation can help handle repetitive customer questions and route important inquiries to your team.\n\nWhat type of questions do your customers usually ask?" };
  }
  if (lowerMsg === "business workflow") {
    return { text: "Tell me about the repetitive process in your business, and I can help identify where automation could fit." };
  }
  if (lowerMsg === "something else") {
    return { text: "Tell me what you'd like to automate, and I'll help you understand what kind of AI automation could fit." };
  }

  // Handle "Agentic AI" Branch
  if (lowerMsg === "agentic ai") {
    return {
      text: "Agentic AI goes beyond simple chat. An AI agent can be designed to understand a goal, make decisions within defined rules, use connected tools, and complete multi-step business tasks.\n\nWhat would you like your AI agent to do?",
      options: ["AI Customer Support Agent", "AI Sales Agent", "AI Lead Qualification Agent", "AI Business Assistant", "Custom AI Agent"]
    };
  }
  if (lowerMsg === "ai customer support agent") {
    return { text: "We can design an AI agent that handles customer conversations, answers relevant questions, and helps route inquiries according to your business workflow.\n\nWhat type of business do you have?" };
  }
  if (lowerMsg === "ai sales agent") {
    return { text: "An AI sales agent can be designed to interact with prospects, understand their requirements, qualify inquiries, and guide them toward the next step.\n\nWhat are you selling?" };
  }
  if (lowerMsg === "ai lead qualification agent") {
    return { text: "An AI lead qualification agent can interact with prospects, collect relevant information, and help determine which inquiries require your team's attention.\n\nWhat information would you like the agent to collect?" };
  }
  if (lowerMsg === "ai business assistant") {
    return { text: "We can design an AI assistant around specific tasks in your business.\n\nWhat would you like the assistant to handle?" };
  }
  if (lowerMsg === "custom ai agent") {
    return { text: "Tell me what you want the AI agent to accomplish, and we'll determine the workflow and capabilities required." };
  }

  // Handle Pricing specifically
  if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("charge")) {
    return {
      text: "Project pricing depends on the requirements, features, integrations, and overall scope. Please contact FATE&DESTINY using the Contact button so your requirements can be discussed.",
    };
  }

  // Fallback for unhandled/general questions
  return {
    text: "For further inquiries, please connect with FATE&DESTINY directly. You can reach out to us on WhatsApp or use the Contact button below to discuss your requirements.",
    options: ["Contact FATE&DESTINY"],
    toolUsed: "Guardrail"
  };
}
