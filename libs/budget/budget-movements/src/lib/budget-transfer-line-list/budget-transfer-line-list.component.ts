import {Component, OnInit} from '@angular/core';
import {BudgetTransferService} from '../budget-transfer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {of, switchMap} from 'rxjs';
import {BudgetTransferDetail} from '../budget-movement-api';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginationModel} from '@ss/common/api-common';
import {BudgetTransferDetailService} from '../budget-transfer-detail.service';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '../../../../../common/ui-lang/src/lib/translate.directive';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'ss-budget-line-list',
    templateUrl: './budget-transfer-line-list.component.html',
    styleUrls: ['./budget-transfer-line-list.component.scss'],
    standalone: true,
    imports: [
        MatMiniFabButton,
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
        DecimalPipe,
    ],
})
export class BudgetTransferLineListComponent implements OnInit {
    parentId = 0;
    selected = 0;
    pagination = PaginationModel.newInstance({ pageSize: 10, page: 1, elementCount: 0});
    data: BudgetTransferDetail[] = [];
    displayedColumns = ['description', 'amount']

    constructor(private entitySrv: BudgetTransferService,
                private detailSrv: BudgetTransferDetailService,
                private router: Router,
                private confirmationSrv: ConfirmationDialogService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.route
            .parent
            .paramMap
            .pipe(switchMap(params => {
                this.parentId = +params.get('id') || 0;
                return this.entitySrv.getDetailLines(this.parentId);
            }) )
            .subscribe(res => this.data = res);
    }

    select(id: number) {
        this.selected = id;
    }

    showDetail(id: number) {
        this.router.navigate(['detail', id], {relativeTo: this.route}).then();
    }

    edit() {
        if (this.selected > 0) {
            this.showDetail(this.selected || 0);
        }
    }

    deleteSelected() {
        this.confirmationSrv
            .confirmDelete()
            .pipe(switchMap(res => res ? this.detailSrv.remove(this.selected) : of({count: -1})),
                  switchMap(res => res.count > 0 ? this.entitySrv.getDetailLines(this.parentId) : of(this.data)))
            .subscribe(res => {
                this.data = res;
                this.selected = null;
            });
    }

}
