export const INPUT_FILTER_URL = '/payroll/inputfilters';

export interface InputFilter {
    id: number;
    description: string;
    userId?: number;
    selection: string;
    manager?: boolean
}
