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
import {loginGuard} from '../erp-guards';

export const mainRoutes: Routes = [
    {
        path: MISSION_PREPARATION_URL,
        children: [
            {
                path: LIST_URL,
                component: MissionPreparationListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: MissionPreparationDetailComponent,
                canActivate: [loginGuard],
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
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: TrajectoryDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }

];
