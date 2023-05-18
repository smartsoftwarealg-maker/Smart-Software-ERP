import {
    ABS_EMPLOYEE_PROFILE, ABS_ESPACE_REPORTS_URL, ABS_HOLIDAY_REQUEST, ABS_PERSONAL_PAYSLIP
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const empSpaceNavTree: SideNavNode[] =
    [
        {
            name: 'ATT_HOLIDAY_REQUEST',
            icon: 'fa-solid fa-umbrella-beach',
            route: ABS_HOLIDAY_REQUEST,
            accessRights: 'Holiday',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'REMUN_PAY_SLIP',
            icon: 'fas fa-file-chart-line',
            route: ABS_PERSONAL_PAYSLIP,
            accessRights: 'Holiday',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fa-solid fa-file-chart-column',
            route: ABS_ESPACE_REPORTS_URL,
            accessRights: 'Report',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'COMMON_PROFILE',
            icon: 'fas fa-file-chart-line',
            route: ABS_EMPLOYEE_PROFILE,
            accessRights: 'Report',
            customerRights: {read: true, edit: false, delete: true, write: true}
        }
    ];
