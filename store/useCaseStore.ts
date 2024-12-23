import { create } from "zustand";
import { ICase, CaseStatus } from "../types/case";
import { createCase, getCases } from "../services/caseService";

interface CaseState {
  cases: ICase[];
  isLoading: boolean;
  error: string | null;
  fetchCases: (filters?: { status?: CaseStatus; category?: string }) => Promise<void>;
  addCase: (caseData: {
    caseNumber: string;
    title: string;
    plaintiff: { name: string; email: string; phone: string };
    category: string;
    assignedLawyer: string;
  }) => Promise<void>;
}

export const useCaseStore = create<CaseState>((set) => ({
  cases: [],
  isLoading: false,
  error: null,

  fetchCases: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getCases(filters);
      set({ cases: data, isLoading: false });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Bir hata oluştu";
      set({ error: errorMessage, isLoading: false });
    }
  },

  addCase: async (caseData) => {
    set({ isLoading: true, error: null });
    try {
      const newCase = await createCase(caseData);
      set((state) => ({ cases: [...state.cases, newCase], isLoading: false }));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Bir hata oluştu";
      set({ error: errorMessage, isLoading: false });
    }
  },
}));
