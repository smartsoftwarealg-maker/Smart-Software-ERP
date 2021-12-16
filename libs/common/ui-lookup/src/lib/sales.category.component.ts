import { Component } from '@angular/core';
import {Activity, ActivityService, Category, SalesCategoryService} from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';


@Component({
    selector: 'ss-activity-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class SalesCategoryListComponent extends BaseEntityListComponent<Category> {

    displayedColumns = ['description'];

    constructor(
        public listSrv: SalesCategoryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router) {
        super(listSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'COMMON_ACTIVITIES');
    }
}


@Component({
    selector: 'ss-activity-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class SalesCategoryDetailComponent extends BaseEntityDetailComponent<Activity> {

    constructor(
        public categorySrv: SalesCategoryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(categorySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_ACTIVITY');
    }

    public setupForm(e: Activity): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
