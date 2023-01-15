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
import { LIST_URL, CanActivateService, CanDeactivateService, ABS_INDEX_URL } from '@ss/common/api-common';
import { AgentDetailComponent, AgentListComponent } from '@ss/logistics/ui-agent';
import {
    CheckListComponent,
    CheckDetailComponent,
    ProcessedCheckListComponent,
    ProcessedCheckDetailComponent, CheckMatchingListComponent
} from '@ss/treasury/ui-checks';
import { CheckBookListComponent, CheckBookDetailComponent } from '@ss/treasury/ui-check-books';
import { JournalListComponent, JournalDetailComponent } from '@ss/treasury/ui-journal';
import {DashboardComponent} from '@ss/dashboard';
import {ReportViewComponent} from '@ss/common/ui-report-param';
import {
    BankExpenseDetailComponent,
    BankExpenseListComponent,
    TransactionDetailComponent,
    TransactionListComponent
} from '@ss/treasury/ui-transactions';
import {TreasuryGroupDetailComponent, TreasuryGroupListComponent} from '@ss/common/ui-lookup';

export const mainRoutes: Routes = [
    {
        path: TREASURY_AGENT_URL,
        children: [
            {
                path: LIST_URL,
                component: AgentListComponent,
                canActivate: [CanActivateService],
                data: { form: 'Agent' }
            },
            {
                path: ':id',
                component: AgentDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: CheckDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: ProcessedCheckDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: TreasuryGroupDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: CheckBookDetailComponent,
                canActivate: [CanActivateService],
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: JournalDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: TransactionDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
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
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: BankExpenseDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            { path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full' }
        ]
    },
    {
        path: DASHBOARD_URL,
        component: DashboardComponent,
        canActivate: [CanActivateService],
    },
    {
        path: TREASURY_CHECK_MATCHING_URL,
        component: CheckMatchingListComponent,
        canActivate: [CanActivateService],
    },
    {
        path: COMMON_REPORTS_URL,
        data: {reportBase: 'treasury'},
        component: ReportViewComponent,
        canActivate: [CanActivateService]
    },
];
