import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
//import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Bank, BankService} from '@ss/administration/api-bank';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';


@Component({
    selector: 'ss-bank-detail',
    styleUrls: ['./bank-detail.component.scss'],
    templateUrl: './bank-detail.component.html'
})
export class BankDetailComponent extends BaseEntityDetailComponent<Bank> {
    constructor(
        public override entitySrv: BankService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_EDIT_BANK');
    }


    public setupForm(b: Bank) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            code: [b.code, Validators.maxLength(4)],
            description: [b.description, Validators.required],
        });
    }

}
