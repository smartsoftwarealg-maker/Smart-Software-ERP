import { Component } from '@angular/core';
import { Store, LotsService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {LoginService} from '@ss/common/api-common';


@Component({
    selector: 'ss-store-name-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class StoreNameListComponent extends BaseEntityListComponent<Store> {

    displayedColumns = ['description'];

    constructor(
        public storeNameSrv: LotsService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router) {
        super(storeNameSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'COMMON_STORE_NAMES');
    }

}



@Component({
    selector: 'ss-store-name-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class StoreNameDetailComponent extends BaseEntityDetailComponent<Store> {

    constructor(
        private loginSrv: LoginService,
        public storeNameSrv: LotsService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(storeNameSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_STORE_NAME');
    }

    public setupForm(e: Store): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            centerId: [this.loginSrv.appCtx.center]
        });
    }

    readForm(): Store {
        const store = super.readForm();
        store.centerId = this.loginSrv.appCtx.center;
        return store;
    }
}

