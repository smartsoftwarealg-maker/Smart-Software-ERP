export const GICA_MOTIVES = '/gica-careers/motives';
export const GICA_CONSTANTS = '/gica-careers/parameters';
export const GICA_FAULTS = '/faults';
export const GICA_YEARS = '/gica-careers/years';
export const GICA_EMPLOYEES = '/gica-careers/employees';
export const GICA_SCALES = '/gica-careers/scales';
export const GICA_REPORTS = '/gica-careers/reports';
export const GICA_ARCHIVES = '/archives';
export const GICA_CATEGORIES = '/gica-careers/categories';
export const GICA_CRITERIA = '/criteria';
export const GICA_WEIGHTS = '/gica-careers/weights';
export const GICA_DEDUCTIONS = '/gica-careers/deductions';

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
    date: Date;
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

export interface Report {
    id: number;
    firstName: string;
    lastName: string;
    lastApplicationYear: number;
    age: number;
    rate: number;
}

export interface Application {
    id: number;
    parentId: number;
    employeeId: number;
    scaleId: number;
    firstName?: string;
    lastName?: string;
    from: number;
    to: number;
    rate: number;
}

export interface Grade {
    centerId: number;
    id: number;
    year: number;
    employeeId: number;
    userId: number;
    criterion: number;
    description: string;
    grade1: number;
    grade2: number;
    finalGrade: number;
    maxGrade: number;
}

export interface Criterion {
    id: number;
    parentId: number;
    description: string;
    grade: number;
    sign: number;
    cType?: number;
}

export interface AbsenceWeight {
    id: number;
    elementId: number;
    weight: number;
    elementDescription?: string;
    cType?: number;
}

export interface Deduction {
    id: number;
    firstName: string;
    lastName: string;
    deduction: number;
}
