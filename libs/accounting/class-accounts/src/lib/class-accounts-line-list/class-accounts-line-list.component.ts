import { Component } from '@angular/core';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
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
import { SodismacSupplierAccount } from '../class-accounts-api.class';
import { ClassAccountsLineService } from '../class-accounts.service';
import { AsyncPipe } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'ss-class-accounts-line-list',
    templateUrl: './class-accounts-line-list.component.html',
    styleUrls: ['./class-accounts-line-list.component.scss'],
    standalone: true,
    imports: [
        MatTooltip,
        MatMiniFabButton,
        TranslatePipe,
        TranslateDirective,
        MatTable,
        AsyncPipe,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderCellDef,
        MatCell,
        MatCellDef,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        PaginationComponent,
    ],
})
export class ClassAccountsLineListComponent extends BaseChildEntityListComponent<SodismacSupplierAccount> {
    override displayedColumns: string[] = ['category', 'accountNo'];

    constructor(protected override detailSrv: ClassAccountsLineService) {
        super(detailSrv, 'CLASS_ACCOUNTS');
    }
}
