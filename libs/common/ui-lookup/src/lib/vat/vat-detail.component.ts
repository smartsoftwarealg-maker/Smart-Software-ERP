import {Component} from '@angular/core';
import {Vat, VatService} from '@ss/common/api-lookup';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";


@Component({
    selector: 'ss-vat-detail',
    templateUrl: './vat-detail.component.html',
    styleUrls: ['./vat-detail.component.scss']
})
export class VatDetailComponent extends BaseEntityDetailComponent<Vat> {

    constructor(
        public vatSrv: VatService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(vatSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_VAT');
    }

    public override setupForm(e: Vat): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            value: [e.value, Validators.compose(
                [
                    Validators.required,
                    Validators.min(0),
                    Validators.max(100)
                ]
            )]
        });
    }

}
