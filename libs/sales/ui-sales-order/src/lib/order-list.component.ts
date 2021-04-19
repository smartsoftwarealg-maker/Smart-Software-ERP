import { Component, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {User, UserService} from '@ss/common/api-users';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LanguageService} from '@ss/common/ui-lang';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {SalesOrderService} from '@ss/sales/api-sales-order';
import {Transaction} from '@ss/logistics/api-transaction';
import {PayMethodService} from '@ss/logistics/api-logistics-common';

@Component({
  selector: 'ss-ui-order',
  templateUrl: './order-list.component.html',
  styleUrls: ['../../../../common/assets/src/assets/transac-list.scss']
})
export class OrderListComponent  extends BaseEntityListComponent<Transaction> {
    public dealers: { [id: number]: string; };
    public agents: { [id: number]: string; } = {};

    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        'reference',
        'referenceDocDate',
    ];


    constructor(
        public orderService: SalesOrderService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public usersService: UserService,
        public agentService: AgentService,
        public langServ: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        private payMethodSrv: PayMethodService) {
        super(orderService, shellSrv, snackBarSrv, route, router, confirmationSrv, 'SALES_ORDER');
    }


    processLoadedData(data: Transaction[]): Observable<Transaction[]> {
        return this.agentService.getByIDList(data.map(x => x.agent))
            .pipe(
                tap(x => x.forEach(e => this.agents[e.id] = e.denomination)),
                switchMap(() => {
                    const parsedData = data.map(x => {
                        x.date = this.langServ.formatDate(x.date);
                        x.referenceDocDate = this.langServ.formatDate(x.referenceDocDate);
                        return x;
                    });
                    return super.processLoadedData(parsedData);
                }));
    }

    onDealersLoaded(data: User[]): void {
        this.dealers = {};
        data.forEach(m => this.dealers[m.id] = m.fullName);
    }

    payModeDescription(id: number) {
        return this.payMethodSrv.getMethodDescription(id);
    }
}
