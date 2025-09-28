import { Routes } from '@angular/router';
import {
    ABS_INDEX_URL,
    CanDeactivateService,
    LIST_URL
} from '@ss/common/api-common';
import { loginGuard } from '../erp-guards';
import {
    CRM_CONTACT_METHODS_URL,
    CRM_DEPARTMENTS_URL,
    CRM_JOBS_URL,
    CRM_PAYMENT_TERMS_URL,
    CRM_SALUTATIONS_URL,
    CRM_STATUS_URL,
    docInfoRoutes,
    CRM_CUSTOMER_URL,
    CRM_LEADS_URL,
    CRM_CAMPAIGN_URL,
    CRM_MAILING_LIST_URL,
    CRM_TEAMS_URL,
    CRM_OPPORTUNITY_URL, CRM_EMAIL_TEMPLATE_URL, CRM_CALENDAR_URL
} from '../common';
import {
    SalutationsDetailComponent,
    SalutationsListComponent
} from '@ss/crm/salutations';
import { JobsDetailComponent, JobsListComponent } from '@ss/crm/jobs';
import {
    DepartmentsDetailComponent,
    DepartmentsListComponent
} from '@ss/crm/departments';
import {
    ContactMethodsDetailComponent,
    ContactMethodsListComponent
} from '@ss/crm/contact-methods';
import { StatusDetailComponent, StatusListComponent } from '@ss/crm/status';
import {
    PaymentTermsDetailComponent,
    PaymentTermsListComponent
} from '@ss/crm/payment-terms';
import {
    AppArchiveDetailComponent,
    AppArchiveListComponent
} from '@ss/logistics/ui-agent';
import { AGENT_ARCHIVES } from '@ss/common/app-archive';
import {
    CrmContactsDetailComponent,
    CrmCustomerDetailComponent,
    CrmCustomerListComponent,
    CrmContactsListComponent
} from '@ss/crm/crm-customer';
import { CrmLeadsComponent, CrmLeadsDetailComponent } from '@ss/crm/leads';
import {
    CampaignDetailComponent,
    CampaignListComponent
} from '@ss/crm/campaign';
import {
    MailingListComponent,
    MailingListDetailComponent,
    MailingLinesListComponent,
    MailingLinesDetailComponent
} from '@ss/crm/mailing-list';
import {
    CrmTeamsDetailComponent,
    CrmTeamsLinesDetailComponent,
    CrmTeamsLinesListComponent,
    CrmTeamsListComponent
} from '@ss/crm/crm-teams';
import {
    CrmOpportunityDetailComponent,
    CrmOpportunityListComponent,
    CrmOpportunityTrackingListComponent
} from '@ss/crm/opportunity';
import { CrmOpportunityActivitiesListComponent } from '@ss/crm/opportunity';
import { CrmOpportunityActivitiesDetailComponent } from '@ss/crm/opportunity';
import {
    CrmEmailTemplatesDetailComponent,
    CrmEmailTemplatesListComponent
} from '@ss/crm/email-templates';
import { CalendarList } from '@ss/crm/calendar-list';
import {LeadFormComponent} from '@ss/crm/leads';

export const crmRoutes: Routes = [
    {
        path: CRM_SALUTATIONS_URL,
        children: [
            {
                path: LIST_URL,
                component: SalutationsListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: SalutationsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: CRM_JOBS_URL,
        children: [
            {
                path: LIST_URL,
                component: JobsListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: JobsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: CRM_DEPARTMENTS_URL,
        children: [
            {
                path: LIST_URL,
                component: DepartmentsListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: DepartmentsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: CRM_CONTACT_METHODS_URL,
        children: [
            {
                path: LIST_URL,
                component: ContactMethodsListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: ContactMethodsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: CRM_STATUS_URL,
        children: [
            {
                path: LIST_URL,
                component: StatusListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: StatusDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: CRM_LEADS_URL,
        children: [
            {
                path: LIST_URL,
                component: CrmLeadsComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CrmLeadsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: CRM_PAYMENT_TERMS_URL,
        children: [
            {
                path: LIST_URL,
                component: PaymentTermsListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: PaymentTermsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: CRM_MAILING_LIST_URL,
        children: [
            {
                path: LIST_URL,
                component: MailingListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: MailingListDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', redirectTo: 'line-list', pathMatch: 'full' },
                    {
                        path: 'line-list',
                        children: [
                            { path: '', component: MailingLinesListComponent },
                            {
                                path: ':id',
                                component: MailingLinesDetailComponent
                            }
                        ]
                    }
                ]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },

    {
        path: CRM_CUSTOMER_URL,
        children: [
            {
                path: LIST_URL,
                component: CrmCustomerListComponent,
                canActivate: [loginGuard],
                data: { sales: true, customer: true },
                children: docInfoRoutes
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: CrmCustomerDetailComponent,
                        canActivate: [loginGuard],
                        canDeactivate: [CanDeactivateService],
                        data: { customer: true },
                        children: [
                            {
                                path: 'archive',
                                children: [
                                    {
                                        path: '',
                                        component: AppArchiveListComponent,
                                        pathMatch: 'full',
                                        data: { appId: AGENT_ARCHIVES }
                                    },
                                    {
                                        path: ':id',
                                        component: AppArchiveDetailComponent,
                                        data: { appId: AGENT_ARCHIVES }
                                    }
                                ]
                            },
                            {
                                path: 'contact',
                                children: [
                                    {
                                        path: '',
                                        component: CrmContactsListComponent,
                                        pathMatch: 'full'
                                    },
                                    {
                                        path: ':id',
                                        component: CrmContactsDetailComponent
                                    }
                                ]
                            },
                            {
                                path: '',
                                redirectTo: 'archive',
                                pathMatch: 'full'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: CRM_CAMPAIGN_URL,
        children: [
            {
                path: LIST_URL,
                component: CampaignListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CampaignDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: CRM_TEAMS_URL,
        children: [
            {
                path: LIST_URL,
                component: CrmTeamsListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CrmTeamsDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', redirectTo: 'line-list', pathMatch: 'full' },
                    {
                        path: 'line-list',
                        children: [
                            { path: '', component: CrmTeamsLinesListComponent },
                            {
                                path: ':id',
                                component: CrmTeamsLinesDetailComponent
                            }
                        ]
                    }
                ]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: CRM_OPPORTUNITY_URL,
        children: [
            {
                path: LIST_URL,
                component: CrmOpportunityListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CrmOpportunityDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', redirectTo: 'active', pathMatch: 'full' },
                    {
                        path: 'activities',
                        children: [
                            {
                                path: '',
                                component:
                                CrmOpportunityActivitiesListComponent
                            },
                            {
                                path: ':id',
                                component:
                                CrmOpportunityActivitiesDetailComponent
                            }
                        ]
                    },
                    {
                        path: 'tracking',
                        children: [
                            {
                                path: '',
                                component: CrmOpportunityTrackingListComponent,
                                pathMatch: 'full'
                            }
                        ]
                    }
                ]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    {
        path: CRM_EMAIL_TEMPLATE_URL,
        children: [
            {
                path: LIST_URL,
                component: CrmEmailTemplatesListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CrmEmailTemplatesDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: 'lead-test', component: LeadFormComponent},
    {
        path: CRM_CALENDAR_URL,
        children: [
            {
                path: LIST_URL,
                component: CalendarList,
                canActivate: [loginGuard]
            },
            { path: '**', redirectTo: LIST_URL, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full' },
    { path: '**', redirectTo: ABS_INDEX_URL }
];
