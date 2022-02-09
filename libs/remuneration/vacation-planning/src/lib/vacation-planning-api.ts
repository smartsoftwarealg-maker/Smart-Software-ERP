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
