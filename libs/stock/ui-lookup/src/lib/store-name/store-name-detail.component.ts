import { Component } from '@angular/core';
import { StoreName, StoreNameService } from '@ss/stock/api-lookup';
import { BaseEntityDetailComponent } from '@ss/common/api-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
        public formBuilder: FormBuilder) {
            super(storeNameSrv, shellSrv, snackBarSrv, route, formBuilder, 'STOCK_EDIT_STORE_NAME');
    }

    public setupForm(e: StoreName): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
