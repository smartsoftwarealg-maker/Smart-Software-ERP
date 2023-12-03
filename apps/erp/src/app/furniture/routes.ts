import { Routes } from '@angular/router';

import {
    ABS_INDEX_URL, CanDeactivateService, LIST_URL,
} from '@ss/common/api-common';
import {
    COMMON_REPORTS_URL,
    FURNITURE_ASSIGNMENT_URL,
    FURNITURE_RECEIVER_URL,
    FURNITURE_RECEPTION_URL,
    FURNITURE_SALES_URL, FURNITURE_TYPES_URL,
    FURNITURE_URL
} from '../common';
import {loginGuard} from '../erp-guards';
import {
    FurnitureAssignmentDetailComponent,
    FurnitureAssignmentListComponent,
    FurnitureDetailComponent,
    FurnitureListComponent,
    FurnitureReceiverDetailComponent,
    FurnitureReceiverListComponent,
    FurnitureReceptionDetailComponent,
    FurnitureReceptionLineListComponent,
    FurnitureReceptionListComponent,
    FurnitureReceptionLineDetailComponent,
    FurnitureSalesListComponent,
    FurnitureSalesDetailComponent
} from '@ss/furniture/furniture';
import {
    ArticleTypeDetailComponent,
    ArticleTypeListComponent
} from '../../../../../libs/common/ui-lookup/src/lib/components/article-type.component';
import { ReportViewComponent } from '@ss/common/ui-report-param';

export const furnitureRoutes: Routes = [
    {
        path: FURNITURE_URL,
        children: [
            {
                path: LIST_URL,
                component: FurnitureListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: FurnitureDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: FURNITURE_RECEIVER_URL,
        children: [
            {
                path: LIST_URL,
                component: FurnitureReceiverListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: FurnitureReceiverDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: FURNITURE_TYPES_URL,
        children: [
            {
                path: LIST_URL,
                component: ArticleTypeListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: ArticleTypeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: FURNITURE_RECEPTION_URL,
        children: [
            {
                path: LIST_URL,
                component: FurnitureReceptionListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: FurnitureReceptionDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', component: FurnitureReceptionLineListComponent, pathMatch: 'full'},
                    { path: 'detail',
                        children: [
                            { path: ':id', component: FurnitureReceptionLineDetailComponent }
                        ]
                    }
                ]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: FURNITURE_SALES_URL,
        children: [
            {
                path: LIST_URL,
                component: FurnitureSalesListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: FurnitureSalesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', component: FurnitureReceptionLineListComponent, pathMatch: 'full'},
                    { path: 'detail',
                        children: [
                            { path: ':id', component: FurnitureReceptionLineDetailComponent }
                        ]
                    }
                ]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: FURNITURE_ASSIGNMENT_URL,
        children: [
            {
                path: LIST_URL,
                component: FurnitureAssignmentListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: FurnitureAssignmentDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', component: FurnitureReceptionLineListComponent, pathMatch: 'full'},
                    { path: 'detail',
                        children: [
                            { path: ':id', component: FurnitureReceptionLineDetailComponent }
                        ]
                    }
                ]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: COMMON_REPORTS_URL,
        data: {reportBase: 'furniture'},
        component: ReportViewComponent,
        canActivate: [loginGuard]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];
