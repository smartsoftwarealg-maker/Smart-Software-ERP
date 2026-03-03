import { Component, inject } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {
    UntypedFormBuilder,
    Validators,
    ReactiveFormsModule,
    FormGroup,
} from '@angular/forms';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { TaxPayment } from '../tax-payment.api';
import { TaxPaymentService } from '../tax-payment.service';
import { FundService } from '@ss/payroll/api-employee';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-tax-payment-detail',
    imports: [
        MatCard,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        TranslateDirective,
        DatePickerComponent,
        MaterialModule,
        UiAutoCompleteComponent,
    ],
    templateUrl: './tax-payment-detail.component.html',
    styleUrl: './tax-payment-detail.component.scss',
})
export class TaxPaymentDetailComponent extends BaseEntityDetailComponent<TaxPayment> {
    private loginSrv = inject(LoginService);
    private router = inject(Router);
    private fundSrv = inject(FundService);

    fundModel = new DefaultAutoCompleteModel(this.fundSrv);

    constructor(
        public override entitySrv: TaxPaymentService,
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
            'PAYROLL_TAX_PAYMENT',
        );
    }

    public override setupForm(t: TaxPayment): FormGroup {
        return this.formBuilder.group({
            id: [t.id],
            centerId: [t.centerId || this.loginSrv.appCtx.center],
            parentId: [this.entitySrv.getParentId()],
            date: [t.date || new Date(), [Validators.required]],
            base: [t.base, [Validators.required]],
            vf: [t.vf, [Validators.required]],
            irg: [t.irg, [Validators.required]],
            fund: [t.fund, [Validators.required]],
        });
    }

    override ngOnInit() {
        if (
            this.entitySrv.getParentId() == null ||
            this.entitySrv.getParentId() < 1
        ) {
            this.router.navigate(['../'], { relativeTo: this.route }).then();
            console.warn('Parent id is not set');
        }
        console.log(this.entitySrv.getParentId())
        super.ngOnInit();
    }
}
