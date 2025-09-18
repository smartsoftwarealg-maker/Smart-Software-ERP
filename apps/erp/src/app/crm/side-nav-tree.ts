import { SideNavNode } from '@ss/common/api-common';
import {
     ABS_CRM_CALENDAR_URL,
    ABS_CRM_CAMPAIGN_URL,
    ABS_CRM_CONTACT_METHODS_URL, ABS_CRM_CUSTOMER_URL,
    ABS_CRM_DEPARTMENTS_URL, ABS_CRM_EMAIL_TEMPLATE_URL,
    ABS_CRM_JOBS_URL, ABS_CRM_LEADS_URL, ABS_CRM_MAILING_LIST_URL, ABS_CRM_OPPORTUNITY_URL, ABS_CRM_PAYMENT_TERMS_URL,
    ABS_CRM_SALUTATIONS_URL,
    ABS_CRM_STATUS_URL, ABS_CRM_TEAMS_URL
} from '../common';

export const crmNavTree: SideNavNode = {
    name: 'CRM',
    icon: 'fa-solid fa-handshake',
    children: [
        {
            name: 'CRM_SALUTATIONS',
            icon: 'fa-solid fa-handshake-simple',
            route: ABS_CRM_SALUTATIONS_URL,
            accessRights: 'Salutation'
        },
        {
            name: 'CRM_JOBS',
            icon: 'fa-solid fa-user-helmet-safety',
            route: ABS_CRM_JOBS_URL,
            accessRights: 'CRMJob'
        },
        {
            name: 'COMMON_DEPARTMENT',
            icon: 'fa-solid fa-building',
            route: ABS_CRM_DEPARTMENTS_URL,
            accessRights: 'CRMDepartment'
        },
        {
            name: 'CRM_CONTACT_METHOD',
            icon: 'fa-solid fa-file-signature',
            route: ABS_CRM_CONTACT_METHODS_URL,
            accessRights: 'ContractMethod'
        },
        {
            name: 'COMMON_STATUS',
            icon: 'fa-solid fa-user-tie',
            route: ABS_CRM_STATUS_URL,
            accessRights: 'CRMStatus'
        },
        {
            name: 'CRM_PAYMENT_TERM',
            icon: 'fa-solid fa-money-check-dollar-pen',
            route: ABS_CRM_PAYMENT_TERMS_URL,
            accessRights: 'CRMPaymentTerm'
        },
        {
            name: 'CRM_MAILING_LIST',
            icon: 'fa-solid fa-inbox',
            route: ABS_CRM_MAILING_LIST_URL,
            accessRights: 'CRMMailingList'
        },
        {
            name: 'CRM_EMAIL_TEMPLATES',
            icon: 'fas fa-envelope',
            route: ABS_CRM_EMAIL_TEMPLATE_URL,
            accessRights: 'CRMEmail',
        },
        {
            name: 'LOGISTICS_CUSTOMERS',
            icon: 'fa-solid fa-users',
            route: ABS_CRM_CUSTOMER_URL,
            accessRights: 'CRMCustomer'
        },
        {
            name: 'CRM_CAMPAIGNS',
            icon: 'fas fa-bullhorn',
            route: ABS_CRM_CAMPAIGN_URL,
            accessRights: 'CRMCampaign'
        },
        {
            name: 'CRM_LEADS',
            icon: 'fa-solid fa-telescope',
            route: ABS_CRM_LEADS_URL,
            accessRights: 'CRMCustomer'
        },
        {
            name: 'CRM_OPPORTUNITIES',
            icon: 'fa-solid fa-handshake',
            route: ABS_CRM_OPPORTUNITY_URL,
            accessRights: 'CRMCustomer'
        },
        {
            name: 'CRM_TEAMS',
            icon: 'fas fa-people-group',
            route: ABS_CRM_TEAMS_URL,
            accessRights: 'CRMTeams'
        },
        {
            name: 'CRM_EMAIL_TEMPLATES',
            icon: 'fas fa-envelope',
            route: ABS_CRM_EMAIL_TEMPLATE_URL,
            accessRights: 'CRMEmail'
        },
        {
            name: 'CRM_CALENDAR',
            icon: 'fa-regular fa-calendar',
            route: ABS_CRM_CALENDAR_URL,
            accessRights: 'CRMCalendar'
        }
    ],
    accessRights: 'CRM'
};
