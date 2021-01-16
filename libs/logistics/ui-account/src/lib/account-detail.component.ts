import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {LookupsService} from "@ss/common/api-lookup";
import {Account, ACCOUNT_TYPES, AccountService} from "@ss/logistics/api-account";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";


@Component({
    selector: 'ss-account-detail',
    styleUrls: ['./account-detail.component.scss'],
    templateUrl: './account-detail.component.html'
})
export class AccountDetailComponent extends BaseEntityDetailComponent<Account> {


    accountTypes: any[];


    constructor(
        public accountService: AccountService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(accountService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LOGISTICS_EDIT_ACCOUNT');
    }


    preload(): Observable<any> {
        this.accountTypes = Object.keys(ACCOUNT_TYPES)
            .map(x => {
                return {'id': +x, 'description': ACCOUNT_TYPES[x]}
            })

        return of(null);
    }

    public setupForm(a: Account) {
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
            customerCode: [a.customerCode],
            budgetAccount: [a.budgetAccount],
            treasuryAccount: [a.treasuryAccount],
            journalId: [a.journalId]
        });
    }

}
