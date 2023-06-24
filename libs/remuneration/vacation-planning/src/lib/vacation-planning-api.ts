export const VACATION_PLANNING_URL = '/vacations';

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
    fromDate?: Date;
    toDate?: Date;
    address?: string;
    vac_type?: number;
    reference?: number;
    planning_id: number;
    description?: string;
}
