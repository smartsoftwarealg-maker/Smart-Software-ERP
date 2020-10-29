import { Component } from '@angular/core';
import { Category, CategoryService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";


@Component({
    selector: 'ss-category-list',
    templateUrl: '../base-templates/list-template.html',
    styleUrls: ['../base-templates/list-template.scss']
})
export class CategoryListComponent extends BaseEntityListComponent<Category> {

    displayedColumns = ['description'];

    constructor(
        public categorySrv: CategoryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public router: Router) {
        super(categorySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'PAYROLL_CATEGORIES');
    }

}
