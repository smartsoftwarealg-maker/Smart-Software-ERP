export const MRP_URL = '/production/mrp';

export interface MRP {
    id: number;
    reference: string,
    description: string,
    qty: number;
    purchaseOrder: number;
    inventory: number;
}
