export const EMPLOYEE_TRAINING_URL = '/trainings';

export interface Training {
    id: number;
    reference?: string;
    ref_date?: Date;
    employee: number;
    motive?: number;
    from_date?: string;
    to_date?: string;
    day_count?: number;
    training?: string;
    trainer?: string;
    location?: string;
    diploma_id?: number;
    mission_expenses: number;
    trn_expenses: number;
    extra_expenses: number;
    judicial_frame?: number;
    center?: number;
    motiveName?: string;
    diplomaName?: string;
    judicialName?: string;
}
