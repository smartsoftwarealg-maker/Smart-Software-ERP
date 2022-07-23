import { SideNavNode } from '@ss/common/api-common';
import {ABS_ARCHIVE_URL, ABS_TAG_URL} from '../common';

export const webArchNavTree: SideNavNode = {
    name: 'WEBARCH',
    icon: 'fa-solid fa-cabinet-filing',
    children: [
        {
            name: 'WAR_TAGS',
            icon: 'fas fa-tags',
            route: ABS_TAG_URL
        },
        {
            name: 'COMMON_ARCHIVE',
            icon: 'fas fa-image',
            route: ABS_ARCHIVE_URL
        },
    ],
    accessRights: 'WEBARCHIVE'
};
