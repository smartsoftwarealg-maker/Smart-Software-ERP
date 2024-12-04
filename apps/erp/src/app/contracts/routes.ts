import { Routes } from '@angular/router';
import {
    CONTRACTS_PROJECT_TYPE_URL,
    CONTRACT_PROJECT_URL,
    CONTRACTS_PROJECT_MOTIVE_URL,
    CONTRACTS_AWARD_PROCEDURE_URL, CONTRACTS_PURCHASE_CONTRACT_URL
} from '../common';
import {CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {
    AwardProcedureDetailComponent,
    AwardProcedureListComponent,
    ProjectTypeDetailComponent,
    ProjectTypeListComponent
} from '@ss/common/ui-lookup';
import {
    ContractArticleDetailComponent,
    ContractArticleListComponent,
    PurchaseContractDetailComponent,
    PurchaseContractListComponent,
    SalesContractDetailComponent,
    SalesContractListComponent
} from '@ss/logistics/contracts';
import {
    ProjectMotiveDetailComponent,
    ProjectMotiveListComponent
} from '@ss/common/ui-lookup';
import {
    AppArchiveDetailComponent,
    AppArchiveListComponent, CONTRACT_ARCHIVES,
    PART_ARCHIVES
} from '@ss/common/app-archive';
import {loginGuard} from '../erp-guards';

export const mainRoutes: Routes = [
    {
        path: CONTRACTS_AWARD_PROCEDURE_URL,
        children: [
            {
                path: LIST_URL,
                component: AwardProcedureListComponent,
                canActivate: [loginGuard],
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
                component: ProjectMotiveListComponent,
                canActivate: [loginGuard],
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
                component: ProjectTypeListComponent,
                canActivate: [loginGuard],
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
                canActivate: [loginGuard],
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
                            {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: PART_ARCHIVES }},
                            {path: ':id', component: AppArchiveDetailComponent, data: { appId: CONTRACT_ARCHIVES }}
                        ]
                    },
                ]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: CONTRACTS_PURCHASE_CONTRACT_URL,
        children: [
            {
                path: LIST_URL,
                component: PurchaseContractListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: PurchaseContractDetailComponent,
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
                            {path: '', component: AppArchiveListComponent, pathMatch: 'full', data: { appId: PART_ARCHIVES }},
                            {path: ':id', component: AppArchiveDetailComponent, data: { appId: CONTRACT_ARCHIVES }}
                        ]
                    },
                ]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
];
