
export const CHECKS_URL = '/treasury/checks';
export const PROCESSED_CHECKS_URL = '/treasury/processed-checks';
export const MATCHED_CHECKS_URL = '/treasury/processed-checks/matched';
export const MATCHED_NON_CHECKS_URL = '/treasury/processed-checks/non-matched';
export const UNASSIGNED_CHECKS_URL = '/unassigned-checks';

export interface UnassignedCheck {
    id: number;
    number: string;
    date: string;
    amount: number;
    bank?: string;
    agentName?: string;
    parentId?: number;
}

export interface BankCheck {
    id: number;
    number: string;
    date: string;
    amount: number;
    bank?: string;
}

export interface Check {
    id: number;
    center: number;
    number: String,
    bankId?: number | null;
    bank?: string;
    deposited: boolean;
    depositDate?: string;
    depositNumber?: string;
    processDate?: string;
    description?: string;
    date?: string;
    due_days: number;
    agent: number;
    amount: number;
    mode?: number;
    canceled: boolean;
    memo?: string;
    bookId?: number;
    agentName?: string;
}

export interface ProcessedCheck{id: number;
                                company: number;
                                bankName?: string;
                                number: string;
                                bankId: number;
                                checkDate?: Date;
                                amount?:number;
}

export interface Match {
    bank: string;
    number: string;
    date: Date;
    amount: number
}
