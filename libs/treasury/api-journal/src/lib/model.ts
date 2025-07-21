export const JOURNAL_TREASURY_USERS_URL = '/users';
export const JOURNAL_USERS_URL = '/users';
export const JOURNALS_URL      = '/treasury/journals';

export const CASH_JOURNAL = 1;
export const BANK_JOURNAL = 2;

export interface JournalUser {
    id: number;
    parentId: number;
    userId: number;
}

export interface Journal {
    id: number;
    description: string,
    jType: number;
    bankId?: number;
    bankAccount?: string;
    centerId?: number;
    typeName: string;
}




