export interface OrderAnomaly {
    id: number;
    document: string;
    number: number;
    date: Date,
    reference: string;
    description: string;
    qtyOrdered: number;
    qtySatisfied: number;
}
