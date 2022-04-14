import {Routes} from '@angular/router';
import {AccountDetailComponent, AccountListComponent} from '@ss/logistics/ui-account';
import {
    ACC_FILE_SELECTOR_URL, ACC_FILES_URL,
    ACC_JOURNALS_URL, ACC_PERIOD_SELECTOR_URL,
    ACC_POLICIES_URL,
    ACC_TRANSACTIONS_URL,
    COMMON_ACCOUNT_URL
} from '../common';
import {ABS_INDEX_URL, CanActivateService, CanDeactivateService, LIST_URL} from '@ss/common/api-common';
import {AccPoliciesComponent} from '@ss/accounting/acc-policies';
import {JournalDetailComponent, JournalListComponent} from '@ss/accounting/accounting-journal';
import {
    FileSelectorComponent, PeriodSelectorComponent,
    TransactionDetailComponent,
    TransactionLinesDetailComponent,
    TransactionLinesListComponent,
    TransactionListComponent,
    AccFileListComponent,
    AccFileDetailComponent
} from '@ss/accounting/transactions';

export const accRoutes: Routes = [
    {
        path: ACC_FILE_SELECTOR_URL,
        component: FileSelectorComponent,
        canActivate: [CanActivateService]
    },
    {
        path: ACC_PERIOD_SELECTOR_URL,
        component: PeriodSelectorComponent,
        canActivate: [CanActivateService]
    },
    {
        path: ACC_POLICIES_URL,
        component: AccPoliciesComponent,
        canActivate: [CanActivateService]
    },
    {
        path: COMMON_ACCOUNT_URL,
        children: [
            {
                path: LIST_URL,
                component: AccountListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: AccountDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ACC_FILES_URL,
        children: [
            {
                path: LIST_URL,
                component: AccFileListComponent,
                canActivate: [CanActivateService]
            },
            {
                path: ':id',
                component: AccFileDetailComponent,
                canActivate: [CanActivateService],
                canDeactivate: [CanDeactivateService]
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ACC_JOURNALS_URL,
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
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {
        path: ACC_TRANSACTIONS_URL,
        children: [
            {
                path: LIST_URL,
                component: TransactionListComponent,
                children: [
                    {
                        path: ':id',
                        children: [
                            {
                                path: '',
                                component: TransactionDetailComponent,
                            },
                            {
                                path: 'detail',
                                children: [
                                    {
                                        path: ':id',
                                        component: TransactionLinesDetailComponent,
                                    },
                                    {
                                        path: '',
                                        component: TransactionLinesListComponent,
                                    },
                                ]
                            },
                        ]
                    },
                ],
            },
            {path: '', redirectTo: LIST_URL, pathMatch: 'full'},
            {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: ABS_INDEX_URL, pathMatch: 'full'},
    {path: '**', redirectTo: ABS_INDEX_URL, pathMatch: 'full'}
]
