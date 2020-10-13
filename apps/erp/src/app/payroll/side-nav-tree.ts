import {
    ABS_PAYROLL_CATEGORIES_URL,
    ABS_PAYROLL_DIPLOMAS_URL,
    ABS_PAYROLL_EDUCATION_LEVELS_URL,
    ABS_PAYROLL_MARITAL_STATUS_URL,
    ABS_PAYROLL_NATIONALITIES_URL,
    ABS_PAYROLL_POSTS_URL,
    ABS_PAYROLL_SERVICES_URL,
    ABS_PAYROLL_WILAYAS_URL,
    ABS_PAYROLL_PERSONS_URL
} from '../constants';
import {SideNavNode} from '@ss/common/ui-shell';

export const payrollNavTree: SideNavNode = {
    name: 'PAYROLL',
    icon: 'fas fa-users',
    children: [
        {
            name: 'LOOKUPS',
            icon: 'fas fa-clipboard-list',
            children: [
                {
                    name: 'PAYROLL_POSTS',
                    icon: 'fas fa-chair-office',
                    route: ABS_PAYROLL_POSTS_URL
                },
                {
                    name: 'PAYROLL_DIPLOMAS',
                    icon: 'fas fa-file-certificate',
                    route: ABS_PAYROLL_DIPLOMAS_URL
                },
                {
                    name: 'PAYROLL_EDUCATION_LEVELS',
                    icon: 'fas fa-graduation-cap',
                    route: ABS_PAYROLL_EDUCATION_LEVELS_URL
                },
                {
                    name: 'PAYROLL_MARITAL_STATUS',
                    icon: 'fas fa-rings-wedding',
                    route: ABS_PAYROLL_MARITAL_STATUS_URL
                },
                {
                    name: 'PAYROLL_CATEGORIES',
                    icon: 'fas fa-shapes',
                    route: ABS_PAYROLL_CATEGORIES_URL
                },
                {
                    name: 'PAYROLL_SERVICES',
                    icon: 'fas fa-shapes',
                    route: ABS_PAYROLL_SERVICES_URL
                },
                {
                    name: 'COMMON_WILAYAS',
                    icon: 'fas fa-route-interstate',
                    route: ABS_PAYROLL_WILAYAS_URL
                },
                {
                    name: 'PAYROLL_NATIONALITIES',
                    icon: 'fas fa-flag',
                    route: ABS_PAYROLL_NATIONALITIES_URL
                }
            ]
        },
        {
            name: 'PAYROLL_EMPLOYEES',
            icon: 'fas fa-user-friends',
            children: [
                {
                    name: 'PAYROLL_EMPLOYEES_LIST',
                    icon: 'fas fa-list-ol',
                    route: ABS_PAYROLL_PERSONS_URL
                }
            ]
        }
    ]
};
