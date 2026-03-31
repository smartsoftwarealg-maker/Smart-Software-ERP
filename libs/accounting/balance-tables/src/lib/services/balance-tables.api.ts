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

export interface F0910 {
    id: number;
    p1?: number;
    p2?: number;
    p3?: number;
    p4?: number;
    p5?: number;
    p6?: number;
    p7?: number;
    p8?: number;
    p9?: number;
    p10?: number;
    p11?: number;
    p12?: number;
    p13?: number;
    p14?: number;
    p15?: number;
    p16?: number;
    p17?: number;
    p18?: number;
    p19?: number;
    p20?: number;
    p21?: number;
    p22?: number;
    p23?: number;
    p24?: number;
    p25?: number;
    p26?: number;
    p27?: number;
    p28?: number;
    p29?: number;
    p30?: number;
    p31?: number;
    p32?: number;
    p33?: number;
    p34?: number;
    p35?: number;
    p36?: number;
    p37?: number;
    p38?: number;
}
