import { SideNavNode } from '@ss/common/api-common';
import {ABS_ARCHIVE_URL} from '../common';

export const webArchNavTree: SideNavNode = {
    name: 'WEBARCH',
    icon: 'fas fa-users',
    children: [
        {
            name: 'COMMON_ARCHIVE',
            icon: 'fas fa-image',
            route: ABS_ARCHIVE_URL
        },
    ]
};
