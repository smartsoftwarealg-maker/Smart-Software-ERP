import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent, BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { F8 } from '../services/balance-tables.api';
import { BankService } from '@ss/administration/api-bank';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { F8Service } from '../services/f8-service';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';

import { type } from 'node:os';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AccFileService } from '@ss/accounting/accounting-api';

@Component({
    selector: 'ss-f8-detail',
    standalone: true,
    imports: [CommonModule,   MatCard, MatCardContent, MatError, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
    templateUrl: './f8-detail.component.html',
    styleUrl: './f8-detail.component.scss'
})
export class F8DetailComponent extends BaseEntityDetailComponent<F8> {
    #router = inject(Router);
    #accFileSrv = inject(AccFileService);

    constructor(
        public override entitySrv: F8Service,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv,
            shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ACC_F8');
        this.entitySrv.setParentId(this.#accFileSrv.accFile?.id||0);
    }

    public override setupForm(e: F8): UntypedFormGroup {
        return this.formBuilder.group({
            id:     [e.id],
            fileId: [e.fileId||this.entitySrv.getParentId()],
            debtor: [e.debtor],
            value1: [e.value1 || 0, Validators.required],
            value2: [e.value2 || 0, Validators.required],
            tType:  [e.tType  || 1, Validators.required]
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
