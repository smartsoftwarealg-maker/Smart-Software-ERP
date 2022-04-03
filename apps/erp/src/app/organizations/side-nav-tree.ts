
import {ABS_ORGANIZATIONS_MAIN_URL} from '../common';
import {SideNavNode} from '@ss/common/api-common';

export const organizationsNavTree: SideNavNode = {
    {
        name: 'ORGANIZATIONS',
        icon: 'fas fa-building',
        route: ABS_ORGANIZATIONS_MAIN_URL,
        accessRights: 'Organization'
    }
};
