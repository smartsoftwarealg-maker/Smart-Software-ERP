import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CashFlowAcc, CashFlowAccountService} from '@ss/accounting/accounting-api';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService, PaginationModel} from '@ss/common/api-common';
import {SnackBarService} from '@ss/common/ui-shell';

@Component({
  selector: 'ss-cash-flow-account-list',
  templateUrl: './cash-flow-account-list.component.html',
  styleUrls: ['./cash-flow-account-list.component.scss']
})
export class CashFlowAccountListComponent implements OnInit {
    private filter: string = '';
    SIGNS = ['DEBIT', 'CREDIT', 'BALANCE'];
    displayedColumns = ['ctrl', 'accountno', 'description'];
    data: CashFlowAcc[] = [];
    selected = 0;
    pagination = PaginationModel.newInstance();
    @Output() itemDeleted =  new EventEmitter<Boolean>();

    constructor(
        private entitySrv: CashFlowAccountService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBarSrv: SnackBarService,
        private loginSrv: LoginService) {
        this.entitySrv.setParentId(this.loginSrv?.appCtx.accYear);
        this.pagination.onChange = () => this.refresh();
    }

    @Input()
    set account(code: string) {
        this.filter = code;
        this.refresh();
    }


    select(cfa: CashFlowAcc) {
        this.selected = cfa?.id;
    }

    ngOnInit() {
        this.loginSrv
            .loadContext()
            .subscribe(_ => this.entitySrv.setParentId(this.loginSrv?.appCtx.accYear));
    }

    refresh() {
        this.entitySrv
            .getPage(this.pagination, this.filter)
            .subscribe(res => this.data = res);
    }

    delete(e: CashFlowAcc) {
        this.entitySrv
            .remove(e.id)
            .subscribe(res => {
                if (res.count > 0) {
                    this.data = this.data.filter(x => x.id !== e.id);
                    this.itemDeleted.emit(true);
                    this.snackBarSrv.showSuccessMessage();
                }
            })
    }
}
