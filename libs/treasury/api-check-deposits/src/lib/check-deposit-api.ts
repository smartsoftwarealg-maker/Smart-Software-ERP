
export const CHECK_DEPOSITS_URL = '/check-deposits';
export const LINES_URL = '/lines';

export interface CheckDeposit {
    id: number;
    centerId?: number;
    bankId: number;
    bankName?: string;
    depositNumber: number;
    depositDate: string;
    description?: string;
    createdBy?: number;
    creatorName?: string;
    createdAt?: string;
    updatedAt?: string;
    updatedBy?: number;
    updaterName?: string;
}

export interface CheckDepositLine {
    id: number;
    depositId: number;
    checkId: number;
    checkNumber?: string;
    bankDescription?: string;
    date?: string;
    amount?: number;
    createdBy?: number;
    creatorName?: string;
    createdAt?: string;
}
