import { Case } from "./case";

export interface Lawyer {
    id: number;
    name: string;
    specialization: string;
    activeCases: number;
    email: string;
    phone: string;
    barNumber: string;
    lawyerReferenceNumber?: string;
    cases?: Case[];
    education?: Education[];
  }
  
  interface Education {
    name: string;
    institution: string;
    date: string;
  }
  
  