import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { BaseChildEntityDetailComponent, BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService } from '@ss/common/api-common';
import { Child, EmployeeChildrenService } from '@ss/payroll/api-employee';
import { Post, LookupsService, Department, Division, Service, Category } from '@ss/common/api-lookup';

@Component({
    selector: 'ss-emp-child-detail',
    templateUrl: './employee-child-detail.component.html',
    styleUrls: ['./employee-child-detail.component.scss']
})
export class EmployeeChildDetailComponent extends BaseChildEntityDetailComponent<Child> {
    private formBuilder = inject(FormBuilder);

    entity: Child = null;

    constructor(public employeeChildrenSrv: EmployeeChildrenService) {
        super(employeeChildrenSrv);
    }

    override setupForm(a: Child): UntypedFormGroup {
        this.entity = a;
        return this.form = this.formBuilder.group({
            id: a.id,
            parentId:   [a.parentId || this.employeeChildrenSrv.getParentId()],
            name:       [a.name, Validators.required],
            sex:        [a.sex],
            birthPlace: [a.birthPlace],
            birthDate: [a.birthDate]
        });
    }
}
