import { Lookup } from '@ss/common/api-lookup';

export const PUNISHMENTS_URL = '/punishments';
export const PUNISHMENTS_NATURE: Lookup[] = [
    { id: 1, description: 'PAYROLL_WARNING' },
    { id: 2, description: 'PAYROLL_BLAME' },
];

export interface Punishment {
    id: number;
    centerId: number;
    parentId: number;
    number: string;
    date: string;
    sanction?: string;
    punishmentType?: number;
    fault: string;
    faultType?: number;
    memo: string;
    from?: Date,
    to?: Date,
    dayCount?: number;
    typeName?: string;
    faultName?: string;
    nature?: number;
    paymonth: number;
}
