
export const JOURNAL_USERS_URL = '/treasury/journal-users';
export const JOURNALS_URL      = '/treasury/journals';

export const CASH_JOURNAL = 1;
export const BANK_JOURNAL = 2;

export interface JournalUser {
    id: number;
    journalId: number;
    userId: number;
}

export interface Journal {
    id: number;
    description: String,
    jType: number;
    bankId?: number;
    bankAccount?: string;
    centerId?: number;
    typeName: string;
}
