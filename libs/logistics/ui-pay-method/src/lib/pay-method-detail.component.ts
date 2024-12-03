import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService, PayMethod, PayMode, PayModeService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';


@Component({
    selector: 'ss-account-detail',
    styleUrls: ['./pay-method-detail.component.scss'],
    templateUrl: './pay-method-detail.component.html',
    standalone: true,
    imports: [MatCard, MatCardContent, NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError, UiAutoCompleteComponent]
})
export class PayMethodDetailComponent extends BaseEntityDetailComponent<PayMethod> {
    public payModeAutoCompleteModel: DefaultAutoCompleteModel<PayMode> = null;

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
        this.payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMode>(this.payModeSrv);
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
