import { Component, OnDestroy, OnInit } from "@angular/core";
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService } from '@ss/common/api-common';
import { EmployeeService } from '@ss/payroll/api-employee';
import { Observable } from 'rxjs';
import { OfficeService, Office } from '@ss/common/api-lookup';
import { PersonAutocompleteClass } from '@ss/payroll-common';

@Component({
    selector: 'ss-office-detail',
    templateUrl: './office-detail.component.html',
    styleUrls: ['./office-detail.component.scss']
})
export class OfficeDetailComponent extends BaseEntityDetailComponent<Office> implements OnInit, OnDestroy {

    public form: FormGroup = null;
    public saving: boolean = false;

    constructor(
        public officeSrv: OfficeService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public httpSrv: HttpService,
        public confirmationSrv: ConfirmationDialogService) {
        super(officeSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_OFFICE');
    }

    protected getRouteParam(): Observable<any> {
        this.officeSrv.setParentId(0);
        return super.getRouteParam();
    }

    setupForm(a: Office): FormGroup {
        return this.form = this.formBuilder.group({
            description: [a.description, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(4)])],
            blockNo: [a.blockNo, [Validators.minLength(1), Validators.maxLength(4)]],
            floorNo: [a.floorNo, [Validators.min(0), Validators.max(20)]]
        });
    }

    public readForm(): Office {
        const formVal = this.form.value as Office;
        return formVal;
    }
}
