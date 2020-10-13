import {Component} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Nationality, NationalityService} from "@ss/payroll/api-lookup";


@Component({
    selector: 'ss-nationality-detail',
    templateUrl: '../base-templates/detail-template.html',
    styleUrls: ['../base-templates/detail-template.scss']
})
export class NationalityDetailComponent extends BaseEntityDetailComponent<Nationality> {

    constructor(
        public nationalitySrv: NationalityService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder) {
        super(nationalitySrv, shellSrv, snackBarSrv, route, formBuilder, 'EDIT_NATIONALITY');
    }

    public setupForm(e: Nationality): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
