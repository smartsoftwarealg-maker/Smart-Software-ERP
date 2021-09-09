import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from "@ss/common/ui-base-entity";
import {Payment} from "../services/payment.class";
import {AgentService} from "@ss/logistics/api-agent";
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {DefaultReportService} from "@ss/common/ui-default-report-component";
import {LookupsService} from "@ss/common/api-lookup";
import {PaymentsListService} from "../services/payments-list.service";
import {map, Observable} from "rxjs";

@Component({
  selector: 'ss-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss',
              '../../../../../common/assets/src/assets/main-container.scss']
})
export class PaymentsListComponent extends BaseEntityListComponent<Payment> {
    displayedColumns = [
        'date',
        'denomination',
        'number',
        'debit',
        'credit'
    ];

    constructor(
        private agentSrv: AgentService,
        public paymentSrv: PaymentsListService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService) {
        super(paymentSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'LOGISTICS_PAYMENTS');
    }

    processLoadedData(data: Payment[]): Observable<Payment[]> {
        return this.agentSrv
            .getByIDList(data.map(e => e.agent))
            .pipe(map(res => {
                data.forEach(e => e.denomination = res.find(a => a.id === e.agent)?.denomination)
                return data;
            }));
    }
}
