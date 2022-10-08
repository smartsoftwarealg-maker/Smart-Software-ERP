import { Routes } from '@angular/router';
import {MISSION_PREPARATION_URL, MISSION_TRAJECTORIES} from '../common';

import {
    ABS_INDEX_URL,
    CanActivateService,
    CanDeactivateService,
    LIST_URL
} from '@ss/common/api-common';

import {
    TrajectoryDetailComponent,
    TrajectoryListComponent
} from '@ss/hr-missions/mission-trajectories';

import {
    MissionPreparationDetailComponent,
    MissionPreparationListComponent
} from '@ss/hr-missions/missions';

export const mainRoutes: Routes = [
    {
        path: MISSION_PREPARATION_URL,
        children: [
            {
                path: LIST_URL,
                component: MissionPreparationListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: MissionPreparationDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: MISSION_TRAJECTORIES,
        children: [
            {
                path: LIST_URL,
                component: TrajectoryListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: TrajectoryDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }

];
