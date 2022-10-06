
import {SideNavNode} from '@ss/common/api-common';
import {ABS_MISSION_PREPARATION_URL, ABS_TRAJECTORY_URL} from '../common';

export const missionsNavTree: SideNavNode = {
    name: 'MISSIONS',
    icon: 'fas fa-coins',
    accessRights: 'MISSIONS',
    children: [
        {
            name: 'MISSION_TRAJECTORIES',
            icon: 'far fa-bezier-curve',
            route: ABS_TRAJECTORY_URL
        },
        {
            name: 'MISSION_MISSION_PREPARATION',
            icon: 'fas fa-plane',
            route: ABS_MISSION_PREPARATION_URL
        },

    ]
}
