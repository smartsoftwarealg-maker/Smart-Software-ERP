export interface F8 {
    id: number;
    fileId: number;
    tType: number;
    debtor?: string;
    value1: number;
    value2: number;
    value3: number;
}

export interface F12 {
    id: number;
    fileId: number;
    agent: number;
    amount: number;
    reference?: string;
    refDate?: Date;
    refAmount: number;
    vat: number;
    paymode: number;
    modeDescription?: string;
    agentDescription?: string;
}

export interface F13 {
    id: number;
    fileId: number;
    municipality: string;
    turnover: number;
    exemption: number;
    taxRate: number;
}
