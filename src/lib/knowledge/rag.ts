// Static Knowledge Base for FATE&DESTINY

const knowledgeData = [
  {
    topic: "Services Offered",
    content: "FATE&DESTINY offers Premium Website Development, Website Redesign, AI-Powered Digital Experiences, SEO & Visibility, AI Creative & Content, Website Maintenance, AI Automation, and Agentic AI."
  },
  {
    topic: "AI Automation",
    content: "Intelligent AI-powered workflows that automate repetitive business processes, connect your tools, and reduce manual work. It connects different APIs and triggers actions based on events."
  },
  {
    topic: "Agentic AI",
    content: "Intelligent AI agents that understand tasks, make decisions within defined boundaries, use connected tools (like CRM, email, calendar), and take actions to complete complex business workflows."
  },
  {
    topic: "Pricing",
    content: "Project pricing depends on the service, complexity, integrations, content, number of pages, and delivery requirements. We do not have fixed public pricing. Please submit a consultation request for a tailored estimate."
  },
  {
    topic: "International Clients",
    content: "Yes, FATE&DESTINY is a digital solutions brand for businesses worldwide. Project availability, communication, timelines, and delivery requirements are discussed during consultation."
  },
  {
    topic: "Starting a Project",
    content: "You can start a project by submitting your name, email, company information, required service, and project details through the consultation form. Our team will review your requirements and reach out."
  }
];

export async function searchKnowledgeBase(query: string): Promise<{ text: string; matched: boolean }> {
  const lowerQuery = query.toLowerCase();
  const results = knowledgeData.filter(item => 
    lowerQuery.includes(item.topic.toLowerCase()) || 
    item.content.toLowerCase().includes(lowerQuery)
  );

  if (results.length > 0) {
    return { text: results.map(r => r.content).join("\n\n"), matched: true };
  }

  // Fallback if no specific match
  return { 
    text: "FATE&DESTINY specializes in Premium Websites, AI Automation, and Agentic AI. For detailed information, please request a consultation.",
    matched: false 
  };
}
