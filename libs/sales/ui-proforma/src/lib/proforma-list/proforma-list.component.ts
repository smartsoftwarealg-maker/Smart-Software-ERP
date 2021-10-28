import { Component, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LanguageService, User, UserService} from '@ss/common/api-common';
import {AgentService} from '@ss/logistics/api-agent';
import {Transaction} from '@ss/logistics/api-transaction';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {SalesProformaService} from "../sales-proforma.service";

@Component({
    selector: 'ss-proforma',
    templateUrl: './proforma-list.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-list.scss']
})
export class ProformaListComponent  extends BaseEntityListComponent<Transaction> {
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
        public orderService: SalesProformaService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        // public usersService: UserService,
        public agentService: AgentService,
        public langServ: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        private payMethodSrv: PayMethodService) {
        super(orderService, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'LOGISTICS_PROFORMA');
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
