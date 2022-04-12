export const ACC_FILE_URL         = '/accounting/acc-files';
export const ACC_POLICY_URL       = '/accounting/acc-policies';
export const ACC_JOURNALS_URL     = '/accounting/journals';
export const ACC_JOURNAL_TYPE_URL = '/lookups/journal_types';
export const JOURNAL_USER_URL     = '/users';
export const ACC_TRANSACTION_URL  = '/accounting/transactions';
export const ACC_DETAIL_URL       = '/detail';
export const ACC_CTX_URL          = '/ctx';

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

export interface ACCTransaction {
    id: number;
    fileId: number;
    oid: number;
    piecemonth: number;
    journalno: number;
    pieceno: number;
    description?: string;
    piecedate?: Date,
    userid?: number;
    folio?: number;
    generator?: number;
    isBudget: boolean;
    decPeriod?: number;
    projectId?: number;
    debit?: number;
    credit?: number;
}

export interface ACCTransactionLine {
    fileId: number;
    oid: number;
    lineNumber: number;
    accountNo: string;
    customer?: string;
    c_o_d?: string;
    balance: number;
    reference?: string;
    checkNo?: string;
    matchKey?: string;
    costCenter?: string;
    quantity?: number;
    investmentId?: string;
    description?: string;
    sign: number;
    empId?: number;
    customerId?: number;
    accountId?: number;
}

export interface ACCFile {
    id: number;
    description: string;
    fileYear: number;
    closed: boolean;
    closer?: number;
    closureDate?: Date;
    center: number;
    visible: boolean;
}
