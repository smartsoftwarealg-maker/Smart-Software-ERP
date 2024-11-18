import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { F12 } from '../services/balance-tables.api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { F12Service } from '../services/f12-service';
import { PayModeService } from '@ss/common/api-lookup';
import { SupplierService } from '@ss/logistics/api-agent';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonUiLookupModule } from '@ss/common/ui-lookup';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { AccFileService } from '@ss/accounting/accounting-api';

@Component({
    selector: 'ss-f12-detail',
    standalone: true,
    imports: [
        CommonModule,
        CommonUiLangModule,
        UiPaginationModule,
        MatCard,
        MatCardContent,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        CommonUiLookupModule,
        CommonUiDatepickerModule
    ],
    templateUrl: './f12-detail.component.html',
    styleUrl: './f12-detail.component.scss'
})
export class F12DetailComponent extends BaseEntityDetailComponent<F12> {
    #router = inject(Router);
    #accFileSrv = inject(AccFileService);
    #payModeSrv: PayModeService   = inject(PayModeService);
    #supplierSrv: SupplierService = inject(SupplierService);

    payModeLookup = new DefaultAutoCompleteModel(this.#payModeSrv);
    supplierLookup = new DefaultAutoCompleteModel(this.#supplierSrv, 'id', 'denomination');

    constructor(
        public override entitySrv: F12Service,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv,
            shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ACC_F12');
        this.entitySrv.setParentId(this.#accFileSrv.accFile?.id);
    }

    public override setupForm(e: F12): UntypedFormGroup {
        return this.formBuilder.group({
            id:         [e.id],
            fileId:     [e.fileId||this.entitySrv.getParentId()],
            agent:      [e.agent],
            reference:  [e.reference,      Validators.required],
            refDate:    [e.refDate ||      new Date(),   Validators.required],
            amount:     [e.amount || 0,    Validators.required],
            refAmount:  [e.refAmount || 0, Validators.required],
            paymode:    [e.paymode,        Validators.required],
        });
    }
    override ngOnInit() {
        if (!this.#accFileSrv.accFile?.id) {
            this.#router.navigate(['../'], { relativeTo: this.route }).then();
        } else {
            super.ngOnInit();
        }
    }
}
