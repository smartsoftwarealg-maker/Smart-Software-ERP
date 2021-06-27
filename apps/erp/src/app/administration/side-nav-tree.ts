import {
    ABS_ADMINISTRATION_BANK_URL,
    ABS_ADMINISTRATION_CENTER_URL,
    ABS_ADMINISTRATION_COMPANY_URL, ABS_ADMINISTRATION_REPORT_CATALOG, ABS_ADMINISTRATION_ROLE_URL,
    ABS_ADMINISTRATION_SMTP_URL, ABS_ADMINISTRATION_USER_URL, ABS_ADMINISTRATION_COUNTRY_URL, ABS_ADMINISTRATION_CITY_URL, ABS_ADMINISTRATION_WILAYA_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const administrationNavTree: SideNavNode = {
    name: 'ADMINISTRATION',
    icon: 'fas fa-cog',
    children: [
        {
            name: 'ADMINISTRATION_COMPANIES',
            icon: 'fas fa-building',
            route: ABS_ADMINISTRATION_COMPANY_URL
        },
        {
            name: 'ADMINISTRATION_CENTERS',
            icon: 'fas fa-house-damage',
            route: ABS_ADMINISTRATION_CENTER_URL
        },
        {
            name: 'ADMINISTRATION_ROLES',
            icon: 'fas fa-user',
            route: ABS_ADMINISTRATION_ROLE_URL
        },
        {
            name: 'COMMON_CITIES',
            icon: 'fas fa-city',
            route: ABS_ADMINISTRATION_CITY_URL
        },
        {
            name: 'COMMON_WILAYAS',
            icon: 'fas fa-route-interstate',
            route: ABS_ADMINISTRATION_WILAYA_URL
        },
        {
            name: 'COMMON_COUNTRIES',
            icon: 'fas fa-flag',
            route: ABS_ADMINISTRATION_COUNTRY_URL
        },
        {
            name: 'ADMINISTRATION_USERS',
            icon: 'fas fa-user',
            route: ABS_ADMINISTRATION_USER_URL
        },
        {
            name: 'ADMINISTRATION_BANKS',
            icon: 'fas fa-university',
            route: ABS_ADMINISTRATION_BANK_URL
        },
        {
            name: 'ADMINISTRATION_SMTP',
            icon: 'fas fa-server',
            route: ABS_ADMINISTRATION_SMTP_URL
        },
        {
            name: 'ADMINISTRATION_REPORT_CATALOG',
            icon: 'fas fa-books',
            route: ABS_ADMINISTRATION_REPORT_CATALOG
        }
    ]
};
