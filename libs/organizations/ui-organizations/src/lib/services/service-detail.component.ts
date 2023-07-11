import { Component, OnDestroy, OnInit } from "@angular/core";
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { Service, ServiceService } from '@ss/common/api-lookup';
import { EmployeeService } from '@ss/employee-services/employee-services';
import { PersonAutocompleteClass } from '@ss/employee-services/employee-services';

@Component({
    selector: 'ss-service-detail',
    templateUrl: './service-detail.component.html',
    styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent extends BaseEntityDetailComponent<Service> implements OnInit, OnDestroy {
    public saving: boolean = false;
    public personAutoCompleteModel: PersonAutocompleteClass;

    constructor(
        public serviceSrv: ServiceService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public  httpSrv: HttpService,
        private employeeSrv: EmployeeService,
        public override confirmationSrv: ConfirmationDialogService) {
        super(serviceSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_SERVICE');
        this.personAutoCompleteModel = new PersonAutocompleteClass(this.employeeSrv);
    }

    protected override getRouteParam(): Observable<any> {
        this.serviceSrv.setParentId(0);
        return super.getRouteParam();
    }

    override setupForm(a: Service): UntypedFormGroup {
        return this.form = this.formBuilder.group({
            description: [a.description, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            responsible: [a.responsible]
        });
    }

    public override readForm(): Service {
        const formVal = this.form.value as Service;
        return formVal;
    }
}
