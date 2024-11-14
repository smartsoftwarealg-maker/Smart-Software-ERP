import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    BaseChildEntityDetailComponent,
    BaseChildEntityListComponent,
    BaseEntityListComponent
} from '@ss/common/ui-base-entity';
import { MutualRequest, MutualRequestLine, MutualRequestLineService, MutualRequestService } from '@social/social-api';
import { BankService } from '@ss/administration/api-bank';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
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
import { LtmMixtureDetailService } from '@ltm/ltm-api';
import { MatTooltip } from '@angular/material/tooltip';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { EmployeeService, PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import { MutualTypeService } from '@social/social-api';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatCalendarHeader } from '@angular/material/datepicker';

@Component({
    selector: 'ss-mutual-requests-line-detail',
    standalone: true,
    imports: [
        CommonModule,
        CommonUiLangModule,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatSort,
        MatSortHeader,
        MatTable,
        UiPaginationModule,
        MatHeaderCellDef,
        MatTooltip,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        MatCard,
        MatCardContent,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        MatTab,
        MatTabGroup,
        MaterialModule,
        ReactiveFormsModule,
        MatCalendarHeader
    ],
    templateUrl: './mutual-requests-line-detail.component.html',
    styleUrl: './mutual-requests-line-detail.component.scss'
})
export class MutualRequestsLineDetailComponent extends BaseChildEntityDetailComponent<MutualRequestLine> {
    #personSrv = inject(EmployeeService);
    #mutualTypeSrv = inject(MutualTypeService);
    #fb = inject(FormBuilder);

    personLookup = new PersonAutocompleteClass(this.#personSrv);
    mutualTypeLookup = new DefaultAutoCompleteModel(this.#mutualTypeSrv);

    constructor(protected override entitySrv: MutualRequestLineService) {
        super(entitySrv, 'MutualRequestLine');
    }
    override setupForm(e: MutualRequestLine): UntypedFormGroup {
        return this.#fb.group({
            id:          [e.id],
            parentId:    [e.parentId||this.entitySrv.getParentId(), Validators.required],
            folderCount: [e.folderCount, Validators.required],
            employeeId:  [e.employeeId, Validators.required],
            mutualType:  [e.mutualType, Validators.required]
        })
    }
}
