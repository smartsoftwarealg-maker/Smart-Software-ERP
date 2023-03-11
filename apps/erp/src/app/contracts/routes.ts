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
import {
    ContractArticleDetailComponent,
    ContractArticleListComponent, SalesContractDetailComponent,
    SalesContractListComponent
} from '@ss/logistics/contracts';
import {
    ProjectMotiveDetailComponent,
    ProjectMotiveListComponent
} from '@ss/common/ui-lookup';
import {AppArchiveDetailComponent, AppArchiveListComponent} from '@ss/common/app-archive';
import {loginGuard} from '../erp-guards';

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
                canActivate: [loginGuard],
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
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
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
                canActivate: [loginGuard],
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
                component: SalesContractListComponent,
            },
            {
                path: ':id',
                component: SalesContractDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    {
                        path: 'articles',
                        children: [
                            {path: '', component: ContractArticleListComponent, pathMatch: 'full'},
                            {path: ':id', component: ContractArticleDetailComponent }
                        ]
                    },
                    {
                        path: 'archives',
                        children: [
                            {path: '', component: AppArchiveListComponent, pathMatch: 'full'},
                            {path: ':id', component: AppArchiveDetailComponent}
                        ]
                    },
                ]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
];
