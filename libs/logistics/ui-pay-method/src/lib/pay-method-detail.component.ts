import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService, PayMethod, PayMode, PayModeService} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {PayMethodService} from "@ss/logistics/api-logistics-common";
import {DefaultAutoCompleteModel} from "@ss/common/ui-auto-complete";


@Component({
    selector: 'ss-account-detail',
    styleUrls: ['./pay-method-detail.component.scss'],
    templateUrl: './pay-method-detail.component.html'
})
export class PayMethodDetailComponent extends BaseEntityDetailComponent<PayMethod> {
    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMode>(this.payModeSrv)
    private curPayMethod: any = null;


    constructor(
        public payMethodSrv: PayMethodService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private payModeSrv: PayModeService) {
        super(payMethodSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LOGISTICS_EDIT_ACCOUNT');
    }



    public override setupForm(a: PayMethod) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [a.id],
            description: [a.description],
            payMode: [a.payMode]
        });
    }
}
