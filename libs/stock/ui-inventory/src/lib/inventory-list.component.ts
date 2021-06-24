import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryService} from '@ss/stock/api-inventory';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LanguageService, User, UserService} from '@ss/common/api-common';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {Transaction} from '@ss/logistics/api-transaction';
import {DefaultReportService} from '@ss/common/ui-default-report-component';

@Component({
    selector: 'ss-inventory-list',
    styleUrls: ['./inventory-list.component.scss'],
    templateUrl: './inventory-list.component.html'
})
export class InventoryListComponent extends BaseEntityListComponent<Transaction> {

    public dealers: { [id: number]: string; };

    displayedColumns = [
        'number',
        'date',
        'reference',
        'referenceDocDate',
        'dealer'
    ];


    constructor(
        public inventorySrv: InventoryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public usersService: UserService,
        public agentService: AgentService,
        public langServ: LanguageService,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService) {
        super(inventorySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'STOCK_INVENTORY');
    }


    processLoadedData(data: Transaction[]): Observable<Transaction[]> {
        return this.usersService.getAll(data.map(x => x.dealer))
            .pipe(tap((x:any) => this.onDealersLoaded(x)))
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



}
