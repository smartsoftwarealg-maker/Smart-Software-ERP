export interface Turnover {
    select: boolean;
    id: number;
    month: number;
    year: number;
    agentId: number;
    customerCode: string;
    customerName: string;
    amount: number;
    rate: number;
    generated: number;
    selected?: boolean;
}

export interface DGeneration {
    from: Date;
    to: Date;
    agents: number[];
}
