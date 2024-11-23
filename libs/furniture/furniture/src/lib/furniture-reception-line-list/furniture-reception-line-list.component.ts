import {Component, OnInit} from '@angular/core';
import {PaginationModel} from '@ss/common/api-common';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {of, switchMap} from 'rxjs';
import {FurnitureTransactionDetail} from '../furniture-api';
import {FurnitureTransactionLineService} from '../furniture-transaction-line.service';
import {FurnitureReceptionService} from '../furniture-reception.service';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '../../../../../common/ui-lang/src/lib/translate.directive';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'ss-furniture-reception-line-list',
    templateUrl: './furniture-reception-line-list.component.html',
    styleUrls: ['./furniture-reception-line-list.component.scss'],
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
export class FurnitureReceptionLineListComponent implements OnInit {
    parentId = 0;
    selected = 0;
    pagination = PaginationModel.newInstance({ pageSize: 10, page: 1, elementCount: 0});
    data: FurnitureTransactionDetail[] = [];
    displayedColumns = ['description', 'qty', 'price']

    constructor(private entitySrv: FurnitureReceptionService,
                private detailSrv: FurnitureTransactionLineService,
                private router: Router,
                private confirmationSrv: ConfirmationDialogService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.route
            .parent
            .paramMap
            .pipe(switchMap(params => {
                this.parentId = +params.get('id') || 0;
                return this.detailSrv.getDetailLines(this.parentId);
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
                switchMap(res => res.count > 0 ? this.detailSrv.getDetailLines(this.parentId) : of(this.data)))
            .subscribe(res => {
                this.data = res;
                this.selected = null;
            });
    }
}
