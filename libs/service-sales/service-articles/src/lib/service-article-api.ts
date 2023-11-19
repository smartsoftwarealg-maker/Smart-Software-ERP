export const SALES_SERVICES = '/services';

export interface Service {
    id: number;
    reference: string,
    description1?: string;
    description2?: string;
    info?: string;
    klass?: number;
    vat?: number;
    notForSale: boolean;
    recordBlocked: boolean;
    blockingReason?: string;
    appId?: number;
    discountable?: false;
    sold: boolean;
    purchased: boolean;
    klassName?: string;
    accountId?: number;
    vatValue?: number;
    price1?: number;
    price2?: number;
    price3?: number;
}
