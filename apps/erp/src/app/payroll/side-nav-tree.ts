import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_AMENDMENT_URL,
    ABS_ARCHIVE_GENERATOR_URL,
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
    ABS_INACTIVE_HR_EMPLOYEES_URL,
    ABS_INPUT_FILTERS_URL,
    ABS_LOANS_URL,
    ABS_MONTH_CANCELER_URL,
    ABS_MONTH_CLOSER_URL,
    ABS_MONTH_SELECTOR_URL,
    ABS_PAYROLL_DASHBOARD_URL,
    ABS_PAYROLL_EMPLOYEES_URL,
    ABS_SALARY_GRID_URL,
    ABS_SPECIAL_PAYROLL_URL,
    ABS_VACATION_PLANNING_URL
} from '../common';

export const payrollNavTree: SideNavNode = {
    name: 'PAYROLL',
    icon: 'fas fa-coins',
    children: [
        {
            name: 'PAYROLL_SALARY_GRID',
            icon: 'far fa-game-board',
            route: ABS_SALARY_GRID_URL
        },
        {
            name: 'PAYROLL_INACTIVE_EMPLOYEES_LIST',
            icon: 'far fa-users-slash',
            route: ABS_INACTIVE_HR_EMPLOYEES_URL
        },
        {
            name: 'PAYROLL_EMPLOYEES_LIST',
            icon: 'fad fa-users',
            route: ABS_PAYROLL_EMPLOYEES_URL
        },
        {
            name: 'REMUN_MONTH_SELECTION',
            icon: 'fas fa-calendar-check',
            route: ABS_MONTH_SELECTOR_URL,
        },
        {
            name: 'REMUN_ELEMENTSINFO',
            icon: 'fab fa-elementor',
            route: ABS_ELEMENTSINFO_URL
        },
        {
            name: 'REMUN_ELEMENT_TYPES',
            icon: 'fas fa-layer-group',
            route: ABS_ELEMENT_TYPES_URL
        },
        {
            name: 'REMUN_FORMULAS',
            icon: 'fas fa-function',
            route: ABS_FORMULAS_URL
        },
        {
            name: 'REMUN_INPUT_FILTERS',
            icon: 'fas fa-filter',
            route: ABS_INPUT_FILTERS_URL
        },
        {
            name: 'REMUN_SPECIAL_PAYROLLS',
            icon: 'fas fa-comments-alt-dollar',
            route: ABS_SPECIAL_PAYROLL_URL
        },
        {
            name: 'PAYROLL_FIXED_ELEMENTS',
            icon: 'fas fa-address-card',
            route: ABS_FIXED_ELEMENTS_URL
        },
        {
            name: 'REMUN_ELEMENTS_ENTRY',
            icon: 'fas fa-coins',
            route: ABS_ELEMENTS_ENTRY_URL
        },
        {
            name: 'REMUN_EXCEL_INJECTION',
            icon: 'fas fa-file-excel',
            route: ABS_EXCEL_INJECTION_URL
        },
        {
            name: 'REMUN_AMENDMENTS',
            icon: 'fas fa-user-edit',
            route: ABS_AMENDMENT_URL
        },
        {
            name: 'PAYROLL_LOANS',
            icon: 'fas fa-user-edit',
            route: ABS_LOANS_URL
        },
        {
            name: 'REMUN_EDO',
            icon: 'fa fa-university',
            route: ABS_EDO_URL
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
            route: ABS_DAS_URL
        },
        {
            name: 'REMUN_CACO',
            icon: 'fas fa-cloud-rain',
            route: ABS_CACO_URL
        },
        {
            name: 'COMMON_DASHBOARD',
            icon: 'fa-solid fa-gauge-min',
            route: ABS_PAYROLL_DASHBOARD_URL,
        },

        {
            name: 'COMMON_REPORTS',
            icon: 'fa-sharp fa-solid fa-file-chart-column',
            route: ABS_COMMON_REPORTS_URL,
            accessRights: 'Report'
        },

    ],
    accessRights: 'PAYROLL'
};
