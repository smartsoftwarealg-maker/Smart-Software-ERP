import {SideNavNode} from '@ss/common/ui-shell';
import {
    ABS_ADMINISTRATION_BANK_URL,
    ABS_ADMINISTRATION_CENTER_URL,
    ABS_ADMINISTRATION_COMPANY_URL, ABS_ADMINISTRATION_REPORT_CATALOG,
    ABS_ADMINISTRATION_SMTP_URL
} from "../constants";

export const administrationNavTree: SideNavNode = {
    name: 'ADMINISTRATION',
    icon: 'fas fa-cog',
    children: [
        {
            name: 'ADMINISTRATION_COMPANY',
            icon: 'fas fa-building',
            route: ABS_ADMINISTRATION_COMPANY_URL
        },
        {
            name: 'ADMINISTRATION_CENTER',
            icon: 'fas fa-house-damage',
            route: ABS_ADMINISTRATION_CENTER_URL
        },
        {
            name: 'ADMINISTRATION_BANK',
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
            icon: 'fas fa-server',
            route: ABS_ADMINISTRATION_REPORT_CATALOG
        }
    ]
};
