export const SOCIAL_WORKS_TYPE = 1;
export const MEDICAL_AIDS_TYPE = 2;
export const MUTUAL_AIDS_TYPE = 3;
export const REIMBURSEMENT = 'Reimbursement';

//URLs
export const STATISTICS_URL = '/ssales/poll-statistics';
export const CURRENT_URL = '/ssales/current-statistics';
export const HISTORIC_URL = '/ssales/historic-statistics';

// Classes
export interface Statistics {
    date: Date;
    count: number;
}

export interface QuestionsStatistic {
    question: string;
    answer: string;
    count: number;
}

export interface SatisfactionStatistic {
    question: string;
    verySatisfied: number;
    satisfied: number;
    unSatisfied: number;
}

export interface BoolStatistic {
    question: string;
    yes: number;
    no: number;
}

export interface HistoricStatistics {
    date: Date;
    count: number;
}
