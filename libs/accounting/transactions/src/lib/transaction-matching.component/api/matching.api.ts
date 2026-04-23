
export interface MBalanace {
    fileId: number;
    id: number;
    customerCode: string;
    customerName: string;
    accountNo: string;
    description: string;
    reference?: string;
    matchKey?: string;
    balance: number;
    lineNumber: number;
}

export interface Match {
    fileId: number;
    srcId: number;
    withId: number;
    customer: string;
    srcLine: number;
    withLine: number;
}
