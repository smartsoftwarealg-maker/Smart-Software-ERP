import {Component} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MaritalStatus, MaritalStatusService} from "@ss/payroll/api-lookup";


@Component({
    selector: 'ss-marital-status-detail',
    templateUrl: './marital-status-detail.component.html',
    styleUrls: ['./marital-status-detail.component.scss']
})
export class MaritalStatusDetailComponent extends BaseEntityDetailComponent<MaritalStatus> {

    constructor(
        public maritalStatusSrv: MaritalStatusService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder) {
        super(maritalStatusSrv, shellSrv, snackBarSrv, route, formBuilder, 'PAYROLL_EDIT_MARITAL_STATUS');
    }

    public setupForm(e: MaritalStatus): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
