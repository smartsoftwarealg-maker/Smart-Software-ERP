import { Routes } from '@angular/router';
import {MISSION_PREPARATION_URL, MISSION_TRAJECTORIES} from '../common';
import {
    ABS_INDEX_URL,
    CanActivateService,
    CanDeactivateService,
    LIST_URL
} from '../../../../../libs/common/api-common/src';
import {
    MissionPreparationDetailComponent,
    MissionPreparationListComponent
} from '../../../../../libs/hr-missions/missions/src';
import {PayrollMonthGuard} from '../../../../../libs/payroll-common/src';
import {
    TrajectoryDetailComponent,
    TrajectoryListComponent
} from '../../../../../libs/hr-missions/mission-trajectories/src';

export const mainRoutes: Routes = [
    {
        path: MISSION_PREPARATION_URL,
        children: [
            {
                path: LIST_URL,
                component: MissionPreparationListComponent,
                canActivate: [CanActivateService, PayrollMonthGuard]
            },
            {
                path: ':id',
                component: MissionPreparationDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService, PayrollMonthGuard]
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
