
import {
    ABS_ORGANIZATIONS_CHART_URL,
    ABS_ORGANIZATIONS_DIVISIONS_URL
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const organizationsNavTree: SideNavNode = {
    name: 'ORGANIZATIONS',
    icon: 'fas fa-building',
    accessRights: 'Organization',
    children: [
        {
            name: 'ORGANIZATIONS',
            icon: 'fas fa-building',
            route: ABS_ORGANIZATIONS_CHART_URL,
            accessRights: 'Organization'
        },
        {
            name: 'COMMON_DIVISIONS',
            icon: 'fas fa-building',
            route: ABS_ORGANIZATIONS_DIVISIONS_URL,
            accessRights: 'Division'
        }
    ]
};
