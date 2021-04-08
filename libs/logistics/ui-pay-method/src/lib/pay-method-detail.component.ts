import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {LookupsService, PayMethod, PayMode, PayModeService} from "@ss/common/api-lookup";
import {Account, ACCOUNT_TYPES, AccountService} from "@ss/logistics/api-account";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {PayMethodService} from "@ss/logistics/api-logistics-common";
import {DefaultAutoCompleteModel} from "@ss/common/ui-auto-complete";
import {Agent} from "@ss/logistics/api-agent";


@Component({
    selector: 'ss-account-detail',
    styleUrls: ['./pay-method-detail.component.scss'],
    templateUrl: './pay-method-detail.component.html'
})
export class PayMethodDetailComponent extends BaseEntityDetailComponent<PayMethod> {
    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMode>(this.payModeSrv)
    private curPayMethod = null;


    constructor(
        public payMethodSrv: PayMethodService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private payModeSrv: PayModeService) {
        super(payMethodSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LOGISTICS_EDIT_ACCOUNT');
    }



    public setupForm(a: PayMethod) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [a.id],
            description: [a.description],
            payMode: [a.payMode]
        });
    }
}
