export interface Anomaly {
    store: string;
    reference: string;
    description: string;
    computedStock: number;
    actualStock: number;
    diff: number;
    id: number;
}
