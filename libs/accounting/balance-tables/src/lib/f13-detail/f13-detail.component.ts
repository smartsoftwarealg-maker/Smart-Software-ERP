import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { F12, F13 } from '../services/balance-tables.api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';

import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { F12Service } from '../services/f12-service';
import { PayModeService } from '@ss/common/api-lookup';
import { SupplierService } from '@ss/logistics/api-agent';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonUiLookupModule } from '@ss/common/ui-lookup';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { F13Service } from '../services/f13-service';
import { AccFileService } from '@ss/accounting/accounting-api';

@Component({
    selector: 'ss-f13-detail',
    standalone: true,
    imports: [
        CommonModule,


        MatCard,
        MatCardContent,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        CommonUiLookupModule
    ],
    templateUrl: './f13-detail.component.html',
    styleUrl: './f13-detail.component.scss'
})
export class F13DetailComponent extends BaseEntityDetailComponent<F13> {
    #router = inject(Router);
    #accFileSrv = inject(AccFileService);
    #payModeSrv: PayModeService   = inject(PayModeService);
    #supplierSrv: SupplierService = inject(SupplierService);

    payModeLookup = new DefaultAutoCompleteModel(this.#payModeSrv);
    supplierLookup = new DefaultAutoCompleteModel(this.#supplierSrv);

    constructor(
        public override entitySrv: F13Service,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv,
            shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ACC_F13');
        this.entitySrv.setParentId(this.#accFileSrv.accFile?.id);
    }

    public override setupForm(e: F13): UntypedFormGroup {
        return this.formBuilder.group({
            id:           [e.id],
            fileId:       [e.fileId||this.entitySrv.getParentId()],
            municipality: [e.municipality],
            turnover:     [e.turnover || 0, Validators.required],
            exemption:    [e.exemption || 0,   Validators.required],
            taxRate:      [e.taxRate || 0, [Validators.required, Validators.min(0), Validators.max(100)]],
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
