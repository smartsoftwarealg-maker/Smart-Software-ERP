export const ACC_FILE_URL           = '/acc-files';
export const ACC_ACC_FILE_URL       = '/accounting/files';
export const ACC_ANNEX_CODE_URL     = '/accounting/annex-codes';
export const ACC_GENERATION_URL     = '/accounting/generations';
export const ACC_POLICY_URL         = '/acc-policies';
export const ACC_JOURNALS_URL       = '/accounting/journals';
export const ACC_USER_JOURNALS_URL  = '/accounting/user-journals';
export const ACC_JOURNAL_TYPE_URL   = '/lookups/journal_types';
export const JOURNAL_USER_URL       = '/users';
export const ACC_TRANSACTION_URL    = '/transactions';
export const ACC_DETAIL_URL         = '/detail';
export const ACC_TRANSACTIONS_URL   = '/accounting/transactions';
export const ACC_CTX_URL            = '/ctx';
export const ACC_PROJECTS_URL       = '/lookups/acc_projects';
export const ACC_ASSET_END_URL      = '/lookups/investment_ends';
export const ACC_PERIOD_SUMMARY_URL = '/accounting/summary';
export const ACC_ACC_BALANCE_URL    = '/accounting/balance';
export const ACC_ACCOUNTING_GL_URL  = '/accounting/gl';
export const TRANSAC_ACCOUNT_URL    = '/accounting/transac-accounts';
export const CASH_FLOW_ACCOUNTS_URL = '/cash-accounts';
export const SCALE                  = 100000;

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
    showProjects: boolean;
    manualCashFlow: boolean;
    minAssetValue: 0;
    inventoryYear: 0;
    defProject?: number;
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
    bankId?: number;
    bankName?: string;
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
    pieceMonth: number;
    journalno: number;
    pieceNo: number;
    description?: string;
    pieceDate?: Date,
    userid?: number;
    folio?: number;
    generator?: number;
    isBudget: boolean;
    decPeriod?: number;
    projectId?: number;
    debit?: number;
    credit?: number;
    projectName?: string;
}

export interface ACCTransactionLine {
    id: number;
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
    costCenterId?: number;
    quantity?: number;
    investmentId?: string;
    description?: string;
    sign: number;
    empId?: number;
    customerId?: number;
    accountId?: number;
    customerName?: string;
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

export interface AnnexCode {
    id: number;
    code: string;
    description?: string;
    fileId?: number;
}

export interface CashFlowAcc {
    id: number;
    code: string;
    accountno?: string;
    balanceSign: number;
    fileYear?: number;
    description?: string;
}

export interface PeriodSummary {
    id:     number;
    debit:  number;
    credit: number;
    month?: string;
}

export interface TransacAccount {
    id: number;
    description: string;
    accountno?: string;
}

export interface PendingTreasury {
    accountNo: string;
    description: string;
    balance: number;
}

export interface TreasuryInfo {
    total: number;
    located: number;
    nonLocated: number;
}

export interface TDocument {
    description: string;
    number:      number;
    date:        Date;
}

export interface GenerationInfo {
    journal: number;
    genType: string
}


export interface PAYRow {
    account?: string
    description?: string;
    employee?: string;
    cCenter?: string;
    fundCC?: string;
    amount: number
}

export interface Check {
    number: string;
    date: Date;
    description?: string;
    bank: string;
    journal?: number;
    debit: number;
    credit: number;
}

export interface ReopenInfo {
    description: string;
    detail: boolean;
}

export interface GL {
    accountno: string;
    description: string;
    pieceNo: number;
    journal: string;
    reference?: string;
    checkNo?: string;
    debit: number;
    credit: number;
}

export interface Balance {
    accountNo:   string;
    description: string;
    customer?:   string;
    oldDebit:    number;
    oldCredit:   number;
    curDebit:    number;
    curCredit:   number;
    totDebit:    number;
    totCredit:   number;
    debit:       number;
    credit:      number;
}
