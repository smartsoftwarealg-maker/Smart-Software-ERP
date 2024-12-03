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
import { MonthSelectorComponent } from "@ss/remuneration/payroll-month";
import { LoginService } from "@ss/common/api-common";
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
    selector: 'ss-formula-detail',
    templateUrl: './formula-detail.component.html',
    styleUrls: ['./formula-detail.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardContent, NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError, UiAutoCompleteComponent, MatSelect, MatOption]
})
export class FormulaDetailComponent extends BaseEntityDetailComponent<Formula> {
    private loginSrv = inject(LoginService);
    private elementSrv = inject(ElementsInfoService);
    elementLookup = new DefaultAutoCompleteModel(this.elementSrv, 'field', 'description');

    constructor(
        private detailSrv: PayrollFormulasService,
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
        return this.formBuilder.group({
            id: [e.id],
            archiveYear: [e.archiveYear || this.loginSrv.appCtx.payMonth],
            description: [e.description, Validators.required],
            variable: [e.variable, Validators.required],
            descriptionAr: [e.descriptionAr],
            base: [e.base || '0'],
            rate: [e.rate || '0'],
            formula: [e.formula, Validators.required],
            accountno: [e.accountno],
            followup_fld: [e.followup_fld],
            val_sign: [e.val_sign || 3]
        });
    }


    readForm(): Formula {
        return this.form.getRawValue();
    }
}
