import { Component } from '@angular/core';
import { StoreName, StoreNameService } from '@ss/common/api-lookup';
import { BaseEntityDetailComponent } from '@ss/common/api-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";


@Component({
    selector: 'ss-store-name-detail',
    templateUrl: '../base-templates/detail-template.html',
    styleUrls: ['../base-templates/detail-template.scss']
})
export class StoreNameDetailComponent extends BaseEntityDetailComponent<StoreName> {

    constructor(
        public storeNameSrv: StoreNameService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
            super(storeNameSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_EDIT_STORE_NAME');
    }

    public setupForm(e: StoreName): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
