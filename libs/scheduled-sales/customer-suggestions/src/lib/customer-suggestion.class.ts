export const SUGGESTIONS_URL = '/ssales/suggestions';
export const SUGGESTIONS_TYPE_URL = '/lookups/complaints';

export interface CustomerSuggestion {
    id: number;
    centerId: number;
    date: Date;
    agentId: number;
    suggestionId?: number;
    suggestionType?: number|string;
    suggestion?: string;
    answer?: string;
    agentDescription?: string;
    suggestionDescription?: string;
}
