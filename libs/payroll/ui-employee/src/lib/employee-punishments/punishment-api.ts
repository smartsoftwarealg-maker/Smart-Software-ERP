export const PUNISHMENTS_URL = '/punishments';

export interface Punishment {
    id: number;
    centerId: number;
    employee: number;
    number: string;
    date: string;
    sanction?: string;
    punishmentType?: number;
    fault: string;
    faultType?: number;
    memo: string;
    typeName?: string;
    faultName?: string;
}
