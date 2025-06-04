import { Routes } from '@angular/router';
import { ABS_INDEX_URL, CanDeactivateService, LIST_URL } from '@ss/common/api-common';
import { loginGuard } from '../erp-guards';
import {
    MedicalAidTypesDetailComponent,
    MedicalAidTypesListComponent,
    MutualRejectionsDetailComponent,
    MutualRejectionsListComponent,
    MutualTypeDetailComponent,
    MutualTypeListComponent,
    SocialActivitiesDetailComponent,
    SocialActivitiesListComponent
} from '@social/social-lookups';
import {
    MEDICAL_AIDS_URL, SOCIAL_MUTUAL_AIDS_URL, MUTUAL_REQUEST_URL,
    SOCIAL_ACTIVITIES_URL, SOCIAL_DASHBOARD_URL, SOCIAL_EDO_HEADERS,
    SOCIAL_EDO_URL, SOCIAL_LOANS_URL,
    SOCIAL_MEDICAL_AIDS_URL, SOCIAL_MUTUAL_TYPE_URL, SOCIAL_REIMBURSEMENT_URL,
    SOCIAL_WORKS_URL, MUTUAL_REJECTIONS_URL
} from './constants';
import { SocialWorksDetailComponent } from '@social/social-works-detail';
import { SocialAidsListComponent } from '@social/social-works-list';
import { MedicalAidsDetailComponent } from '@social/medical-aids-detail';
import { MedicalAidsListComponent } from '@social/medical-aids-list';
import { SocialEdoComponent } from '@social/edo';
import { SocialDashboardComponent } from '@social/social-dashboard';
import {
    SocialReimbursementsComponent,
    SocialReimbursementsDetailComponent,
    SocialReimbursementsListComponent
} from 'social/reimbursements';
import {
    SocialEdoHeaderListComponent
} from '@social/edo';
import {
    SocialEdoHeaderDetailComponent
} from '@social/edo';
import { LoansDetailComponent } from '@ss/remuneration/loans';
import { ConsolidatedLoanListComponent } from '@social/loans';
import {
    MutualRequestsDetailComponent,
    MutualRequestsLineListComponent,
    MutualRequestsListComponent
} from '@ss/social/mutual-requests';
import {
    MutualRequestsLineDetailComponent
} from '@ss/social/mutual-requests';
import { MutualAidsDetailComponent, MutualAidsListComponent } from '@ss/social/mutual-aids';
import { COMMON_REPORTS_URL } from '../common';
import { ReportViewComponent } from '@ss/common/ui-report-param';

export const socialRoutes: Routes = [
    {
        path: SOCIAL_MUTUAL_TYPE_URL,
        children: [
            {
                path: LIST_URL,
                component: MutualTypeListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: MutualTypeDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },
    {
        path: SOCIAL_ACTIVITIES_URL,
        children: [
            {
                path: LIST_URL,
                component: SocialActivitiesListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: SocialActivitiesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },
    {
        path: SOCIAL_MEDICAL_AIDS_URL,
        children: [
            {
                path: LIST_URL,
                component: MedicalAidTypesListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: MedicalAidTypesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },
    {
        path: MUTUAL_REJECTIONS_URL,
        children: [
            {
                path: LIST_URL,
                component: MutualRejectionsListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: MutualRejectionsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },

    {
        path: SOCIAL_WORKS_URL,
        children: [
            {
                path: LIST_URL,
                component: SocialAidsListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: SocialWorksDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },

    {
        path: SOCIAL_MUTUAL_AIDS_URL,
        children: [
            {
                path: LIST_URL,
                component: MutualAidsListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: MutualAidsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },
    {
        path: SOCIAL_LOANS_URL,
        children: [
            {
                path: LIST_URL,
                component: ConsolidatedLoanListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: LoansDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: SOCIAL_EDO_HEADERS,
        children: [
            {
                path: LIST_URL,
                component: SocialEdoHeaderListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: SocialEdoHeaderDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },
    {
        path: SOCIAL_EDO_URL,
        component: SocialEdoComponent,
        canDeactivate: [CanDeactivateService]
    },
    {
        path: SOCIAL_DASHBOARD_URL,
        component: SocialDashboardComponent,
        canDeactivate: [CanDeactivateService]
    },
    {
        path: COMMON_REPORTS_URL,
        data: { reportBase: 'social' },
        component: ReportViewComponent,
        canActivate: [loginGuard]
    },

    {
        path: SOCIAL_REIMBURSEMENT_URL,
        component: SocialReimbursementsComponent,
        canDeactivate: [CanDeactivateService],
        children: [
            { path: '', component: SocialReimbursementsListComponent},
            { path: ':id', component: SocialReimbursementsDetailComponent}
        ]
    },
    {
        path: MEDICAL_AIDS_URL,
        children: [
            {
                path: LIST_URL,
                component: MedicalAidsListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: MedicalAidsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
        ]
    },
    {
        path: MUTUAL_REQUEST_URL,
        children: [
            { path: LIST_URL, component: MutualRequestsListComponent, canActivate: [loginGuard]},
            { path: ':id',
                component: MutualRequestsDetailComponent,
                children: [
                    { path: '', redirectTo: 'detail', pathMatch: 'full'},
                    { path: 'detail',
                        children: [
                            { path: '', component: MutualRequestsLineListComponent, pathMatch: 'full'},
                            { path: ':id', component: MutualRequestsLineDetailComponent }
                        ]
                    }
                ],
                canActivate: [loginGuard],
            }
        ]
    },


    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];
