import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, PaginatorPersistenceService } from '@ss/common/api-common';

import {
    MatCell, MatCellDef, MatColumnDef,
    MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PollQuestion } from '@ss/scheduled-sales/api-scheduled-sales';
import { PollQuestionService } from '../poll-question.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { CustomerComplaint } from '../../../../customer-complaints/src/lib/customer-complaint.class';

export const AnswerTypes = ['SCH_UNSPECIFIED', 'SCH_SATISFACTION', 'SCH_BOOLEAN']

@Component({
    selector: 'sch-sales-poll-list',
    standalone: true,
    imports: [
        CommonModule,
        MatCell,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatRow,
        MatSort,
        MatSortHeader,
        MatTable,
        PaginationComponent,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef,
        TranslateDirective,
        MatCheckbox,
    ],
    templateUrl: './poll-question-list.component.html',
    styleUrl: './poll-question-list.component.css',
})

export class PollQuestionListComponent extends BaseEntityListComponent<PollQuestion> {

    displayedColumns = [
        'description',
        'descriptionAr',
        'descriptionEn',
        'answerType',
        'showMemo',
    ];

    public AnswerTypes = AnswerTypes //['SS_UNSPECIFIED', 'SS_SATISFACTION', 'SS_BOOLEAN']

    constructor(
        public override entitySrv: PollQuestionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'SCH_POLL_QUESTIONS',
        );
        this.pagination.pageSize = 10;
    }

    override selectRow(row: PollQuestion) {
        super.selectRow(row);
        this.editButton.disabled = row.isUsed;
        console.log(row.isUsed);
    }
}
