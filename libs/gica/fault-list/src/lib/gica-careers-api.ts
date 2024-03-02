export const GICA_MOTIVES = '/gica-careers/motives';
export const GICA_CONSTANTS = '/gica-careers/parameters';
export const GICA_FAULTS = '/faults';
export const GICA_EMPLOYEES = '/gica-careers/employees';
export const GICA_SCALES = '/gica-careers/scales';

export interface Motive {
    id: number;
    description: string;
    dailyGrade: string;
}

export interface Constant {
    id: number;
    centerId: number;
    yearlyGrade: number;
    passingGrade: number;
    maxRate: number;
    rate: string;
}

export interface Fault {
    id: number;
    parentId: number;
    motive: number;
    count: number;
    motiveDescription?: string;
}

export interface Scale {
    id: number;
    from: number;
    to: number;
    rate: number;
}
