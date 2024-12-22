import { Component, OnDestroy, OnInit } from "@angular/core";
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService, MaterialModule } from '@ss/common/api-common';
import { Observable } from 'rxjs';
import { Service, ServiceService } from '@ss/common/api-lookup';
import { EmployeeService } from '@ss/employee-services/employee-services';
import { PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import { MatCard } from "@angular/material/card";
import { NgIf } from "@angular/common";
import { MatFormField, MatLabel, MatError } from "@angular/material/form-field";
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from "@angular/material/input";
import { UiAutoCompleteComponent } from "../../../../../common/ui-auto-complete/src/lib/auto-complete.component";

@Component({
    selector: 'ss-service-detail',
    templateUrl: './service-detail.component.html',
    styleUrls: ['./service-detail.component.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError, UiAutoCompleteComponent]
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
            id:          [a.id||0],
            description: [a.description, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            responsible: [a.responsible]
        });
    }

    public override readForm(): Service {
        return  this.form.value as Service;
    }
}
