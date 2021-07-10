import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ReceptionService} from '@ss/purchases/api-reception';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LanguageService, User, UserService} from '@ss/common/api-common';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {Transaction} from '@ss/logistics/api-transaction';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';

@Component({
    selector: 'ss-reception-list',
    styleUrls: ['../../../../common/assets/src/assets/transac-list.scss'],
    templateUrl: './reception-list.component.html'
})
export class ReceptionListComponent extends BaseEntityListComponent<Transaction> {


    public dealers: { [id: number]: string; };
    public agents: { [id: number]: string; };

    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        'reference',
        'referenceDocDate',
        'dealer'
    ];


    constructor(
        public receptionSrv: ReceptionService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public usersService: UserService,
        public agentService: AgentService,
        public langServ: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        private payMethodSrv: PayMethodService) {
        super(receptionSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'STOCK_RECEPTION');
    }


    processLoadedData(data: Transaction[]): Observable<Transaction[]> {
        return this.usersService.getAll(data.map((x: any) => x.delaer))
            .pipe(tap((x:any) => this.onDealersLoaded(x)))
            .pipe(switchMap(() => this.agentService.getAll(data.map(x => x.agent))))
            .pipe(tap((x:any) => this.onAgentsLoaded(x)))
            .pipe(switchMap(() => {
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

    onAgentsLoaded(data: Agent[]): void {
        this.agents = {};
        data.forEach(m => this.agents[m.id] = m.denomination);
    }

    payModeDescription(id: number) {
        return this.payMethodSrv.getMethodDescription(id);
    }
}
