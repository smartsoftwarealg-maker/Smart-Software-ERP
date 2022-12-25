import {ABS_DASHBOARD_QUERY_URL, ABS_DASHBOARD_URL} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const dashboardNavTree: SideNavNode = {
    name: 'DASHBOARD-APP',
    icon: 'fa-solid fa-gauge-min',
    accessRights: 'DASHBOARD-APP',
    children: [
        {
            name: 'COMMON_DASHBOARD_QUERIES',
            icon: 'fas fa-user',
            route: ABS_DASHBOARD_QUERY_URL,
            accessRights: 'DashboardQuery'
        },
        {
            name: 'COMMON_DASHBOARD',
            icon: 'fa-solid fa-gauge-min',
            route: ABS_DASHBOARD_URL,
            accessRights: 'Dashboard'
        },
    ]
};
