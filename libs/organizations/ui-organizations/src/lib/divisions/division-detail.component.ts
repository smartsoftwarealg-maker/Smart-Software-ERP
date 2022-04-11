import { Component, OnDestroy, OnInit } from "@angular/core";
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Division, Service, Department, Office, Lookup, DivisionService } from '@ss/organizations/api-organizations';
import { PersonAutocompleteClass } from '@ss/payroll-common';
import { EmployeeService } from '@ss/payroll/api-employee';

@Component({
    selector: 'ss-division-detail',
    templateUrl: './division-detail.component.html',
    styleUrls: ['./division-detail.component.scss']
})
export class DivisionDetailComponent extends BaseEntityDetailComponent<Division> implements OnInit, OnDestroy {

    public form: FormGroup = null;
    public saving: boolean = false;
//    public parentId: number = 0;
    public personAutoCompleteModel: PersonAutocompleteClass;

    constructor(
        public divisionsSrv: DivisionService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public httpSrv: HttpService,
        public confirmationSrv: ConfirmationDialogService,
        private employeeSrv: EmployeeService) {
        super(divisionsSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_DIVISION');
        this.personAutoCompleteModel = new PersonAutocompleteClass(this.employeeSrv);
    }

    /*protected getRouteParam(): Observable<any> {
        return this.route.parent.parent.params
            .pipe(
                switchMap(p => {
                    this.parentId = +p.id;
                    this.divisionsSrv.setParentId(this.parentId);
                    return super.getRouteParam();
                })
            );
    }*/

    setupForm(a: Division): FormGroup {
        return this.form = this.formBuilder.group({
            description: [a.description, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            responsible: [a.responsible, Validators.required]
        });
    }

    public readForm(): Division {
        const formVal = this.form.value as Division;
//        formVal.division = this.parentId;
        return formVal;
    }
}
