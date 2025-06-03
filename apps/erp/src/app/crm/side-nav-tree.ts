import { SideNavNode } from '@ss/common/api-common';
import {
    ABS_CRM_CONTACT_METHODS_URL, ABS_CRM_CUSTOMER_URL,
    ABS_CRM_DEPARTMENTS_URL,
    ABS_CRM_JOBS_URL, ABS_CRM_PAYMENT_TERMS_URL,
    ABS_CRM_SALUTATIONS_URL,
    ABS_CRM_STATUS_URL
} from '../common';

export const crmNavTree: SideNavNode = {
    name: 'CRM',
    icon: 'fa-solid fa-handshake',
    children: [
        {
            name: 'CRM_SALUTATIONS',
            icon: 'fa-solid fa-handshake-simple',
            route: ABS_CRM_SALUTATIONS_URL,
            accessRights: 'Salutation',
        },
        {
            name: 'CRM_JOBS',
            icon: 'fa-solid fa-user-helmet-safety',
            route: ABS_CRM_JOBS_URL,
            accessRights: 'CRMJob',
        },
        {
            name: 'COMMON_DEPARTMENT',
            icon: 'fa-solid fa-building',
            route: ABS_CRM_DEPARTMENTS_URL,
            accessRights: 'CRMDepartment',
        },
        {
            name: 'CRM_CONTACT_METHOD',
            icon: 'fa-solid fa-file-signature',
            route: ABS_CRM_CONTACT_METHODS_URL,
            accessRights: 'ContractMethod',
        },
        {
            name: 'COMMON_STATUS',
            icon: 'fa-solid fa-user-tie',
            route: ABS_CRM_STATUS_URL,
            accessRights: 'CRMStatus',
        },
        {
            name: 'CRM_PAYMENT_TERM',
            icon: 'fa-solid fa-money-check-dollar-pen',
            route: ABS_CRM_PAYMENT_TERMS_URL,
            accessRights: 'CRMPaymentTerm',
        },
        {
            name: 'LOGISTICS_CUSTOMER',
            icon: 'fa-solid fa-users',
            route: ABS_CRM_CUSTOMER_URL,
            accessRights: 'CRMCustomer',
        },
    ],
    accessRights: 'CRM',
};
