export const ACCOUNT_URL = '/accounts';
export const GENACCOUNT_URL = '/genaccounts';

export interface Account {
    id: number;
    accountNo: string;
    description: string;
    creationDate: string;
    accType: number;
    analyzed: boolean;
    descriptionAr: string;
    balanceConstraint: number;
    summaryLevel: boolean;
    customerCode: boolean;
    budgetAccount: boolean;
    treasuryAccount: boolean;
    journalId: number
}

export interface GenerationAccount {
    id: number;
    account: string,
    stock?: string;
    consumption?: string;
    accType?: string;
    purchase?: string;
    description?: string;
}

export const ACCOUNT_TYPES = {
    1: 'DEBITOR',
    2: 'CREDITOR',
    3: 'BALANCED',
    4: 'ANY',
}

