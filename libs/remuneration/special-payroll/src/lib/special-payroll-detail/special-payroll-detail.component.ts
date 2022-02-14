import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Special} from '../special-payroll.class';
import {InputFiltersService} from '@ss/remuneration/input-filters';
import {ElementsInfoService} from '@ss/remuneration/elementsinfo';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {SpecialPayrollService} from '../special-payroll.service';
import {LoginService} from '@ss/common/api-common';

@Component({
  selector: 'ss-special-payroll-detail',
  templateUrl: './special-payroll-detail.component.html',
  styleUrls: ['./special-payroll-detail.component.scss']
})
export class SpecialPayrollDetailComponent extends BaseEntityDetailComponent<Special>{

    constructor(
        private detailSrv: SpecialPayrollService,
        override shellSrv: ShellService,
        override snackBarSrv: SnackBarService,
        override route: ActivatedRoute,
        override formBuilder: FormBuilder,
        override confirmationSrv: ConfirmationDialogService,
        private loginSrv: LoginService) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'REMUN_SPECIAL_PAYROLLS');
    }

    setupForm(e: Special): FormGroup {
        return this.formBuilder.group({
            id: [e.id || 0],
            center: [this.loginSrv.appCtx.center],
            paymonth: [this.loginSrv.appCtx.payMonth],
            description: [e.description, Validators.required],
        });
    }
}
