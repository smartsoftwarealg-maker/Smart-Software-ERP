import { Component } from '@angular/core';
import { EducationLevel, EducationLevelService } from '@ss/common/api-lookup';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {BaseEntityDetailComponent, BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DefaultReportService} from '@ss/common/ui-default-report-component';


@Component({
    selector: 'ss-education-level-list',
    templateUrl: './base-templates/list-template.html',
    styleUrls: ['./base-templates/list-template.scss']
})
export class EducationLevelListComponent extends BaseEntityListComponent<EducationLevel> {

    displayedColumns = ['description'];

    constructor(
        public educationLevelSrv: EducationLevelService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router) {
        super(educationLevelSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'COMMON_EDUCATION_LEVELS');
    }

}



@Component({
    selector: 'ss-education-level-detail',
    templateUrl: './base-templates/detail-template.html',
    styleUrls: ['./base-templates/detail-template.scss']
})
export class EducationLevelDetailComponent extends BaseEntityDetailComponent<EducationLevel> {

    constructor(
        public educationLevelSrv: EducationLevelService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public formBuilder: FormBuilder) {
        super(educationLevelSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_EDUCATION_LEVEL');
    }

    public setupForm(e: EducationLevel): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
