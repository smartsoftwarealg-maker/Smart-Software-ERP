export const SOURCES = '/inventory/sources';
export const INVENTORY = '/inventory';

export interface Source {
    id: number;
    document: string;
    number: number;
    date: Date;
    qtyOrdered: number;
    qtySatisfied: number;
}
