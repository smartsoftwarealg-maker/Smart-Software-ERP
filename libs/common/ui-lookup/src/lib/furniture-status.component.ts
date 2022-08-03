import { Component } from '@angular/core';
import {FurnitureStatusService, Lookup} from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';


@Component({
    selector: 'ss-fs-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class FurnitureStatusListComponent extends BaseEntityListComponent<Lookup> {

    displayedColumns = ['description'];

    constructor(
        public statusSrv: FurnitureStatusService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(statusSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'COMMON_STATUS');
        this.pagination.pageSize = 10;
    }
}

@Component({
    selector: 'ss-fs-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class FurnitureStatusDetailComponent extends BaseEntityDetailComponent<Lookup> {

    constructor(
        public statusSrv: FurnitureStatusService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(statusSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_STATUS');
    }

    public setupForm(e: Lookup): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}

