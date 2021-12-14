import {ABS_DASHBOARD_QUERY_URL, ABS_DASHBOARD_URL} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const dashboardNavTree: SideNavNode = {
    name: 'COMMON_DASHBOARD',
    icon: 'fas fa-folder',
    children: [
        {
            name: 'COMMON_DASHBOARD_QUERIES',
            icon: 'fas fa-user',
            route: ABS_DASHBOARD_QUERY_URL,
            accessRights: 'Dashboard'
        },
        {
            name: 'COMMON_DASHBOARD',
            icon: 'fas fa-user-circle',
            route: ABS_DASHBOARD_URL,
            accessRights: 'Dashboard'
        },
    ]
};
