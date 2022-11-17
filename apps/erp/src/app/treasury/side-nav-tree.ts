import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_ASSET_DASHBOARD_URL,
    ABS_ASSETS_REPORTS_URL,
    ABS_TREASURY_AGENT_URL,
    ABS_TREASURY_DASHBOARD_URL, ABS_TREASURY_REPORTS_URL
} from '../common';
import { ABS_TREASURY_CHECKS_URL } from '../common';
import { ABS_TREASURY_CHECK_BOOKS_URL } from '../common';
import { ABS_TREASURY_JOURNALS_URL } from '../common';


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
            icon: 'fas fa-money-check-dollar',
            route: ABS_TREASURY_CHECKS_URL,
            accessRights: 'Checks'
        },
        {
            name: 'TRS_CHECKBOOKS',
            icon: 'fas fa-money-check-dollar-pen',
            route: ABS_TREASURY_CHECK_BOOKS_URL,
            accessRights: 'CheckBooks'
        },
        {
            name: 'TRS_JOURNALS',
            icon: 'fas fa-book',
            route: ABS_TREASURY_JOURNALS_URL,
            accessRights: 'Journals'
        },
        {
            name: 'COMMON_DASHBOARD',
            icon: 'fa-solid fa-gauge-min',
            route: ABS_TREASURY_DASHBOARD_URL,
            accessRights: 'Dashboard'
        },
        {
            name: 'COMMON_REPORTS',
            icon: 'fa-sharp fa-solid fa-file-chart-column',
            route: ABS_TREASURY_REPORTS_URL,
            accessRights: 'Report'
        },
    ]
}
