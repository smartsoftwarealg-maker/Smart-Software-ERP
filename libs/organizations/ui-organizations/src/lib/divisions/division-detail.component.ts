import { Component, OnDestroy, OnInit } from "@angular/core";
import { ShellService, SnackBarService, KeepOnToolbar } from '@ss/common/ui-shell';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { HttpService, MaterialModule } from '@ss/common/api-common';
import { Division, DivisionService } from '@ss/common/api-lookup';
import { EmployeeService } from '@ss/employee-services/employee-services';
import { PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import { MatCard } from "@angular/material/card";
import { NgIf } from "@angular/common";
import { MatFormField, MatLabel, MatError } from "@angular/material/form-field";
import { TranslateDirective } from "../../../../../common/ui-lang/src/lib/translate.directive";
import { MatInput } from "@angular/material/input";
import { UiAutoCompleteComponent } from "../../../../../common/ui-auto-complete/src/lib/auto-complete.component";

@Component({
    selector: 'ss-division-detail',
    templateUrl: './division-detail.component.html',
    styleUrls: ['./division-detail.component.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError, UiAutoCompleteComponent]
})
export class DivisionDetailComponent extends BaseEntityDetailComponent<Division> implements OnInit, OnDestroy {
    public saving: boolean = false;
    public personAutoCompleteModel: PersonAutocompleteClass;

    constructor(
        public divisionsSrv: DivisionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        private employeeSrv: EmployeeService,
        public httpSrv: HttpService,
        public override confirmationSrv: ConfirmationDialogService) {
        super(divisionsSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_DIVISION');
        this.personAutoCompleteModel = new PersonAutocompleteClass(this.employeeSrv);
    }

    override setupForm(a: Division): UntypedFormGroup {
        return this.form = this.formBuilder.group({
            id:          [a.id || 0],
            description: [a.description, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            responsible: [a.responsible]
        });
    }

    public override readForm(): Division {
        return this.form.value as Division;
    }
}
