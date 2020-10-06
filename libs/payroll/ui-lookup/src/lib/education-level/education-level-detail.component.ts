import {Component} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EducationLevel, EducationLevelService} from "@ss/payroll/api-lookup";


@Component({
    selector: 'ss-education-level-detail',
    templateUrl: '../base-templates/detail-template.html',
    styleUrls: ['../base-templates/detail-template.scss']
})
export class EducationLevelDetailComponent extends BaseEntityDetailComponent<EducationLevel> {

    constructor(
        public educationLevelSrv: EducationLevelService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder) {
        super(educationLevelSrv, shellSrv, snackBarSrv, route, formBuilder, 'PAYROLL_EDIT_EDUCATION_LEVEL');
    }

    public setupForm(e: EducationLevel): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
