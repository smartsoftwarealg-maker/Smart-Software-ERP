import {Component} from '@angular/core';
import {Vat, VatService} from '@ss/common/api-lookup';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'ss-vat-detail',
    templateUrl: './vat-detail.component.html',
    styleUrls: ['./vat-detail.component.scss']
})
export class VatDetailComponent extends BaseEntityDetailComponent<Vat> {

    constructor(
        public vatSrv: VatService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder) {
        super(vatSrv, shellSrv, snackBarSrv, route, formBuilder, 'STOCK_EDIT_VAT');
    }

    public setupForm(e: Vat): FormGroup {
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
