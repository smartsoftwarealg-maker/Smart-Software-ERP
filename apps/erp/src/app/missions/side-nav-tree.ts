
import {SideNavNode} from '@ss/common/api-common';
import {
    ABS_MISSION_ELEMENTS_URL,
    ABS_MISSION_EXPENSES_URL,
    ABS_MISSION_PREPARATION_URL,
    ABS_MISSION_TRAJECTORY_URL
} from '../common';

export const missionsNavTree: SideNavNode = {
    name: 'MISSIONS',
    icon: 'fas fa-coins',
    accessRights: 'Mission',
    children: [
        {
            name: 'MISSION_TRAJECTORIES',
            icon: 'far fa-bezier-curve',
            route: ABS_MISSION_TRAJECTORY_URL,
            accessRights: 'Trajectory'
        },
        {
            name: 'MISSION_MISSION_PREPARATION',
            icon: 'fas fa-plane',
            route: ABS_MISSION_PREPARATION_URL,
            accessRights: 'Mission'

        },
        {
            name: 'MISSION_MISSION_EXPENSES',
            icon: 'fa-solid fa-money-bills',
            route: ABS_MISSION_EXPENSES_URL,
            accessRights: 'Journey'

        },
        {
            name: 'MISSION_MISSION_ELEMENT',
            icon: 'fas fa-plane',
            route: ABS_MISSION_ELEMENTS_URL,
            accessRights: 'Mission'
        },

    ]
}
