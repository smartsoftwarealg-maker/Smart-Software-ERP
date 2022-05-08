import { Component, OnDestroy, OnInit } from "@angular/core";
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Observable, of } from 'rxjs';
import { Service, ServiceService } from '@ss/common/api-lookup';
import { PersonAutocompleteClass } from '@ss/payroll-common';
import { EmployeeService } from '@ss/payroll/api-employee';

@Component({
    selector: 'ss-service-detail',
    templateUrl: './service-detail.component.html',
    styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent extends BaseEntityDetailComponent<Service> implements OnInit, OnDestroy {

    public form: FormGroup = null;
    public saving: boolean = false;
    public personAutoCompleteModel: PersonAutocompleteClass;

    constructor(
        public serviceSrv: ServiceService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public httpSrv: HttpService,
        private employeeSrv: EmployeeService,
        public confirmationSrv: ConfirmationDialogService) {
        super(serviceSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_SERVICE');
        this.personAutoCompleteModel = new PersonAutocompleteClass(this.employeeSrv);
    }

    protected getRouteParam(): Observable<any> {
        this.serviceSrv.setParentId(0);
        return super.getRouteParam();
    }

    setupForm(a: Service): FormGroup {
        return this.form = this.formBuilder.group({
            description: [a.description, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            responsible: [a.responsible, Validators.required]
        });
    }

    public readForm(): Service {
        const formVal = this.form.value as Service;
        return formVal;
    }
}
