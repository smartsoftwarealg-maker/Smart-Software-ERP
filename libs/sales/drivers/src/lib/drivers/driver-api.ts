export interface SalesDriver {
    id: number;
    description: string;
    licenceNumber?: number;
    licenceDate?: Date;
    issuedBy?: string;
}
