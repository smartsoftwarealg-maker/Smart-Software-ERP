import {
    ABS_ADMINISTRATION_BANK_URL,
    ABS_ADMINISTRATION_TRACEABILITY_URL,
    ABS_ADMINISTRATION_CENTER_URL,
    ABS_ADMINISTRATION_ACCESS_RIGHTS_URL,
    ABS_ADMINISTRATION_COMPANY_URL,
    ABS_ADMINISTRATION_REPORT_CATALOG,
    ABS_ADMINISTRATION_ROLE_URL,
    ABS_ADMINISTRATION_SMTP_URL,
    ABS_ADMINISTRATION_USER_URL,
    ABS_ADMINISTRATION_COUNTRY_URL,
    ABS_ADMINISTRATION_CITY_URL,
    ABS_ADMINISTRATION_WILAYA_URL,
    ABS_ADMINISTRATION_ATTRIBUTES_URL,
    ABS_DB_UPDATER_URL,
    ABS_APP_ARCHIVE_DOCUMENTS_URL,
    ABS_ADMINISTRATION_DAIRAS_URL,
    ABS_ADMINISTRATION_DOCUMENT_URL, ABS_ADMINISTRATION_REPORT_RIGHTS_URL
} from "../common";
import {SideNavNode} from '@ss/common/api-common';

export const administrationNavTree: SideNavNode = {
    name: 'ADMINISTRATION',
    icon: 'fas fa-cog',
    accessRights: 'ADMINISTRATION',
    children: [
        {
            name: 'ADMINISTRATION_COMPANIES',
            icon: 'fas fa-building',
            route: ABS_ADMINISTRATION_COMPANY_URL,
            accessRights: 'Company'
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
            name: 'COMMON_WILAYAS',
            icon: 'fa-regular fa-earth-africa',
            route: ABS_ADMINISTRATION_WILAYA_URL,
            accessRights: 'Wilaya'
        },
        {
            name: 'COMMON_DAIRAS',
            icon: 'fa-solid fa-map-location-dot',
            route: ABS_ADMINISTRATION_DAIRAS_URL,
            accessRights: 'Daira'
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
            accessRights: 'Country'
        },
        {
            name: 'ADMINISTRATION_USERS',
            icon: 'fas fa-user-friends',
            route: ABS_ADMINISTRATION_USER_URL,
            accessRights: 'User'
        },
        {
            name: 'ADMINISTRATION_BANKS',
            icon: 'fas fa-university',
            route: ABS_ADMINISTRATION_BANK_URL,
            accessRights: 'Bank'
        },
        {
            name: 'ADMINISTRATION_SMTP',
            icon: 'fa-solid fa-at',
            route: ABS_ADMINISTRATION_SMTP_URL,
            accessRights: 'SMTP'
        },
        {
            name: 'ADMINISTRATION_ARCHIVE_DOCUMENTS',
            icon: 'fa-solid fa-box-archive',
            route: ABS_APP_ARCHIVE_DOCUMENTS_URL,
            accessRights: 'AppArchive'
        },
        {
            name: 'ADMINISTRATION_CUSTOM_DATA',
            icon: 'fa-solid fa-user-pen',
            route: ABS_ADMINISTRATION_ATTRIBUTES_URL,
            accessRights: 'AttribTempl'
        },
        {
            name: 'LOGISTICS_DOCUMENT_NUMBERING',
            icon: 'fas fa-list-ol',
            route: ABS_ADMINISTRATION_DOCUMENT_URL,
            accessRights: 'Document'
        },
        {
            name: 'ADMINISTRATION_REPORT_CATALOG',
            icon: 'fas fa-books',
            route: ABS_ADMINISTRATION_REPORT_CATALOG,
            accessRights: 'ReportCatalog'
        },
        {
            name: 'COMMON_ACCESS_RIGHTS',
            icon: 'fas fa-hand-paper',
            route: ABS_ADMINISTRATION_ACCESS_RIGHTS_URL,
            accessRights: 'AccessRight'
        },
        {
            name: 'COMMON_REPORT_RIGHTS',
            icon: 'fa-regular fa-ban',
            route: ABS_ADMINISTRATION_REPORT_RIGHTS_URL,
            accessRights: 'RoleReport'
        },
        {
            name: 'COMMON_DB_UPDATER',
            icon: 'fa-solid fa-calendar-lines-pen',
            route: ABS_DB_UPDATER_URL,
            accessRights: 'Logging'
        },

        {
            name: 'COMMON_TRACEABILITY',
            icon: 'fas fa-tape',
            route: ABS_ADMINISTRATION_TRACEABILITY_URL,
            accessRights: 'Logging'
        },
    ]
};
