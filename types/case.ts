import { RightsViolation } from "./rightsViolation";

export interface Case {
    id: string;
    caseNumber: string;
    caseTitle: string;
    caseSummary: string;
    applicant: {
      name: string;
      email: string;
      phone: string;
    };
    opposingParty: {
      name: string;
      lawyer?: string;
    };
    assignedLawyer: string;
    status: 'active' | 'completed' | 'pending' | 'cancelled';
    startDate: string;
    category: string;
    hearings: Hearing[];
    documents: Document[];
    rightsViolation?: RightsViolation;
    messages: Message[];
    history: HistoryEntry[];
    closingDate?: string;
    closingSummary?: string;
  }
  
  interface Hearing {
    date: string;
    time: string;
    description: string;
  }
  
  interface Document {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    uploadedBy: string;
    status: 'unreviewed' | 'approved' | 'rejected';
  }
  
  interface Message {
    sender: string;
    content: string;
    timestamp: string;
  }
  
  interface HistoryEntry {
    date: string;
    action: string;
    description: string;
  }
  
  