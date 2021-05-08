import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginationModel} from '@ss/common/ui-pagination';
import {switchMap} from 'rxjs/operators';
import {CurrencyDepositService, History} from '@ss/exchange/api-currency-deposit';

@Component({
    selector: 'ss-card',
    styleUrls: ['./history.component.scss'],
    templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit {

    agentId = 0;
    data: History[] = [];

    public readonly pagination = PaginationModel.newInstance();



    displayedColumns = [
        'excDate',
        'customer',
        'excType',
        'description',
        'credit',
        'debit',
    ];


    constructor(public exchangeSrv: CurrencyDepositService,
                public shellSrv: ShellService,
                public route: ActivatedRoute,
                public router: Router,
                public confirmationSrv: ConfirmationDialogService) {}


    ngOnInit() {
        this.pagination.pageSize = 5;
        this.route
            .queryParams
            .pipe(switchMap(params => {
                this.agentId = +params.id || 0;
                return this.exchangeSrv.getHistory(this.agentId, this.pagination.page - 1, this.pagination.pageSize);
            })).subscribe( res => this.data = res);
    }

}
