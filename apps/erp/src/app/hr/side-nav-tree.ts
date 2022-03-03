import {
    ABS_HR_CATEGORIES_URL,
    ABS_HR_DIPLOMAS_URL,
    ABS_HR_EDUCATION_LEVELS_URL,
    ABS_HR_MARITAL_STATUS_URL,
    ABS_HR_NATIONALITIES_URL,
    ABS_HR_POSTS_URL,
    ABS_HR_SERVICES_URL,
    ABS_HR_EMPLOYEES_URL,
    ABS_HR_EMPLOYMENT_TYPE_URL,
    ABS_HR_SUSPENSION_REASON_URL,
    ABS_HR_DEPARTMENTS_URL,
    ABS_HR_DIVISIONS_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const hrNavTree: SideNavNode = {
    name: 'HR',
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
                {
                    name: 'COMMON_DIPLOMAS',
                    icon: 'fas fa-file-certificate',
                    route: ABS_HR_DIPLOMAS_URL
                },
                {
                    name: 'COMMON_EDUCATION_LEVELS',
                    icon: 'fas fa-graduation-cap',
                    route: ABS_HR_EDUCATION_LEVELS_URL
                },
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
            name: 'PAYROLL_EMPLOYEES_LIST',
            icon: 'fas fa-list-ol',
            route: ABS_HR_EMPLOYEES_URL
        }
    ]
};
