import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryExit, InventoryExitService} from '@ss/stock/api-inventory-exit';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LanguageService} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {User} from '@ss/common/api-common';
import {UserListService} from '@ss/common/api-users';

@Component({
    selector: 'ss-inventory-exit-list',
    styleUrls: ['../../../../common/assets/src/assets/transac-list.scss'],
    templateUrl: './inventory-exit-list.component.html'
})
export class InventoryExitListComponent extends BaseEntityListComponent<InventoryExit> {


    public dealers: { [id: number]: string; };

    displayedColumns = [
        'number',
        'date',
        'reference',
        'referenceDocDate',
        'dealer'
    ];


    constructor(
        public inventoryExitSrv: InventoryExitService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public usersService: UserListService,
        public langServ: LanguageService,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService) {
        super(inventoryExitSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'STOCK_INVENTORY_EXIT');
    }


    processLoadedData(data: InventoryExit[]): Observable<InventoryExit[]> {
        return this.usersService.getAll(data.map(x => x.dealer))
            .pipe(tap(x => this.onDealersLoaded(x)))
            .pipe(switchMap(() => {
                const parsedData = data.map(x => {
                    x.date = this.langServ.formatDate(x.date);
                    x.referenceDocDate = this.langServ.formatDate(x.referenceDocDate);
                    return x;
                });
                return super.processLoadedData(parsedData);
            }))
    }

    onDealersLoaded(data: User[]): void {
        this.dealers = {};
        data.forEach(m => this.dealers[m.id] = m.fullName);
    }

}
