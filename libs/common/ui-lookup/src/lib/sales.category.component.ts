import { Component } from '@angular/core';
import {Activity, Category, SalesCategoryService} from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {PaginatorPersistenceService} from '@ss/common/api-common';


@Component({
    selector: 'ss-sales-category-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class SalesCategoryListComponent extends BaseEntityListComponent<Category> {

    displayedColumns = ['description'];

    constructor(
        public listSrv: SalesCategoryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(listSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'COMMON_CATEGORIES');
    }
}


@Component({
    selector: 'ss-sales-category-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class SalesCategoryDetailComponent extends BaseEntityDetailComponent<Activity> {

    constructor(
        public categorySrv: SalesCategoryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(categorySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_CATEGORIES');
    }

    public override setupForm(e: Activity): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr]
        });
    }
}
