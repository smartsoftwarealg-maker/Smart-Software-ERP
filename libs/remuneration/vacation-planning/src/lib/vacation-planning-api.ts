export const VACATION_PLANNING_URL = '/vacations';
export const PAID_LEAVE_URL = '/payroll/leave';

export class VacationPlanning {
    id: number;
    employee: number;
    vacation_year: number;
    center: number;
    acquired?: number;
    taken?: number;
    lastName?: string;
    firstName?: string;
}

export class VacationPlanningDetail {
    id: number;
    parentId:number;
    fromDate?: Date;
    toDate?: Date;
    address?: string;
    vac_type?: number;
    reference?: number;
    planning_id: number;
    description?: string;
}

export interface VFormula {
    id: number;
    variable: string;
    description: string;
}

export interface VTake {
    employee: number;
    days: number;
}

export interface VHistory {
    employee: number;
    name: string;
    post?: string;
    year: number;
    earned: number;
    earned2: number;
    taken: number;
    taken2: number;
    rest: number;
    days: number;
    toTake: number;
}

export interface VUpdate {
    year: number;
    list: VTake[];
}
