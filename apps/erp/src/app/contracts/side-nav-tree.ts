
import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_CONTRACTS_AWARD_PROCEDURE, ABS_CONTRACTS_CONTRACT_URL,
    ABS_CONTRACTS_PROJECT_MOTIVE,
    ABS_CONTRACTS_PROJECT_TYPE,
    ABS_CONTRACTS_PROJECT_URL
} from '../common';

export const contractsNavTree: SideNavNode = {
    name: 'COMMON_PROJECTS',
    icon: 'fas fa-coins',
    accessRights: 'Project',
    children: [
        {
            name: 'LOGISTICS_PROJECT_TYPES',
            icon: 'fa-solid fa-message-text',
            route: ABS_CONTRACTS_PROJECT_TYPE,
            accessRights: 'ProjectType'
        },
        {
            name: 'LOGISTICS_AWARD_PROCEDURES',
            icon: 'fa-solid fa-award',
            route: ABS_CONTRACTS_AWARD_PROCEDURE,
            accessRights: 'AwardProcedure'
        },
        {
            name: 'COMMON_MOTIVES',
            icon: 'fa-solid fa-goal-net',
            route: ABS_CONTRACTS_PROJECT_MOTIVE,
            accessRights: 'ProjectMotive'
        },
        {
            name: 'COMMON_PROJECTS',
            icon: 'fa-solid fa-file-signature',
            route: ABS_CONTRACTS_PROJECT_URL,
            accessRights: 'Project'
        },
        {
            name: 'COMMON_CONTRACTS',
            icon: 'fa-solid fa-file-contract',
            route: ABS_CONTRACTS_CONTRACT_URL,
            accessRights: 'Project'
        },
    ]
};
