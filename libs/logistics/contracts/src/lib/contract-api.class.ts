export const PROJECT_URL = '/projects';
export const CONTRACTS_URL = '/contracts';
export const PROJECT_ARTICLES_URL = '/articles';
export const PROJECT_AGENT_URL = '/agents';
export const PROJECT_SUPPLIERS_URL = '/suppliers';

export interface Project {
    id: number;
    centerId: number;
    projDate: Date;
    contractNo: string;
    description?: string;
    description2?: string;
    customer?: number;
    amount: number;
    fromDate?: number;
    toDate?: number;
    advanceRate: number;
    guarantee1: number;
    guarantee2: number;
    dueMonths1?: number;
    dueMonths2?: number;
    tempReception?: number;
    finalReception?: number;
    projType?: number;
    advancePayment: number;
    projMotive?: string;
    performBond: number;
    lateFee: number;
    awardProcedure?: number;
    timeMonths?: number;
    timeDays?: number;
    contractMonths?: number;
    contractDays?: number;
    advanceType?: number;
    periodicity?: number;
    projKind?: number;
    execMonths?: number;
    execDays?: number;
    customerName?: string;
    wilaya?: number;
    salesPurchase: number;
    wilayaName?: string;
    fiscalId?: string;
}

export interface ProjectArticle {
    id: number;
    parentId: number;
    reference?: string;
    price: number;
    address?: string;
    qty: number;
    vat: number;
    discount: number,
    description?: string;
    articleId?: number;
}
