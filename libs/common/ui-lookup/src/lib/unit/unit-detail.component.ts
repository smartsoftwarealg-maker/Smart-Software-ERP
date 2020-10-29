import { Component } from '@angular/core';
import { Unit, UnitService } from '@ss/common/api-lookup';
import { BaseEntityDetailComponent } from '@ss/common/api-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";

@Component({
    selector: 'ss-unit-detail',
    templateUrl: '../base-templates/detail-template.html',
    styleUrls: ['../base-templates/detail-template.scss']
})
export class UnitDetailComponent extends BaseEntityDetailComponent<Unit> {

    constructor(
        public unitSrv: UnitService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
            super(unitSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_EDIT_UNIT');
    }

    public setupForm(e: Unit): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
