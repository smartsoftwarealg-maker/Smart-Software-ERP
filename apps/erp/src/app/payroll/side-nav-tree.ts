import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_AMENDMENT_URL,
    ABS_EDO_URL,
    ABS_ELEMENT_TYPES_URL, ABS_ELEMENTS_ENTRY_URL,
    ABS_ELEMENTSINFO_URL, ABS_EXCEL_INJECTION_URL, ABS_FIXED_ELEMENTS_URL,
    ABS_FORMULAS_URL,
    ABS_HR_CAREER_URL,
    ABS_HR_CATEGORIES_URL,
    ABS_HR_DEPARTMENTS_URL,
    ABS_HR_DIPLOMAS_URL,
    ABS_HR_DIVISIONS_URL,
    ABS_HR_EDUCATION_LEVELS_URL,
    ABS_HR_EMPLOYEE_ACTIVATION_URL,
    ABS_HR_EMPLOYEES_URL,
    ABS_HR_EMPLOYMENT_TYPE_URL,
    ABS_HR_MARITAL_STATUS_URL,
    ABS_HR_NATIONALITIES_URL,
    ABS_HR_POSTS_URL,
    ABS_HR_SERVICES_URL,
    ABS_HR_SUSPENSION_REASON_URL,
    ABS_INPUT_FILTERS_URL,
    ABS_MONTH_CANCELER_URL,
    ABS_MONTH_CLOSER_URL,
    ABS_MONTH_SELECTOR_URL, ABS_SPECIAL_PAYROLL_URL, ABS_VACATION_PLANNING_URL
} from '../common';

export const payrollNavTree: SideNavNode = {
    name: 'PAYROLL',
    icon: 'fas fa-users',
    children: [
        {
            name: 'COMMON_LOOKUPS',
            icon: 'fas fa-clipboard-list',
            children: [
                {
                    name: 'COMMON_EMPLOYMENT_TYPES',
                    icon: 'fas fa-business-time',
                    route: ABS_HR_EMPLOYMENT_TYPE_URL
                },
                {
                    name: 'COMMON_SUSPENSION_REASONS',
                    icon: 'fas fa-user-times',
                    route: ABS_HR_SUSPENSION_REASON_URL
                },
                {
                    name: 'COMMON_POSTS',
                    icon: 'fas fa-chair-office',
                    route: ABS_HR_POSTS_URL
                },
                // {
                //     name: 'COMMON_DIPLOMAS',
                //     icon: 'fas fa-file-certificate',
                //     route: ABS_HR_DIPLOMAS_URL
                // },
                // {
                //     name: 'COMMON_EDUCATION_LEVELS',
                //     icon: 'fas fa-graduation-cap',
                //     route: ABS_HR_EDUCATION_LEVELS_URL
                // },
                {
                    name: 'COMMON_MARITAL_STATUS',
                    icon: 'fas fa-rings-wedding',
                    route: ABS_HR_MARITAL_STATUS_URL
                },
                {
                    name: 'COMMON_CATEGORIES',
                    icon: 'fas fa-shapes',
                    route: ABS_HR_CATEGORIES_URL
                },
                {
                    name: 'COMMON_DIVISIONS',
                    icon: 'fas fa-puzzle-piece',
                    route: ABS_HR_DIVISIONS_URL
                },
                {
                    name: 'COMMON_DEPARTMENTS',
                    icon: 'far fa-building',
                    route: ABS_HR_DEPARTMENTS_URL
                },
                {
                    name: 'COMMON_SERVICES',
                    icon: 'fas fa-shapes',
                    route: ABS_HR_SERVICES_URL
                },
                {
                    name: 'COMMON_NATIONALITIES',
                    icon: 'fas fa-flag',
                    route: ABS_HR_NATIONALITIES_URL
                }
            ]
        },
        {
            name: 'PAYROLL_EMPLOYEES',
            icon: 'far fa-user-hard-hat',
            children: [
                {
                    name: 'PAYROLL_EMPLOYEES_LIST',
                    icon: 'fas fa-list-ol',
                    route: ABS_HR_EMPLOYEES_URL
                },
                {
                    name: 'PAYROLL_EMPLOYEE_ACTIVATION_SUSPENSION',
                    icon: 'fas fa-play',
                    route: ABS_HR_EMPLOYEE_ACTIVATION_URL
                },
            ]
        },
        {
            name: 'REMUN_REMUNERATION',
            icon: 'fas fa-money-check-alt',
            children: [
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
                    name: 'REMUN_EDO',
                    icon: 'fa fa-university',
                    route: ABS_EDO_URL
                },
                {
                    name: 'REMUN_MONTH_CLOSURE',
                    icon: 'fas fa-calendar-times',
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
                    name: 'REMUN_MONTH_CANCELLATION',
                    icon: 'fas fa-calendar-week',
                    route: ABS_MONTH_CANCELER_URL,
                    accessRights: 'Canceler'
                },
            ]
        }
    ]
};
