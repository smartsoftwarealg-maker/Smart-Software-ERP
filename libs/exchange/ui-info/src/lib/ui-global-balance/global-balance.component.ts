import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginationModel} from '@ss/common/api-common';
import {
    GBalance,
    GlobalBalanceService
} from '@ss/exchange/api-currency-deposit';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {AgentService} from '@ss/logistics/api-agent';
import {DefaultReportService} from '@ss/common/ui-default-report-component';

@Component({
    selector: 'ss-global-balance',
    styleUrls: ['./global-balance.component.scss',
                '../../../../../common/assets/src/assets/main-container.scss'],
    templateUrl: './global-balance.component.html'
})
export class GlobalBalanceComponent extends BaseEntityListComponent<GBalance> {
    agentId = 0;
    data: GBalance[] = [];

    public readonly pagination = PaginationModel.newInstance();

    displayedColumns = [
        'denomination',
        'code',
        'currency',
        'amount',
    ];

    constructor(public exchangeSrv: GlobalBalanceService,
                public agentService: AgentService,
                public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public router: Router,
                public route: ActivatedRoute,
                public defReportSrv: DefaultReportService,
                public confirmationSrv: ConfirmationDialogService) {
        super(exchangeSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            'EXCHANGE_GLOBAL_BALANCE');

    }


    // ngOnInit() {
    //     this.editButton.visible = false;
    //     this.addButton.visible = false;
    //     this.deleteButton.visible = false;
    //     super.ngOnInit();
    //     this.pagination.pageSize = 5;
    //     this.route
    //         .queryParams
    //         .pipe(switchMap(params => {
    //             this.agentId = +params.id || 0;
    //             return this.exchangeSrv.getGBalance(this.pagination.page - 1, this.pagination.pageSize);
    //         })).subscribe( res => this.data = res);
    // }
}
