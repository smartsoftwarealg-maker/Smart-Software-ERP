import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { PayrollOptionsService } from './payroll-options.service';
import { RoleService } from '@ss/common/api-lookup';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';

import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { POption } from '@ss/payroll-common';
import { Observable, of } from 'rxjs';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';

@Component({
    selector: 'ss-payroll-options',
    standalone: true,
    imports: [CommonModule,  MatCard, MatCardContent, MatError, MatFormField, MatInput, MatLabel, MaterialModule, ReactiveFormsModule, CommonUiAutoCompleteModule],
    templateUrl: './payroll-options.component.html',
    styleUrl: './payroll-options.component.scss'
})
export class PayrollOptionsComponent extends BaseEntityDetailComponent<POption> implements OnInit {

    private loginSrv = inject(LoginService);
    private roleSrv = inject(RoleService);

    roleLookup0 = new DefaultAutoCompleteModel(this.roleSrv);
    roleLookup1 = new DefaultAutoCompleteModel(this.roleSrv);

    constructor(
        public override entitySrv: PayrollOptionsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_OPTIONS');
    }

    public override setupForm(e: POption): UntypedFormGroup {
        return this.formBuilder.group({
            id:           [e.id || this.loginSrv.appCtx.center],
            codifyId:     [e.codifyId||false],
            manualId:     [e.manualId||false],
            maxSalary:    [e.maxSalary||0],
            vacationRate: [e.vacationRate||0],
            personalRole: [e.personalRole],
            payrollRole:  [e.payrollRole],
            iepRate:      [e.iepRate]
        });
    }

    protected override getRouteParam(): Observable<Params> {
        return of({'id': this.loginSrv.appCtx.center});
    }
}
