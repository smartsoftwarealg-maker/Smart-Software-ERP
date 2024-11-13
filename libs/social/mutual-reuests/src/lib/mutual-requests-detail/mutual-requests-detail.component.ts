import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityDetailComponent, BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { MutualRequest, MutualRequestService } from '@social/social-api';
import { BankService } from '@ss/administration/api-bank';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';

@Component({
    selector: 'ss-mutual-requests',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable, UiPaginationModule, MatHeaderCellDef, MatCard, MatCardContent, MatError, MatFormField, MatInput, MatLabel, MaterialModule, ReactiveFormsModule, CommonUiDatepickerModule],
    templateUrl: './mutual-requests-detail.component.html',
    styleUrl: './mutual-requests-detail.component.scss'
})
export class MutualRequestsDetailComponent extends BaseEntityDetailComponent<MutualRequest> {
    #loginSrv = inject(LoginService);

    constructor(
        public override entitySrv: MutualRequestService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SOCIAL_MUTUAL_REQUEST');
    }

    public override setupForm(e: MutualRequest): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            serialNumber: [{ value: e.serialNumber||0, disabled: true }],
            description:  [e.description],
            date:         [e.date || new Date(), Validators.required],
            centerId:     [e.centerId||this.#loginSrv.appCtx.center, Validators.required]
        })
    }
}
