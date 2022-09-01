import { Component } from '@angular/core';
import { Category, CategoryService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';


@Component({
    selector: 'ss-category-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class CategoryListComponent extends BaseEntityListComponent<Category> {

    displayedColumns = ['description'];

    constructor(
        public categorySrv: CategoryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(categorySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'COMMON_CATEGORIES');
    }

}




@Component({
    selector: 'ss-category-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class CategoryDetailComponent extends BaseEntityDetailComponent<Category> {

    constructor(
        public categorySrv: CategoryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: UntypedFormBuilder) {
        super(categorySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_CATEGORY');
    }

    public setupForm(e: Category): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
