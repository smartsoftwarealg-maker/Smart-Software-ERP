import {
    ABS_CUSTOMER_COMPLAINTS_URL,
    ABS_CUSTOMER_POLL_URL, ABS_CUSTOMER_SUGGESTIONS_URL,
    ABS_SSPACE_PROFILE_URL,
    ABS_SSPACE_REPORTS_URL,
} from './common';
import {SideNavNode} from '@ss/common/api-common';

export const sSpaceNavTree: SideNavNode[] =
    [
        {
            name: 'COMMON_COMPLAINTS',
            icon: 'fa-solid fa-face-angry',
            route: ABS_CUSTOMER_COMPLAINTS_URL,
            accessRights: 'CustomerComplaint',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'COMMON_SUGGESTIONS',
            icon: 'fa-solid fa-lightbulb-exclamation-on',
            route: ABS_CUSTOMER_SUGGESTIONS_URL,
            accessRights: 'CustomerSuggestion',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'SCH_CUSTOMER_POLL',
            icon: 'fa-regular fa-clipboard-question',
            route: ABS_CUSTOMER_POLL_URL,
            accessRights: 'CustomerPoll',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'COMMON_PROFILE',
            icon: 'fas fa-file-chart-line',
            route: ABS_SSPACE_PROFILE_URL,
            accessRights: 'Profile',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fa-solid fa-file-chart-column',
            route: ABS_SSPACE_REPORTS_URL,
            accessRights: 'Report',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
    ];
