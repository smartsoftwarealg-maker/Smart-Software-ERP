import { Routes } from '@angular/router';
import {
    ABS_INDEX_URL,
    CanDeactivateService,
    LIST_URL,
} from '@ss/common/api-common';
import { loginGuard } from '../erp-guards';
import {
    CRM_CONTACT_METHODS_URL,
    CRM_DEPARTMENTS_URL,
    CRM_JOBS_URL,
    CRM_PAYMENT_TERMS_URL,
    CRM_SALUTATIONS_URL,
    CRM_STATUS_URL,
} from '../common';
import {
    SalutationsDetailComponent,
    SalutationsListComponent,
} from '@ss/crm/salutations';
import { JobsDetailComponent, JobsListComponent } from '@ss/crm/jobs';
import {
    DepartmentsDetailComponent,
    DepartmentsListComponent,
} from '@ss/crm/departments';
import {
    ContactMethodsDetailComponent,
    ContactMethodsListComponent,
} from '@ss/crm/contact-methods';
import { StatusDetailComponent, StatusListComponent } from '@ss/crm/status';
import {
    PaymentTermsDetailComponent,
    PaymentTermsListComponent,
} from '@ss/crm/payment-terms';

export const crmRoutes: Routes = [
    {
        path: CRM_SALUTATIONS_URL,
        children: [
            {
                path: LIST_URL,
                component: SalutationsListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: SalutationsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' },
        ],
    },
    {
        path: CRM_JOBS_URL,
        children: [
            {
                path: LIST_URL,
                component: JobsListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: JobsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' },
        ],
    },
    {
        path: CRM_DEPARTMENTS_URL,
        children: [
            {
                path: LIST_URL,
                component: DepartmentsListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: DepartmentsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' },
        ],
    },
    {
        path: CRM_CONTACT_METHODS_URL,
        children: [
            {
                path: LIST_URL,
                component: ContactMethodsListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: ContactMethodsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' },
        ],
    },
    {
        path: CRM_STATUS_URL,
        children: [
            {
                path: LIST_URL,
                component: StatusListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: StatusDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' },
        ],
    },
    {
        path: CRM_PAYMENT_TERMS_URL,
        children: [
            {
                path: LIST_URL,
                component: PaymentTermsListComponent,
                canActivate: [loginGuard],
            },
            {
                path: ':id',
                component: PaymentTermsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' },
        ],
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL },
];
