import { Component, inject, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Formula} from './payroll-formulas-api';
import {ElementsInfo, ElementsInfoService} from '@ss/remuneration/elementsinfo';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {PayrollFormulasService} from './payroll-formulas.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {PayrollMonthService} from '@ss/remuneration/payroll-month';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { MatCard, MatCardContent } from '@angular/material/card';

import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import {Observable, switchMap, tap} from 'rxjs';

@Component({
    selector: 'ss-formula-detail',
    templateUrl: './formula-detail.component.html',
    styleUrls: ['./formula-detail.component.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError, UiAutoCompleteComponent, MatSelect, MatOption]
})
export class FormulaDetailComponent extends BaseEntityDetailComponent<Formula> {
    private monthSelectorSrv  = inject(PayrollMonthService);
    private loginSrv = inject(LoginService);
    private elementSrv = inject(ElementsInfoService);
    private isCurrentMonth = true;

    elementLookup = new DefaultAutoCompleteModel(this.elementSrv, 'field', 'description');


    constructor(
        public detailSrv: PayrollFormulasService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'REMUN_FORMULAS');
    }

    setupForm(e: Formula): UntypedFormGroup {
        const form = this.formBuilder.group({
            id:            [e.id],
            archiveYear:   [e.archiveYear || this.loginSrv.appCtx.payMonth],
            description:   [e.description, Validators.required],
            variable:      [e.variable, Validators.required],
            descriptionAr: [e.descriptionAr],
            base:          [e.base || '0'],
            rate:          [e.rate || '0'],
            formula:       [e.formula, Validators.required],
            accountno:     [e.accountno],
            followup_fld:  [e.followup_fld],
            val_sign:      [e.val_sign || 1]
        });
        if (!this.isCurrentMonth && e?.base !== '-1') {
            this.saveButton.visible = false;
            form.disable();
        }branch
        return form;
    }

    loadEntity(id: number): Observable<Formula> {
        return this.monthSelectorSrv
            .isUpdatableMonth()
            .pipe(
                tap(res => {
                    this.isCurrentMonth = res;
                }),
                switchMap((() => super.loadEntity(id))));
    }

    readForm(): Formula {
        return this.form.getRawValue();
    }
}
