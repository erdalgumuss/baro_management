export interface Application {
    id: string;
    applicantName: string;
    applicationNumber: string;
    caseSubject: string;
    status: 'active' | 'completed' | 'pending' | 'cancelled';
    applicationDate: string;
    assignedLawyer?: string;
    summary?: string;
    email?: string;
    phone?: string;
    address?: string;
    eventCategory?: string;
    eventSummary?: string;
    eventDetails?: string;
  }
  
  