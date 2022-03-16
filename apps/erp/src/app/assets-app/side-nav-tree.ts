import {SideNavNode} from '@ss/common/api-common';
import {ABS_ASSETS_URL} from '../common';

export const assetsNavTree: SideNavNode = {
    name: 'ASSETS',
    icon: 'fa-solid fa-car-bus',
    accessRights: 'ASSETS',
    children: [
        {
            name: 'COMMON_ASSETS',
            icon: 'fa-solid fa-car-building',
            route: ABS_ASSETS_URL
        },
    ]
};
