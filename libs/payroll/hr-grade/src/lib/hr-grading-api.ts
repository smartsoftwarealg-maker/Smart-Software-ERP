export const GICA_MOTIVES = '/gica-careers/motives';
export const GICA_CAREER_MOTIVES = '/gica-careers/career-motives';
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
export const GICA_EVOLUTIONS = '/gica-careers/evolutions';
export const GRADE_URL = '/hr-gradings';

export interface Motive {
    id: number;
    description: string;
    dailyGrade: string;
}

export interface CareerMotive {
    id: number;
    description: string;
    isPromotion: boolean;
}

export interface Constant {
    id: number;
    centerId: number;
    formula: string;
    passingGrade: number;
    rate: string;
    script?: string;
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

export interface HrGrade {
    centerId: number;
    id: number;
    month: number;
    employeeId: number;
    userId: number;
    criterion: number;
    description: string;
    grade1: number;
    grade2: number;
    finalGrade: number;
    maxGrade: number;
    appreciation1?: string;
    appreciation2?: string;
    appreciation3?: string;
}

export interface Criterion {
    id: number;
    parentId: number;
    description: string;
    grade: number;
}

export interface AbsenceWeight {
    id: number;
    elementId: number;
    weight: number;
    maxValue: number;
    elementDescription?: string;
    cType?: number;
}

export interface Deduction {
    id: number;
    firstName: string;
    lastName: string;
    grade: number;
    deduction: number;
}
