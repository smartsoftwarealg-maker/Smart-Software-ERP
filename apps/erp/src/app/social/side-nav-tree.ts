import { SideNavNode } from '@ss/common/api-common';
import {
    ABS_MEDICAL_AIDS_URL,
    ABS_SOCIAL_ACTIVITIES_URL,
    ABS_SOCIAL_MEDICAL_AIDS_URL,
    ABS_SOCIAL_WORKS_URL
} from './constants';

export const socialNavTree: SideNavNode = {
    name: 'SOCIAL_APP',
    icon: 'fa-solid fa-hands-holding-heart',
    children: [
        {
            name: 'SOCIAL_ACTIVITIES',
            icon: 'fa-solid fa-star-and-crescent',
            route: ABS_SOCIAL_ACTIVITIES_URL,
            accessRights: 'SocialAid'
        },

        {
            name: 'SOCIAL_MEDICAL_TYPES',
            icon: 'fa-solid fa-user-doctor-hair',
            route: ABS_SOCIAL_MEDICAL_AIDS_URL,
            accessRights: 'MedicalAid'
        },

        {
            name: 'SOCIAL_WORKS',
            icon: 'fa-solid fa-hands-holding-child',
            route: ABS_SOCIAL_WORKS_URL,
            accessRights: 'SocialWork'
        },

        {
            name: 'SOCIAL_MEDICAL_AIDS',
            icon: 'fa-solid fa-stretcher',
            route: ABS_MEDICAL_AIDS_URL,
            accessRights: 'SocialWork'
        },

    ],
    accessRights: 'SOCIAL'
};
