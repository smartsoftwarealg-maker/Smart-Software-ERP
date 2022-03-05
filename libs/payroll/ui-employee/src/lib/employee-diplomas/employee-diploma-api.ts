export const EMPLOYEE_DIPLOMA_URL = '/diplomas';
export const PERSON_URL = '/persons';

export interface EmployeeDiploma {
    id: number;
    employee: number;
    diploma?: number;
    subject?: number;
    diploma_year?: string;
    agent?: number;
    memo?: string;
    institution?: string;
    to_date?: string;
    from_date?: string;
    education_level?: number;
    levelName?: string;
    subjectName?: string;
}
