import { Component } from '@angular/core';
import { EducationLevel, EducationLevelService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";


@Component({
    selector: 'ss-education-level-list',
    templateUrl: '../base-templates/list-template.html',
    styleUrls: ['../base-templates/list-template.scss']
})
export class EducationLevelListComponent extends BaseEntityListComponent<EducationLevel> {

    displayedColumns = ['description'];

    constructor(
        public educationLevelSrv: EducationLevelService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public router: Router) {
        super(educationLevelSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'PAYROLL_EDUCATION_LEVELS');
    }

}
