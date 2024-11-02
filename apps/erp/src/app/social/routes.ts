import { Routes } from '@angular/router';
import { ABS_INDEX_URL, CanDeactivateService, LIST_URL } from '@ss/common/api-common';
import { loginGuard } from '../erp-guards';
import {
    MedicalAidTypesDetailComponent,
    MedicalAidTypesListComponent,
    SocialActivitiesDetailComponent,
    SocialActivitiesListComponent
} from '@social/social-lookups';
import {
    MEDICAL_AIDS_URL,
    SOCIAL_ACTIVITIES_URL, SOCIAL_DASHBOARD_URL, SOCIAL_EDO_HEADERS,
    SOCIAL_EDO_URL, SOCIAL_LOANS_URL,
    SOCIAL_MEDICAL_AIDS_URL, SOCIAL_REIMBURSEMENT_URL,
    SOCIAL_WORKS_URL
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

export const socialRoutes: Routes = [
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

    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
];
