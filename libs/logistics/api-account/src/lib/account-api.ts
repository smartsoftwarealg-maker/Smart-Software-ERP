export const ACCOUNT_URL = '/accounts';

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


export const ACCOUNT_TYPES = {
    1: 'DEBITOR',
    2: 'CREDITOR',
    3: 'BALANCED',
    4: 'ANY',
}

