import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginationModel, PaginatorPersistenceService} from '@ss/common/api-common';
import {
    GBalance,
    GlobalBalanceService
} from '@ss/exchange/api-currency-deposit';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {AgentService} from '@ss/logistics/api-agent';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { NgClass, DecimalPipe } from '@angular/common';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-global-balance',
    styleUrls: ['./global-balance.component.scss',
        '../../../../../common/assets/src/assets/main-container.scss'],
    templateUrl: './global-balance.component.html',
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, TranslateDirective, MatCellDef, MatCell, NgClass, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent, DecimalPipe]
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
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override router: Router,
                public override route: ActivatedRoute,
                public override defReportSrv: DefaultReportService,
                public override confirmationSrv: ConfirmationDialogService,
                public override pagPersistSrv: PaginatorPersistenceService) {
        super(exchangeSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
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
