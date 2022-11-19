import { Component } from '@angular/core';
import { Store, LotsService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {LoginService, PaginatorPersistenceService} from '@ss/common/api-common';
import {OptionService} from '@ss/logistics/ui-options';
import {Observable, tap} from 'rxjs';


@Component({
    selector: 'ss-store-name-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class StoreNameListComponent extends BaseEntityListComponent<Store> {

    displayedColumns = ['description', 'descriptionAr'];

    constructor(
        public storeNameSrv: LotsService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(storeNameSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_STORE_NAMES');
    }

}



@Component({
    selector: 'ss-store-name-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class StoreNameDetailComponent extends BaseEntityDetailComponent<Store> {
    private mainStore = 0;

    constructor(
        private loginSrv: LoginService,
        public storeNameSrv: LotsService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: UntypedFormBuilder,
        private optionSrv: OptionService) {
        super(storeNameSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_STORE_NAME');
    }

    preload(): Observable<any> {
        return this.optionSrv
            .get(this.loginSrv.appCtx.center)
            .pipe(tap(res => this.mainStore = res.mainStore));
    }

    public setupForm(e: Store): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr],
            centerId: [e.centerId || this.loginSrv.appCtx.center],
            expires: [e.expires],
            storeId: [1]
        });
    }

    readForm(): Store {
        return this.form.getRawValue();
    }
}

