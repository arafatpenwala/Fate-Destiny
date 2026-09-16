export type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  isQuickReply?: boolean;
};

export type Lead = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  business_type?: string;
  requested_service?: string;
  requirements?: string;
  budget?: string;
  timeline?: string;
  lead_status: "new" | "qualified" | "contacted";
  created_at: string;
};

// Database Abstraction Interface
export interface IDatabaseRepository {
  saveMessage(sessionId: string, message: Message): Promise<void>;
  getMessages(sessionId: string): Promise<Message[]>;
  clearMessages(sessionId: string): Promise<void>;
  createLead(lead: Lead): Promise<string>;
  logToolExecution(toolName: string, inputs: any, result: any): Promise<void>;
}

// Mock Implementation for development without external DB dependencies
class MockDatabaseRepository implements IDatabaseRepository {
  private messages: Map<string, Message[]> = new Map();
  private leads: Lead[] = [];

  async saveMessage(sessionId: string, message: Message): Promise<void> {
    const existing = this.messages.get(sessionId) || [];
    existing.push(message);
    this.messages.set(sessionId, existing);
    // console.log(`[DB MOCK] Saved message to session ${sessionId}:`, message.text);
  }

  async getMessages(sessionId: string): Promise<Message[]> {
    return this.messages.get(sessionId) || [];
  }

  async clearMessages(sessionId: string): Promise<void> {
    this.messages.delete(sessionId);
    // console.log(`[DB MOCK] Cleared messages for session ${sessionId}`);
  }

  async createLead(lead: Lead): Promise<string> {
    const leadId = `lead_${Date.now()}`;
    this.leads.push({ ...lead, id: leadId });
    console.log(`[DB MOCK] Lead created safely in memory:`, lead);
    return leadId;
  }

  async logToolExecution(toolName: string, inputs: any, result: any): Promise<void> {
    console.log(`[DB MOCK] Tool executed: ${toolName}`, { inputs, result });
  }
}

// Singleton instance
export const dbRepository = new MockDatabaseRepository();
