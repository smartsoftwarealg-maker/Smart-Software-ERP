import {
    ABS_CUSTOMER_PROFILE, ABS_HOLIDAY_REQUEST
} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const empSpaceNavTree: SideNavNode[] =
    [
        {
            name: 'ATT_HOLIDAY_REQUEST',
            icon: 'fas fa-file-chart-line',
            route: ABS_HOLIDAY_REQUEST,
            accessRights: 'Holiday',
            customerRights: {read: true, edit: true, delete: true, write: true}
        },
        {
            name: 'COMMON_PROFILE',
            icon: 'fas fa-file-chart-line',
            route: ABS_CUSTOMER_PROFILE,
            accessRights: 'Report',
            customerRights: {read: true, edit: false, delete: true, write: true}
        }
    ];
