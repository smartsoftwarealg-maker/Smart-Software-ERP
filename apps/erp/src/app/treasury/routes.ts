import { Routes } from '@angular/router';
import {
    TREASURY_AGENT_URL,
    TREASURY_CHECKS_URL,
    TREASURY_CHECK_BOOKS_URL,
    TREASURY_JOURNALS_URL,
    DASHBOARD_URL,
    COMMON_REPORTS_URL,
    TREASURY_TRANSACTION_URL,
    TREASURY_GROUPS_URL,
    TREASURY_BANK_EXPENSE_URL,
    TREASURY_PROCESSED_CHECKS_URL, TREASURY_CHECK_MATCHING_URL
} from '../common';
import { LIST_URL, CanDeactivateService, ABS_INDEX_URL } from '@ss/common/api-common';
import {
    AgentDetailComponent,
    AgentListComponent,
    AppArchiveDetailComponent,
    AppArchiveListComponent
} from '@ss/logistics/ui-agent';
import {
    CheckListComponent,
    CheckDetailComponent,
    ProcessedCheckListComponent,
    ProcessedCheckDetailComponent, CheckMatchingListComponent
} from '@ss/treasury/ui-checks';
import { CheckBookListComponent, CheckBookDetailComponent } from '@ss/treasury/ui-check-books';
import {
    JournalListComponent,
    JournalDetailComponent,
    JournalUserListComponent,
    JournalUserDetailComponent
} from '@ss/treasury/ui-journal';
import {DashboardComponent} from '@ss/dashboard';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {
    BankExpenseDetailComponent,
    BankExpenseListComponent,
    TransactionDetailComponent,
    TransactionLineDetailComponent,
    TransactionLineListComponent,
    TransactionListComponent
} from '@ss/treasury/ui-transactions';
import {TreasuryGroupDetailComponent, TreasuryGroupListComponent} from '@ss/common/ui-lookup';
import {loginGuard} from '../erp-guards';

export const mainRoutes: Routes = [
    {
        path: TREASURY_AGENT_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentListComponent,
                canActivate: [loginGuard],
                data: { form: 'Agent' }
            },
            {
                path: ':id',
                component: AgentDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: TREASURY_CHECKS_URL,
        children: [
            {
                path: LIST_URL,
                component: CheckListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CheckDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: TREASURY_PROCESSED_CHECKS_URL,
        children: [
            {
                path: LIST_URL,
                component: ProcessedCheckListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: ProcessedCheckDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: TREASURY_GROUPS_URL,
        children: [
            {
                path: LIST_URL,
                component: TreasuryGroupListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: TreasuryGroupDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: TREASURY_CHECK_BOOKS_URL,
        children: [
            {
                path: LIST_URL,
                component: CheckBookListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: CheckBookDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: TREASURY_JOURNALS_URL,
        children: [
            {
                path: LIST_URL,
                component: JournalListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: JournalDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '',     redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list',
                        children: [
                            { path: '', component: JournalUserListComponent, pathMatch: 'full' },
                            { path: ':id',  component: JournalUserDetailComponent }
                        ]
                    }
                ]
            },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: TREASURY_TRANSACTION_URL,
        children: [
            {
                path: LIST_URL,
                component: TransactionListComponent,
                canActivate: [loginGuard],
                children: [
                    { path: '', redirectTo: 'archive', pathMatch: 'full'},
                    {
                        path: 'archive',
                        children: [
                            {path: '', component: AppArchiveListComponent, pathMatch: 'full'},
                            {path: ':id', component: AppArchiveDetailComponent},
                            {path: '**', component: AppArchiveListComponent}
                        ]
                    }
                ]
            },
            {
                path: ':id',
                component: TransactionDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService],
                children: [
                    { path: '', redirectTo: 'lines', pathMatch: 'full' },
                    { path: 'lines',
                        children: [
                            { path: '', component: TransactionLineListComponent, pathMatch: 'full'},
                            { path: ':id', component: TransactionLineDetailComponent }
                        ] },
                ]
            },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: TREASURY_BANK_EXPENSE_URL,
        children: [
            {
                path: LIST_URL,
                component: BankExpenseListComponent,
                canActivate: [loginGuard]
            },
            {
                path: ':id',
                component: BankExpenseDetailComponent,
                canActivate: [loginGuard],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: DASHBOARD_URL,
        component: DashboardComponent,
        canActivate: [loginGuard],
    },
    {
        path: TREASURY_CHECK_MATCHING_URL,
        component: CheckMatchingListComponent,
        canActivate: [loginGuard],
    },
    {
        path: COMMON_REPORTS_URL,
        data: {reportBase: 'treasury'},
        component: ReportViewComponent,
        canActivate: [loginGuard]
    },
];
