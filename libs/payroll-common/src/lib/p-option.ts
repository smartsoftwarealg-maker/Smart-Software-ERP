export interface POption {
    id: number;
    iepRate?: string;
    strictManagement?: boolean;
    PayPeriod?: number;
    manualAbsenceEntry?: boolean;
    codifyId?: boolean;
    manualId?: boolean;
    usesCustomCode?: boolean;
    fixedProtection?: boolean;
    maxSalary?: number;
    idSize?: number;
    vacationRate?: string;
    idPrefix: number;
    personalRole?: number;
    payrollRole?: number;
}
