import {Component, OnInit,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LanguageService, UserService} from '@ss/common/api-common';
import {AgentService} from '@ss/logistics/api-agent';
import {DeliveryService} from '@ss/sales/api-delivery';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseTransactionListComponent} from '../../../../logistics/api-transaction/src/lib/base-transaction-list.component';

@Component({
    selector: 'ss-delivery-list',
    templateUrl: './delivery-list.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-list.scss'],
})
export class DeliveryListComponent extends BaseTransactionListComponent {
    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        'reference',
        'referenceDocDate',
    ];


    constructor(
        public deliverySrv: DeliveryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public userSrv: UserService,
        public agentSrv: AgentService,
        public langServ: LanguageService,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public payMethodSrv: PayMethodService) {
        super(deliverySrv, shellSrv, snackBarSrv, route, router, userSrv, agentSrv, langServ, confirmationSrv, defReportSrv, payMethodSrv, 'SALES_DELIVERY');
    }

    // processLoadedData(data: Transaction[]): Observable<Transaction[]> {
    //     return this.agentSrv.getByIDList(data.map(x => x.agent))
    //         .pipe(
    //             tap(x => x.forEach(e => this.agents[e.id] = e.denomination)),
    //             switchMap(() => {
    //             const parsedData = data.map(x => {
    //                 x.date = this.langServ.formatDate(x.date);
    //                 x.referenceDocDate = this.langServ.formatDate(x.referenceDocDate);
    //                 return x;
    //             });
    //             return super.processLoadedData(parsedData);
    //         }));
    // }
    //
    // onDealersLoaded(data: User[]): void {
    //     this.dealers = {};
    //     data.forEach(m => this.dealers[m.id] = m.fullName);
    // }

    payModeDescription(id: number) {
        return this.payMethodSrv.getMethodDescription(id);
    }
}
