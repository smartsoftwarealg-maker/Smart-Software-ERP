import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_ADMINISTRATION_ACCESS_RIGHTS_URL,
    ABS_ADMINISTRATION_CENTER_URL,
    ABS_ADMINISTRATION_CITY_URL,
    ABS_ADMINISTRATION_COMPANY_URL, ABS_ADMINISTRATION_COUNTRY_URL, ABS_ADMINISTRATION_REPORT_CATALOG,
    ABS_ADMINISTRATION_ROLE_URL, ABS_ADMINISTRATION_TRACEABILITY_URL, ABS_ADMINISTRATION_USER_URL
} from '../common';

export const adminNavTree: SideNavNode = {
    name: 'ADMINISTRATION',
    icon: 'fas fa-cog',
    children: [
        {
            name: 'ADMINISTRATION_COMPANIES',
            icon: 'fas fa-building',
            route: ABS_ADMINISTRATION_COMPANY_URL,
            accessRights: 'Identitycard'
        },
        {
            name: 'ADMINISTRATION_CENTERS',
            icon: 'fas fa-house-damage',
            route: ABS_ADMINISTRATION_CENTER_URL,
            accessRights: 'Center'
        },
        {
            name: 'ADMINISTRATION_ROLES',
            icon: 'fas fa-user',
            route: ABS_ADMINISTRATION_ROLE_URL,
            accessRights: 'Role'
        },
        {
            name: 'COMMON_CITIES',
            icon: 'fas fa-city',
            route: ABS_ADMINISTRATION_CITY_URL,
            accessRights: 'City'
        },
        {
            name: 'COMMON_COUNTRIES',
            icon: 'fas fa-flag',
            route: ABS_ADMINISTRATION_COUNTRY_URL,
            accessRights: 'Lookup'
        },
        {
            name: 'ADMINISTRATION_USERS',
            icon: 'fas fa-user',
            route: ABS_ADMINISTRATION_USER_URL,
            accessRights: 'User'
        },
        {
            name: 'COMMON_ACCESS_RIGHTS',
            icon: 'fas fa-hand-paper',
            route: ABS_ADMINISTRATION_ACCESS_RIGHTS_URL,
            accessRights: 'AccessRight'
        },
        {
            name: 'COMMON_TRACEABILITY',
            icon: 'fas fa-tape',
            route: ABS_ADMINISTRATION_TRACEABILITY_URL,
            accessRights: 'Logging'
        },
        {
            name: 'ADMINISTRATION_REPORT_CATALOG',
            icon: 'fas fa-books',
            route: ABS_ADMINISTRATION_REPORT_CATALOG,
            accessRights: 'Report'
        }
    ]
};
