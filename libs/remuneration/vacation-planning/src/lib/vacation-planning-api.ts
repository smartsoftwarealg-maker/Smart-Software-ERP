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
    from_date?: Date;
    to_date?: Date;
    address?: string;
    vac_type?: number;
    reference?: number;
    planning_id: number;
    description?: string;
}
