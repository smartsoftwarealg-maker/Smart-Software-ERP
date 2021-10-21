import {
    ABS_PAYROLL_CATEGORIES_URL,
    ABS_PAYROLL_DIPLOMAS_URL,
    ABS_PAYROLL_EDUCATION_LEVELS_URL,
    ABS_PAYROLL_MARITAL_STATUS_URL,
    ABS_PAYROLL_NATIONALITIES_URL,
    ABS_PAYROLL_POSTS_URL,
    ABS_PAYROLL_SERVICES_URL,
    ABS_PAYROLL_EMPLOYEES_URL,
    ABS_PAYROLL_EMPLOYEE_ACTIVATION_URL,
    ABS_PAYROLL_EMPLOYMENT_TYPE_URL,
    ABS_PAYROLL_SUSPENSION_REASON_URL,
    ABS_PAYROLL_CAREER_URL,
    ABS_PAYROLL_DEPARTMENTS_URL,
    ABS_PAYROLL_DIVISIONS_URL,
    ABS_PAYROLL_CONTRACTS_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

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
                    route: ABS_PAYROLL_EMPLOYMENT_TYPE_URL
                },
                {
                    name: 'COMMON_SUSPENSION_REASONS',
                    icon: 'fas fa-user-times',
                    route: ABS_PAYROLL_SUSPENSION_REASON_URL
                },
                {
                    name: 'COMMON_POSTS',
                    icon: 'fas fa-chair-office',
                    route: ABS_PAYROLL_POSTS_URL
                },
                {
                    name: 'COMMON_DIPLOMAS',
                    icon: 'fas fa-file-certificate',
                    route: ABS_PAYROLL_DIPLOMAS_URL
                },
                {
                    name: 'COMMON_EDUCATION_LEVELS',
                    icon: 'fas fa-graduation-cap',
                    route: ABS_PAYROLL_EDUCATION_LEVELS_URL
                },
                {
                    name: 'COMMON_MARITAL_STATUS',
                    icon: 'fas fa-rings-wedding',
                    route: ABS_PAYROLL_MARITAL_STATUS_URL
                },
                {
                    name: 'COMMON_CATEGORIES',
                    icon: 'fas fa-shapes',
                    route: ABS_PAYROLL_CATEGORIES_URL
                },
                {
                    name: 'COMMON_DIVISIONS',
                    icon: 'fas fa-puzzle-piece',
                    route: ABS_PAYROLL_DIVISIONS_URL
                },
                {
                    name: 'COMMON_DEPARTMENTS',
                    icon: 'far fa-building',
                    route: ABS_PAYROLL_DEPARTMENTS_URL
                },
                {
                    name: 'COMMON_SERVICES',
                    icon: 'fas fa-shapes',
                    route: ABS_PAYROLL_SERVICES_URL
                },
                {
                    name: 'COMMON_NATIONALITIES',
                    icon: 'fas fa-flag',
                    route: ABS_PAYROLL_NATIONALITIES_URL
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
                    route: ABS_PAYROLL_EMPLOYEES_URL
                },
                {
                    name: 'PAYROLL_EMPLOYEE_ACTIVATION_SUSPENSION',
                    icon: 'fas fa-play',
                    route: ABS_PAYROLL_EMPLOYEE_ACTIVATION_URL
                },
                {
                    name: 'PAYROLL_CAREER',
                    icon: 'fas fa-user-hard-hat',
                    route: ABS_PAYROLL_CAREER_URL
                },
                {
                    name: 'PAYROLL_CONTRACTS',
                    icon: 'fas fa-file-signature',
                    route: ABS_PAYROLL_CONTRACTS_URL
                }
            ]
        }
    ]
};
