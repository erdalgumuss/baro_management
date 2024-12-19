export interface RightsViolation {
    id: string;
    caseTitle: string;
    applicant: string;
    category: 'familyRights' | 'violenceAgainstWomen' | 'childRights' | 'freedomOfExpression' | 'other';
    source: 'media' | 'ngo' | 'individualApplication';
    status: 'inProgress' | 'completed' | 'cancelled';
    applicationDate: string;
    details: string;
    eventSummary: string;
    applicantName: string;
    applicantContact: string;
    applicationText: string;
    legalRepresentative?: string;
    reportingOrganization?: string;
    sourceDetails?: string;
    developments: Development[];
    result?: string;
    files: File[];
    messages: Message[];
  }
  
  interface Development {
    date: string;
    description: string;
  }
  
  interface File {
    name: string;
    type: string;
    date: string;
  }
  
  interface Message {
    sender: string;
    content: string;
    timestamp: string;
  }
  
  