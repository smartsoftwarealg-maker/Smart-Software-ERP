import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService} from '@ss/common/api-lookup';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {Account, ACCOUNT_TYPES, AccountService} from '@ss/accounting/api-accounts';

import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';



type TAccount = { id: number; description: string; }

@Component({
    selector: 'ss-account-detail',
    styleUrls: ['./account-detail.component.scss'],
    templateUrl: './account-detail.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
    MaterialModule,
    TranslateDirective,
    ReactiveFormsModule
],
})
export class AccountDetailComponent extends BaseEntityDetailComponent<Account> {


    accountTypes: TAccount[] = [
        {id: 1, description: 'DEBITOR'},
        {id: 2, description: 'CREDITOR'},
        {id: 3, description: 'BALANCED'},
        {id: 4, description: 'ANY'}
    ];


    constructor(
        public accountService: AccountService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(accountService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LOGISTICS_EDIT_ACCOUNT');
    }


    // override preload(): Observable<unknown> {
    //     this.accountTypes = Object.keys(ACCOUNT_TYPES)
    //         .map(x => ({id: +x, description: ACCOUNT_TYPES[x]||'ANY'} as TAccount));
    //
    //     return of(null);
    // }

    public override setupForm(a: Account) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [a.id],
            accountNo: [a.accountNo],
            description: [a.description],
            creationDate: [a.creationDate],
            accType: [a.accType],
            analyzed: [!!a.analyzed],
            descriptionAr: [a.descriptionAr],
            balanceConstraint: [a.balanceConstraint],
            summaryLevel: [a.summaryLevel],
            customerCode: [a.customerCode||false],
            budgetAccount: [a.budgetAccount],
            treasuryAccount: [a.treasuryAccount],
            journalId: [a.journalId],
            ccRequired: [a.ccRequired]
        });
    }

}
