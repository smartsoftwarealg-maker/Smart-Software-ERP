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
    questionAr:string;
    questionFr:string;
    satisfactionAnswer?: string;
    boolAnswer?: string;
    count: number;
    date?: Date;
}

export interface AnswersCount {
    question: string;
    verySatisfied?: number;
    satisfied?: number;
    unSatisfied?: number;
    yes?: number;
    no?: number;
}

export interface AnswersHistoricCount {
    question: string;
    years: string[];
    verySatisfied?: number[];
    satisfied?: number[];
    unSatisfied?: number[];
    yes?: number[];
    no?: number[];
}

