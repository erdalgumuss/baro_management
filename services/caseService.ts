import apiClient from './apiClient'
import { ICase, CaseStatus } from "../types/case";

const API_BASE_URL = "/cases"; // Backend'in endpointi

/**
 * Yeni dava oluşturma
 */
export const createCase = async (caseData: {
    caseNumber: string;
    title: string;
    plaintiff: { name: string; email: string; phone: string };
    category: string;
    
  }): Promise<ICase> => {
    const response = await apiClient.post(`${API_BASE_URL}/create`, caseData);
    return response.data.data;
  };
  
  /**
   * Tüm davaları listeleme
   */
  export const getCases = async (filters?: {
    status?: CaseStatus;
    category?: string;
  }): Promise<ICase[]> => {
    const response = await apiClient.get(API_BASE_URL, {
      params: filters,
    });
    return response.data.data;
  };
  
