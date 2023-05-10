import {SideNavNode} from '@ss/common/api-common';
import { ABS_APP_ARCHIVE_VIEWER_URL, ABS_ARCHIVE_RIGHTS_URL } from '../common';

export const aaNavTree: SideNavNode = {
    name: 'COMMON_AAVIEWER',
    icon: 'fa-solid fa-telescope',
    children: [
        {
            name: 'COMMON_AAVIEWER',
            icon: 'fa-regular fa-telescope',
            route: ABS_APP_ARCHIVE_VIEWER_URL,
            accessRights: 'AppArchive'
        },
        {
            name: 'COMMON_ACCESS_RIGHTS',
            icon: 'fa-solid fa-hand',
            route: ABS_ARCHIVE_RIGHTS_URL,
            accessRights: 'AccessRight'
        },
    ],
    accessRights: 'AppArchive'
};
