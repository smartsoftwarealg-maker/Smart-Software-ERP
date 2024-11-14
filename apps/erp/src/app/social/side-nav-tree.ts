import { SideNavNode } from '@ss/common/api-common';
import {
    ABS_MEDICAL_AIDS_URL, ABS_MUTUAL_REQUEST_URL,
    ABS_REIMBURSEMENT_URL,
    ABS_SOCIAL_ACTIVITIES_URL,
    ABS_SOCIAL_DASHBOARD_URL,
    ABS_SOCIAL_EDO_HEADER_URL,
    ABS_SOCIAL_EDO_URL,
    ABS_SOCIAL_LOANS_URL,
    ABS_SOCIAL_MEDICAL_AIDS_URL, ABS_SOCIAL_MUTUAL_TYPES_URL,
    ABS_SOCIAL_WORKS_URL
} from './constants';
import { ABS_LOANS_URL } from '../common';

export const socialNavTree: SideNavNode = {
    name: 'SOCIAL_APP',
    icon: 'fa-solid fa-hands-holding-heart',
    children: [
        {
            name: 'COMMON_DASHBOARD',
            icon: 'fa-solid fa-chart-pie',
            route: ABS_SOCIAL_DASHBOARD_URL,
            accessRights: 'SocialDashboard'
        },
        {
            name: 'SOCIAL_ACTIVITIES',
            icon: 'fa-solid fa-star-and-crescent',
            route: ABS_SOCIAL_ACTIVITIES_URL,
            accessRights: 'SocialAid'
        },
        {
            name: 'SOCIAL_MUTUAL_TYPES',
            icon: 'fa-solid fa-screen-users',
            route: ABS_SOCIAL_MUTUAL_TYPES_URL,
            accessRights: 'MutualType'
        },

        {
            name: 'SOCIAL_MEDICAL_TYPES',
            icon: 'fa-solid fa-user-doctor-hair',
            route: ABS_SOCIAL_MEDICAL_AIDS_URL,
            accessRights: 'SocialAid'
        },

        {
            name: 'SOCIAL_WORKS',
            icon: 'fa-solid fa-hands-holding-child',
            route: ABS_SOCIAL_WORKS_URL,
            accessRights: 'SocialAid'
        },

        {
            name: 'SOCIAL_MEDICAL_AIDS',
            icon: 'fa-solid fa-stretcher',
            route: ABS_MEDICAL_AIDS_URL,
            accessRights: 'SocialAid'
        },

        {
            name: 'SOCIAL_REIMBURSEMENTS',
            icon: 'fa-solid fa-money-check',
            route: ABS_REIMBURSEMENT_URL,
            accessRights: 'Reimbursement'
        },

        {
            name: 'SOCIAL_MUTUAL_REQUESTS',
            icon: 'fa-solid fa-hand-wave',
            route: ABS_MUTUAL_REQUEST_URL,
            accessRights: 'MutualRequest'
        },

        {
            name: 'SOCIAL_EDO_LIST',
            icon: 'fa-solid fa-money-bill-transfer',
            route: ABS_SOCIAL_EDO_HEADER_URL,
            accessRights: 'EDO'
        },

        {
            name: 'REMUN_EDO',
            icon: 'fa-solid fa-money-check-dollar-pen',
            route: ABS_SOCIAL_EDO_URL,
            accessRights: 'EDO'
        },

        {
            name: 'PAYROLL_LOANS',
            icon: 'fas fa-user-edit',
            route: ABS_SOCIAL_LOANS_URL,
            accessRights: 'Loan'
        },
    ],
    accessRights: 'SOCIAL'
};
