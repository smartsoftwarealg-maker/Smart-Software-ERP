import {
    ABS_HR_EMPLOYEES_URL,
    ABS_HR_PERSON_LIST_URL,
    ABS_HR_REPORTS_URL,
    ABS_INACTIVE_HR_EMPLOYEES_URL,
    ABS_HR_DASHBOARD_URL,
    ABS_HR_HOLIDAY_REQUEST_URL,
    ABS_HR_REPORT_RIGHT_URL, ABS_WORK_STOPPAGES_URL, ABS_EMPLOYEE_ID_UPDATE_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const hrNavTree: SideNavNode = {
    name: 'HR',
    icon: 'fas fa-users',
    children: [
        // {
        //     name: 'COMMON_EDUCATION_LEVELS',
        //     icon: 'fas fa-graduation-cap',
        //     route: ABS_HR_EDUCATION_LEVELS_URL
        // },
        // {
        //     name: 'COMMON_MARITAL_STATUS',
        //     icon: 'fas fa-rings-wedding',
        //     route: ABS_HR_MARITAL_STATUS_URL
        // },
        // {
        //     name: 'COMMON_CATEGORIES',
        //     icon: 'fas fa-shapes',
        //     route: ABS_HR_CATEGORIES_URL
        // },
        // {
        //     name: 'COMMON_DIVISIONS',
        //     icon: 'fas fa-puzzle-piece',
        //     route: ABS_HR_DIVISIONS_URL
        // },
        // {
        //     name: 'COMMON_DEPARTMENTS',
        //     icon: 'far fa-building',
        //     route: ABS_HR_DEPARTMENTS_URL
        // },
        // {
        //     name: 'COMMON_SERVICES',
        //     icon: 'fas fa-shapes',
        //     route: ABS_HR_SERVICES_URL
        // },
        // {
        //     name: 'PAYROLL_JUDICIAL_FRAMES',
        //     icon: 'fa-regular fa-gavel',
        //     route: ABS_HR_JUDICIAL_FRAMES_URL
        // },
        // {
        //     name: 'PAYROLL_PAYROLL_MOTIVES',
        //     icon: 'fa-solid fa-goal-net',
        //     route: ABS_HR_MOTIVES_URL
        // },
        // {
        //     name: 'PAYROLL_DECISION_MOTIVES',
        //     icon: 'fa-solid fa-goal-net',
        //     route: ABS_HR_DECISION_MOTIVES_URL
        // },
        // {
        //     name: 'PAYROLL_CONTRACT_MOTIVES',
        //     icon: 'fa-solid fa-bullseye',
        //     route: ABS_HR_CONTRACT_MOTIVES_URL
        // },
        // {
        //     name: 'COMMON_NATIONALITIES',
        //     icon: 'fas fa-flag',
        //     route: ABS_HR_NATIONALITIES_URL
        // },
        // {
        //     name: 'PAYROLL_PUNISHMENT_TYPE',
        //     icon: 'fas fa-file-certificate',
        //     route: ABS_PUNISHMENT_TYPE_URL
        // },
        // {
        //     name: 'PAYROLL_PUNISHMENTS',
        //     icon: 'fas fa-graduation-cap',
        //     route: ABS_PROFESSIONAL_FAULTS_URL
        // },
        {
            name: 'PAYROLL_INACTIVE_EMPLOYEES_LIST',
            icon: 'fas fa-users-slash',
            route: ABS_INACTIVE_HR_EMPLOYEES_URL,
            accessRights: 'Person'
        },
        {
            name: 'PAYROLL_EMPLOYEES_LIST',
            icon: 'fad fa-users',
            route: ABS_HR_EMPLOYEES_URL,
            accessRights: 'Person'
        },
        {
            name: 'PAYROLL_WORK_STOPPAGES',
            icon: 'fa-regular fa-stopwatch',
            route: ABS_WORK_STOPPAGES_URL,
            accessRights: 'Accident'
        },
        {
            name: 'PAYROLL_EMPLOYEE_SUMMARY',
            icon: 'fa-solid fa-list-ul',
            route: ABS_HR_PERSON_LIST_URL,
            accessRights: 'Person'
        },
        {
            name: 'ATT_HOLIDAY_REQUEST',
            icon: 'fa-solid fa-umbrella-beach',
            route: ABS_HR_HOLIDAY_REQUEST_URL,
            accessRights: 'HolidayRequest'
        },
        {
            name: 'PAYROLL_ID_UPDATE',
            icon: 'fa-solid fa-pen-to-square',
            route: ABS_EMPLOYEE_ID_UPDATE_URL,
            accessRights: 'IDUpdate'
        },
        {
            name: 'COMMON_REPORT_RIGHTS',
            icon: 'fa-regular fa-ban',
            route: ABS_HR_REPORT_RIGHT_URL,
            accessRights: 'RoleReport'
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fa-solid fa-file-chart-column',
            route: ABS_HR_REPORTS_URL,
            accessRights: 'Report'
        },
        {
            name: 'COMMON_DASHBOARD',
            icon: 'fa-solid fa-gauge-min',
            route: ABS_HR_DASHBOARD_URL,
            accessRights: 'Dashboard'
        },
    ],
    accessRights: 'HRMASTER'
};
