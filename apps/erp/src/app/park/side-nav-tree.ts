
import {SideNavNode} from '@ss/common/api-common';
import { ABS_PARK_DRIVER_URL } from '../common';

export const parkNavTree: SideNavNode = {
    name: 'PARK',
    icon: 'fa-solid fa-cars',
    children: [
        {
            name: 'PARK_DRIVER',
            icon: 'fa-solid fa-id-card',
            route: ABS_PARK_DRIVER_URL,
            accessRights: 'Driver'
        },

    ],
    accessRights: 'PARK'
};
