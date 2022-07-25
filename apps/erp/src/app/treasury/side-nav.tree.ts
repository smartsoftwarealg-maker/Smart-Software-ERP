import {SideNavNode} from '@ss/common/api-common';
import { ABS_TREASURY_AGENT_URL } from '../common';
import { ABS_TREASURY_CHECKS_URL } from '../common';
import { ABS_TREASURY_CHECK_BOOKS_URL } from '../common';


export const treasuryNavTree: SideNavNode = {
    name: 'TREASURY',
    icon: 'fas fa-coins',
    accessRights: 'TREASURY',
    children: [
        {
            name: 'TRS_AGENTS',
            icon: 'fas fa-user',
            route: ABS_TREASURY_AGENT_URL,
            accessRights: 'Agent'
        },
        {
            name: 'TRS_CHECKS',
            icon: 'fas fa-check',
            route: ABS_TREASURY_CHECKS_URL,
            accessRights: 'Checks'
        },
        {
            name: 'TRS_CHECKBOOKS',
            icon: 'fas fa-check',
            route: ABS_TREASURY_CHECK_BOOKS_URL,
            accessRights: 'CheckBooks'
        }
    ]
}
