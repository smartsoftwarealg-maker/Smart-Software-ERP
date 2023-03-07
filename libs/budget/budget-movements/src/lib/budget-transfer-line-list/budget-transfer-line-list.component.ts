import {Component, OnInit} from '@angular/core';
import {BudgetTransferService} from '../budget-transfer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {of, switchMap} from 'rxjs';
import {BudgetTransferDetail} from '../budget-movement-api';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginationModel} from '@ss/common/api-common';

@Component({
    selector: 'ss-budget-line-list',
    templateUrl: './budget-transfer-line-list.component.html',
    styleUrls: ['./budget-transfer-line-list.component.scss'],
})
export class BudgetTransferLineListComponent implements OnInit {
    selected = 0;
    pagination = PaginationModel.newInstance({ pageSize: 10, page: 1, elementCount: 0});
    data: BudgetTransferDetail[] = [];
    displayedColumns = ['description', 'amount']

    constructor(private entitySrv: BudgetTransferService,
                private router: Router,
                private confirmationSrv: ConfirmationDialogService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.route
            .parent
            .paramMap
            .pipe(switchMap(params => this.entitySrv.getDetail(+params.get('id') || 0)) )
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
            .pipe(switchMap(res => res ? this.entitySrv.remove(this.selected) : of({count: -1})),
                  switchMap(res => res.count > 0 ? this.entitySrv.getDetail(this.selected) : of(null)))
            .subscribe(res => {
                this.data = res;
                this.selected = null;
            });
    }

}
