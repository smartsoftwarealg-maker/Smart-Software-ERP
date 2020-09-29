import { Component } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/api-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Diploma, DiplomaService} from "@ss/payroll/api-lookup";


@Component({
    selector: 'ss-diploma-detail',
    templateUrl: './diploma-detail.component.html',
    styleUrls: ['./diploma-detail.component.scss']
})
export class DiplomaDetailComponent extends BaseEntityDetailComponent<Diploma> {

    constructor(
        public diplomaSrv: DiplomaService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder) {
            super(diplomaSrv, shellSrv, snackBarSrv, route, formBuilder, 'PAYROLL_EDIT_DIPLOMA');
    }

    public setupForm(e: Diploma): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
