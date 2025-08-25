import { Component } from '@angular/core';
import { CMMSWorkDetail, IS_NOT_INSPECTION } from '@ss/cmms/cmms-api';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CMMSPrevWorkOrderService } from '../c-m-m-s-prev-work-order.service';
import { DOC_WORK_REQUEST } from '@ss/logistics/api-transaction';
import { MatCard, MatCardContent } from '@angular/material/card';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-prev-work-order-detail',
    templateUrl: './prev-work-order-detail.component.html',
    styleUrls: ['./prev-work-order-detail.component.css'],
    standalone: true,
    imports: [
    MatCard,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    TranslateDirective,
    MatInput,
    DatePickerComponent,
    MatError,
    UiAutoCompleteComponent,
    MatTabGroup,
    MatTab,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    PaginationComponent,
    AsyncPipe,
    DecimalPipe,
    TranslatePipe,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef
]
})
export class PrevWorkOrderDetailComponent extends CMMSWorkDetail {
    constructor(
        public override entitySrv: CMMSPrevWorkOrderService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, DOC_WORK_REQUEST, 'CMMS_PREV_WORK_ORDER', IS_NOT_INSPECTION);
    }

}
