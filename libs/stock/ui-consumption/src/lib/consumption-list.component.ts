import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Consumption, ConsumptionService} from '@ss/stock/api-consumption';
import {User, UserService} from '@ss/common/api-users';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LanguageService} from '@ss/common/ui-lang';
import {Agent, AgentService} from '@ss/logistics/api-agent';

@Component({
    selector: 'ss-consumption-list',
    styleUrls: ['../../../../common/assets/src/assets/transac-list.scss'],
    templateUrl: './consumption-list.component.html'
})
export class ConsumptionListComponent extends BaseEntityListComponent<Consumption> {


    public dealers: { [id: number]: string; };
    public agents: { [id: number]: string; };

    displayedColumns = [
        'number',
        'date',
        'reference',
        'referenceDocDate',
        'dealer',
        'agent'
    ];


    constructor(
        public consumptionSrv: ConsumptionService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public usersService: UserService,
        public agentService: AgentService,
        public langServ: LanguageService,
        public confirmationSrv: ConfirmationDialogService) {
        super(consumptionSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'STOCK_CONSUMPTION');
    }


    processLoadedData(data: Consumption[]): Observable<Consumption[]> {
        return this.usersService.getAll(data.map(x => x.dealer))
            .pipe(tap(x => this.onDealersLoaded(x)))
            .pipe(switchMap(() => this.agentService.getAll(data.map(x => x.agent))))
            .pipe(tap(x => this.onAgentsLoaded(x)))
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

}
