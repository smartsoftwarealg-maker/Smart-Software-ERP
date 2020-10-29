import { Component } from '@angular/core';
import { Class, ClassService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";


@Component({
    selector: 'ss-class-list',
    templateUrl: '../base-templates/list-template.html',
    styleUrls: ['../base-templates/list-template.scss']
})
export class ClassListComponent extends BaseEntityListComponent<Class> {

    displayedColumns = ['description'];

    constructor(
        public classSrv: ClassService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public router: Router) {
        super(classSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'STOCK_CLASSES');
    }

}
