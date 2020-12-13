export const INVENTORY_EXIT_URL = "/correctionOut";

export interface InventoryExit {
    id: number;
    center: number;
    document: number;
    number: number;
    date: string;
    agent: number;
    userID: number;
    dealer: number;
    header: string;
    footer: string;
    reference: string;
    referenceDocDate: string;
    locked: string;
    creationTime: string;
}

