import { Routes } from '@angular/router';
import {
    MISSION_ELEMENTS_URL,
    MISSION_EXPENSES_URL,
    MISSION_PREPARATION_URL,
    MISSION_TRAJECTORIES,
} from '../common';
import {
    ABS_INDEX_URL,
    CanDeactivateService,
    LIST_URL,
} from '@ss/common/api-common';

import {
    TrajectoryDetailComponent,
    TrajectoryListComponent,
} from '@ss/hr-missions/mission-trajectories';

import {
    MissionPreparationDetailComponent,
    MissionPreparationListComponent,
} from '@ss/hr-missions/missions';
import { loginGuard } from '../erp-guards';
import {
    MissionExpensesDetailComponent,
    MissionExpensesLineDetailComponent,
    MissionExpensesLineListComponent,
    MissionExpensesListComponent,
} from '@ss/hr-missions/mission-expenses';
import {
    MissionElementsDetailComponent,
    MissionElementsLinesDetailComponent,
    MissionElementsLinesListComponent,
    MissionElementsListComponent,
} from '@ss/hr-missions/mission-elements';

export const mainRoutes: Routes = [
    {
        path: MISSION_PREPARATION_URL,
        children: [
            {
                path: LIST_URL,
                component: MissionPreparationListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: MissionPreparationDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' },
        ],
    },
    {
        path: MISSION_TRAJECTORIES,
        children: [
            {
                path: LIST_URL,
                component: TrajectoryListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: TrajectoryDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' },
        ],
    },
    {
        path: MISSION_EXPENSES_URL,
        children: [
            {
                path: LIST_URL,
                component: MissionExpensesListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: MissionExpensesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', redirectTo: 'detail', pathMatch: 'full' },
                    {
                        path: 'detail',
                        children: [
                            {
                                path: '',
                                component: MissionExpensesLineListComponent,
                                pathMatch: 'full',
                            },
                            {
                                path: ':id',
                                component: MissionExpensesLineDetailComponent,
                            },
                        ],
                    },
                ],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' },
        ],
    },
    {
        path: MISSION_ELEMENTS_URL,
        children: [
            {
                path: LIST_URL,
                component: MissionElementsListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: MissionElementsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', redirectTo: 'detail', pathMatch: 'full' },
                    {
                        path: 'detail',
                        children: [
                            {
                                path: '',
                                component: MissionElementsLinesListComponent,
                                pathMatch: 'full',
                            },
                            {
                                path: ':id',
                                component: MissionElementsLinesDetailComponent,
                            },
                        ],
                    },
                ],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' },
        ],
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL },
];
