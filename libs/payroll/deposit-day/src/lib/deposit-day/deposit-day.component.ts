import { Component, inject } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { DepositDate } from './deposit-date';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DepositDateService } from './deposit-date.service';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { TranslateDirective } from '@ss/common/ui-lang';
import { LoginService } from '@ss/common/api-common';
import { Observable } from 'rxjs';

@Component({
    selector: 'ss-deposit-day',
    imports: [
        FormsModule,
        MatCard,
        MatCardContent,
        MatCheckbox,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        TranslateDirective,
    ],
    templateUrl: './deposit-day.component.html',
    styleUrl: './deposit-day.component.scss',
})
export class DepositDayComponent extends BaseEntityDetailComponent<DepositDate> {
    #loginSrv = inject(LoginService);

    constructor(
        public override entitySrv: DepositDateService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'REMUN_DEPOSIT_DAY',
        );
    }

    override loadEntity(id: number): Observable<DepositDate> {
        return super.loadEntity(this.#loginSrv.appCtx.center);
    }

    public override setupForm(e: DepositDate): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            depositDay: [e.depositDay],
            isGlobal: [e.isGlobal || false],
        });
    }
}
