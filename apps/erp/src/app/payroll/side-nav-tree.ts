import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_AMENDMENT_URL,
    ABS_ARCHIVE_GENERATOR_URL,
    ABS_ARCHIVE_VIEWER_URL,
    ABS_CACO_URL,
    ABS_COMMON_REPORTS_URL,
    ABS_DAS_URL,
    ABS_EDO_URL,
    ABS_ELEMENT_TYPES_URL,
    ABS_ELEMENTS_ENTRY_URL,
    ABS_ELEMENTSINFO_URL,
    ABS_EXCEL_INJECTION_URL,
    ABS_FIXED_ELEMENTS_URL,
    ABS_FORMULAS_URL,
    ABS_INACTIVE_PAYROLL_EMPLOYEES_URL,
    ABS_INPUT_FILTERS_URL,
    ABS_LOANS_URL,
    ABS_MONTH_CANCELER_URL,
    ABS_MONTH_CLOSER_URL,
    ABS_MONTH_SELECTOR_URL,
    ABS_PAYROLL_DASHBOARD_URL,
    ABS_PAYROLL_EMPLOYEES_URL,
    ABS_PAYROLL_FUNDS_URL,
    ABS_PAYROLL_IRG_CALC_URL,
    ABS_PAYROLL_LOAN_INJECTION_URL,
    ABS_PAYROLL_OPTIONS_URL,
    ABS_PAYROLL_REPORT_PRIVILEGE_URL,
    ABS_PAYROLL_REPORT_RIGHT_URL,
    ABS_SALARY_GRID_UPDATE_URL,
    ABS_SALARY_GRID_URL,
    ABS_SPECIAL_PAYROLL_URL,
    ABS_VACATION_PLANNING_URL
} from '../common';

export const payrollNavTree: SideNavNode = {
    name: 'PAYROLL',
    icon: 'fas fa-coins',
    children: [
        {
            name: 'PAYROLL_FUNDS',
            icon: 'fa-solid fa-dollar-sign',
            route: ABS_PAYROLL_FUNDS_URL,
            accessRights: 'Fund'
        },
        {
            name: 'PAYROLL_SALARY_GRID',
            icon: 'far fa-game-board',
            route: ABS_SALARY_GRID_URL,
            accessRights: 'Grid'
        },
        {
            name: 'PAYROLL_GRID_UPDATE',
            icon: 'fa-solid fa-grid-round-2-plus',
            route: ABS_SALARY_GRID_UPDATE_URL,
            accessRights: 'GridApplication'
        },
        {
            name: 'PAYROLL_INACTIVE_EMPLOYEES_LIST',
            icon: 'far fa-users-slash',
            route: ABS_INACTIVE_PAYROLL_EMPLOYEES_URL,
            accessRights: 'Person'
        },
        {
            name: 'PAYROLL_EMPLOYEES_LIST',
            icon: 'fas fa-users',
            route: ABS_PAYROLL_EMPLOYEES_URL,
            accessRights: 'Person'
        },
        {
            name: 'REMUN_MONTH_SELECTION',
            icon: 'fas fa-calendar-check',
            route: ABS_MONTH_SELECTOR_URL,
            accessRights: 'Month'
        },
        {
            name: 'REMUN_ELEMENTSINFO',
            icon: 'fab fa-elementor',
            route: ABS_ELEMENTSINFO_URL,
            accessRights: 'ElementInfo'
        },
        {
            name: 'REMUN_ELEMENT_TYPES',
            icon: 'fas fa-layer-group',
            route: ABS_ELEMENT_TYPES_URL,
            accessRights: 'ElementType'
        },
        {
            name: 'REMUN_FORMULAS',
            icon: 'fas fa-function',
            route: ABS_FORMULAS_URL,
            accessRights: 'Formula'
        },
        {
            name: 'REMUN_INPUT_FILTERS',
            icon: 'fas fa-filter',
            route: ABS_INPUT_FILTERS_URL,
            accessRights: 'InputFilter'
        },
        {
            name: 'REMUN_SPECIAL_PAYROLLS',
            icon: 'fas fa-comments-alt-dollar',
            route: ABS_SPECIAL_PAYROLL_URL,
            accessRights: 'Element'
        },
        {
            name: 'PAYROLL_FIXED_ELEMENTS',
            icon: 'fas fa-address-card',
            route: ABS_FIXED_ELEMENTS_URL,
            accessRights: 'Element'
        },
        {
            name: 'REMUN_ELEMENTS_ENTRY',
            icon: 'fas fa-coins',
            route: ABS_ELEMENTS_ENTRY_URL,
            accessRights: 'Element'
        },
        {
            name: 'REMUN_EXCEL_INJECTION',
            icon: 'fas fa-file-excel',
            route: ABS_EXCEL_INJECTION_URL,
            accessRights: 'XLSInjection'
        },
        {
            name: 'REMUN_AMENDMENTS',
            icon: 'fas fa-user-edit',
            route: ABS_AMENDMENT_URL,
            accessRights: 'Amendment'
        },
        {
            name: 'PAYROLL_LOANS',
            icon: 'fas fa-user-edit',
            route: ABS_LOANS_URL,
            accessRights: 'Loan'
        },
        {
            name: 'REMUN_EDO',
            icon: 'fa fa-university',
            route: ABS_EDO_URL,
            accessRights: 'EDO'
        },
        {
            name: 'REMUN_MONTH_CLOSURE',
            icon: 'fas fa-door-closed',
            route: ABS_MONTH_CLOSER_URL,
            accessRights: 'Closer'
        },
        {
            name: 'REMUN_VACATION_PLANNING',
            icon: 'fas fa-calendar-times',
            route: ABS_VACATION_PLANNING_URL,
            accessRights: 'VPlanning'
        },
        {
            name: 'REMUN_ARCHIVE_GENERATOR',
            icon: 'fas fa-cabinet-filing',
            route: ABS_ARCHIVE_GENERATOR_URL,
            accessRights: 'Canceler'
        },
        {
            name: 'REMUN_MONTH_CANCELLATION',
            icon: 'fas fa-calendar-week',
            route: ABS_MONTH_CANCELER_URL,
            accessRights: 'Canceler'
        },
        {
            name: 'REMUN_DAS',
            icon: 'fas fa-shield-check',
            route: ABS_DAS_URL,
            accessRights: 'DAS'
        },
        {
            name: 'PAYROLL_ARCHIVE_VIEWER',
            icon: 'fa-solid fa-box-archive',
            route: ABS_ARCHIVE_VIEWER_URL,
            accessRights: 'HRArchive'
        },
        {
            name: 'REMUN_CACO',
            icon: 'fas fa-cloud-rain',
            route: ABS_CACO_URL,
            accessRights: 'CACO'
        },
        {
            name: 'COMMON_DASHBOARD',
            icon: 'fa-solid fa-gauge-min',
            route: ABS_PAYROLL_DASHBOARD_URL,
            accessRights: 'Dashboard'
        },
        {
            name: 'PAYROLL_LOAN_INJECTION',
            icon: 'fas fa-file-excel',
            route: ABS_PAYROLL_LOAN_INJECTION_URL,
            accessRights: 'Loan'
        },
        {
            name: 'COMMON_REPORT_RIGHTS',
            icon: 'fa-regular fa-ban',
            route: ABS_PAYROLL_REPORT_RIGHT_URL,
            accessRights: 'RoleReport'
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fa-solid fa-file-chart-column',
            route: ABS_COMMON_REPORTS_URL,
            accessRights: 'Report'
        },

        {
            name: 'COMMON_REPORT_PRIVILEGES',
            icon: 'fa-solid fa-ranking-star',
            route: ABS_PAYROLL_REPORT_PRIVILEGE_URL,
            accessRights: 'RPrivilege'
        },
        {
            name: 'REMUN_IRG_CALCULATOR',
            icon: 'fa-solid fa-calculator-simple',
            route: ABS_PAYROLL_IRG_CALC_URL,
            accessRights: 'Element'
        },
        {
            name: 'COMMON_OPTIONS',
            icon: 'fas fa-tools',
            route: ABS_PAYROLL_OPTIONS_URL,
            accessRights: 'POption'
        },
    ],
    accessRights: 'PAYROLL'
};
