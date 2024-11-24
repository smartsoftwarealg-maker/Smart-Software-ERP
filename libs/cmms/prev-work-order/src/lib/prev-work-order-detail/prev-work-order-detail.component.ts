import { Component } from '@angular/core';
import { CMMSWorkDetail, IS_NOT_INSPECTION } from '@ss/cmms/cmms-api';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CMMSPrevWorkOrderService } from '../c-m-m-s-prev-work-order.service';
import { DOC_WORK_REQUEST } from '@ss/logistics/api-transaction';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf, NgFor, AsyncPipe, DecimalPipe } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '../../../../../common/ui-lang/src/lib/translate.directive';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '../../../../../common/ui-datepicker/src/lib/date-picker.component';
import { UiAutoCompleteComponent } from '../../../../../common/ui-auto-complete/src/lib/auto-complete.component';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { PaginationComponent } from '../../../../../common/ui-pagination/src/lib/pagination.component';
import { TranslatePipe } from '../../../../../common/ui-lang/src/lib/translate.pipe';

@Component({
    selector: 'ss-prev-work-order-detail',
    templateUrl: './prev-work-order-detail.component.html',
    styleUrls: ['./prev-work-order-detail.component.css'],
    standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        DatePickerComponent,
        MatError,
        UiAutoCompleteComponent,
        NgFor,
        MatTabGroup,
        MatTab,
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        AsyncPipe,
        DecimalPipe,
        TranslatePipe,
    ],
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
