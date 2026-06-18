import {
  Component,
  effect,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
  WritableSignal,
  signal,
  ChangeDetectionStrategy
} from '@angular/core';
import {CashFlowAcc, CashFlowAccountService} from '@ss/accounting/accounting-api';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService, PaginationModel} from '@ss/common/api-common';
import {SnackBarService} from '@ss/common/ui-shell';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatIconButton } from '@angular/material/button';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-cash-flow-account-list',
    templateUrl: './cash-flow-account-list.component.html',
    styleUrls: ['./cash-flow-account-list.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, MatIconButton, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent]
})
export class CashFlowAccountListComponent implements OnInit {
    private filter: string = '';
    SIGNS = ['DEBIT', 'CREDIT', 'BALANCE'];
    readonly displayedColumns = (['ctrl', 'accountno', 'description']);
    data = signal<CashFlowAcc[]>([]);
    // replaced primitive selected:number with a writable Signal
    selectedId: WritableSignal<number> = signal(0);
    pagination = PaginationModel.newInstance();
    @Output() itemDeleted =  new EventEmitter<boolean>();
    account = input<string>('');
    onAccountChange = effect(() => {
        this.filter = this.account();
        this.refresh();
    });

    constructor(
        private entitySrv: CashFlowAccountService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBarSrv: SnackBarService,
        private loginSrv: LoginService) {
        this.entitySrv.setParentId(this.loginSrv?.appCtx.accYear||0);
        this.pagination.onChange = () => this.refresh();

    }


    // accept either the entity or an id for compatibility with templates
    select(cfaOrId: CashFlowAcc | number) {
        const id = typeof cfaOrId === 'number' ? (cfaOrId || 0) : (cfaOrId?.id || 0);
        this.selectedId.set(id);
    }

    ngOnInit() {
        this.loginSrv
            .loadContext()
            .subscribe(_ => this.entitySrv.setParentId(this.loginSrv?.appCtx.accYear||0));
    }

    refresh() {
        this.entitySrv
            .getPage(this.pagination, this.filter)
            .subscribe(res => this.data.set(res));
    }

    delete(e: CashFlowAcc) {
        this.entitySrv
            .remove(e.id)
            .subscribe(res => {
                if (res.count > 0) {
                    this.data.update(v => v.filter(x => x.id !== e.id));
                    this.itemDeleted.emit(true);
                    this.snackBarSrv.showSuccessMessage();
                }
            });
    }
}
