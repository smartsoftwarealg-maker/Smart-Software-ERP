import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginationModel} from '@ss/common/ui-pagination';
import {switchMap} from 'rxjs/operators';
import {Commission, CurrencyDepositService, History} from '@ss/exchange/api-currency-deposit';

@Component({
    selector: 'ss-commissions',
    styleUrls: ['./commission.component.scss'],
    templateUrl: './commission.component.html'
})
export class CommissionComponent implements OnInit {

    agentId = 0;
    data: Commission[] = [];

    public readonly pagination = PaginationModel.newInstance();

    displayedColumns = [
        'description',
        'currency',
        'withdrawal',
        'commission',
        'rate'
    ];


    constructor(public exchangeSrv: CurrencyDepositService, public route: ActivatedRoute) {}


    ngOnInit() {
        this.pagination.pageSize = 5;
        this.route
            .queryParams
            .pipe(switchMap(params => {
                this.agentId = +params.id || 0;
                return this.exchangeSrv.getCommissions(this.agentId, this.pagination.page - 1, this.pagination.pageSize);
            })).subscribe( res => this.data = res);
    }
}
