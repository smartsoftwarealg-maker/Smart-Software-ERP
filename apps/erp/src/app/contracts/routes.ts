import { Routes } from '@angular/router';
import {
    CONTRACTS_PROJECT_TYPE_URL,
    CONTRACT_PROJECT_URL,
    CONTRACTS_PROJECT_MOTIVE_URL,
    CONTRACTS_AWARD_PROCEDURE_URL
} from '../common';
import {CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {
    AwardProcedureDetailComponent,
    AwardProcedureListComponent,
    ProjectTypeDetailComponent,
    ProjectTypeListComponent
} from '@ss/common/ui-lookup';
import {SalesContractDetailComponent, SalesContractListComponent} from '@ss/logistics/contracts';
import {
    ProjectMotiveDetailComponent,
    ProjectMotiveListComponent
} from '@ss/common/ui-lookup';

export const mainRoutes: Routes = [
    {
        path: CONTRACTS_AWARD_PROCEDURE_URL,
        children: [
            {
                path: LIST_URL,
                component: AwardProcedureListComponent
            },
            {
                path: ':id',
                component: AwardProcedureDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: CONTRACTS_PROJECT_MOTIVE_URL,
        children: [
            {
                path: LIST_URL,
                component: ProjectMotiveListComponent
            },
            {
                path: ':id',
                component: ProjectMotiveDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: CONTRACTS_PROJECT_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: ProjectTypeListComponent
            },
            {
                path: ':id',
                component: ProjectTypeDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: CONTRACT_PROJECT_URL,
        children: [
            {
                path: LIST_URL,
                component: SalesContractListComponent
            },
            {
                path: ':id',
                component: SalesContractDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

];
