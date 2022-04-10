export const ACC_POLICY_URL = '/accounting/acc-policies';
export const ACC_JOURNALS_URL = '/accounting/journals';
export const ACC_JOURNAL_TYPE_URL = '/lookups/journal_types';
export const JOURNAL_USER_URL = '/users';

export interface ACCPolicy {
    id: number;
    analyzeChecks: boolean;
    analyzeCheckPayments: boolean;
    analyzeAccounts: boolean;
    showFolio?:boolean;
    showCommonLabel?:boolean;
    showAccountDescription?:boolean;
    use_management: boolean;
    modifyClosedPeriods: boolean;
    openingJournal?: number;
    resetPieceNumbers: boolean;
    analyzeCash: boolean;
    resultAccount?: string;
    bankAccount?:boolean;
    investAccount?:string;
    cashAccount?:string;
    depreciationAccount?: string;
    assetsAccount?: string;
    manualNumbering: boolean;
    restorable: boolean;
    symbolicValue: number;
    multiCurrency: boolean;
    defaultCurrency?: number;
    headquarterAccounts?: string;
    proportionalAccounts?: string;
    injectionFormat?: number;
    singleAccounting: boolean;
    showBudget: boolean;
    showEmployee: boolean;
    defBank?: number;
    openPeriods?: number;
    financialAccount?: string;
    paymentAccount?: string;
    finBankAccount?: string;
}

export interface Journal {
    id: number;
    description: string;
    abbreviation?: string;
    defaultLabel?: string;
    jType?: number;
    center?: number;
    centerName?: string;
    typeName?: string;
}

export interface JournalUser {
    id: number;
    userId: number;
    journalId: number;
    userName?: string;
}
