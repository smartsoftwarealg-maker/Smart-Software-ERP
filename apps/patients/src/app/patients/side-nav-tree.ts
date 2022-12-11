import {SideNavNode} from '@ss/common/api-common';
import {ABS_FINANCE_PAYMENTS, ABS_PATIENTS_PATIENTS, ABS_PATIENTS_REPORT_PARAMS} from '../common';

export const fileNavTree: SideNavNode = {
    name: 'COMMON_FILE',
    icon: 'fas fa-file',
    children: [
        {
            name: 'LOGISTICS_CUSTOMER',
            icon: 'fas fa-user',
            route: '',
            accessRights: 'Agent'
        },
    ]
};

export const patientNavTree: SideNavNode = {
    name: 'COMMON_PATIENTS',
    icon: 'fas fa-coins',
    children: [
        {
            name: 'COMMON_PATIENTS',
            icon: 'fas fa-coins',
            route: ABS_PATIENTS_PATIENTS,
            accessRights: 'Agent'
        },
        {
            name: 'COMMON_PAYMENTS',
            icon: 'fas fa-coins',
            route: ABS_FINANCE_PAYMENTS,
            accessRights: 'Payment'
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fas fa-file-chart-line',
            route: ABS_PATIENTS_REPORT_PARAMS,
            accessRights: 'Report'
        }
    ]
};
