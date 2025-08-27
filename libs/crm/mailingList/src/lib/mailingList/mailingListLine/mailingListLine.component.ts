import { Component } from '@angular/core';
import { BaseChildEntityListComponent} from '@ss/common/ui-base-entity';
import {
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
} from '@angular/material/table';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { MailingListLine } from '../miling-list-api.class';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MailingLineListService } from '../mailingLineList.service';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'ss-mailing-list-line',
    templateUrl: 'mailingListLine.component.html',
    styleUrls: ['mailingListLine.component.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        MatMiniFabButton,
        TranslatePipe,
        MatTooltip,
        MatCheckbox
    ]
})
export class MailingListLineComponent extends BaseChildEntityListComponent<MailingListLine> {

    override displayedColumns = [
        'fullName',
        'email',
        'mobile',
        'isUnsubscribed'
    ];

    constructor(protected override detailSrv: MailingLineListService) {
        super(detailSrv, 'COMMON_MAILING_LIST');
        this.paginator.pageSize = 10;
    }
}

