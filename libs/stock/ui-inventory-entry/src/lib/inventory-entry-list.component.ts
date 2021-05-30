import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {InventoryEntry, InventoryEntryService} from '@ss/stock/api-inventory-entry';
import {User, UserService} from '@ss/common/api-users';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LanguageService} from '@ss/common/ui-lang';
import {DefaultReportService} from '@ss/common/ui-default-report-component';

@Component({
    selector: 'ss-inventory-entry-list',
    templateUrl: './inventory-entry-list.component.html',
    styleUrls: ['../../../../common/assets/src/assets/transac-list.scss'],
})
export class InventoryEntryListComponent extends BaseEntityListComponent<InventoryEntry> {


    public dealers: { [id: number]: string; };

    displayedColumns = [
        'number',
        'date',
        'reference',
        'referenceDocDate',
        'dealer'
    ];


    constructor(
        public inventoryEntrySrv: InventoryEntryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public usersService: UserService,
        public langServ: LanguageService,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService) {
        super(inventoryEntrySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'STOCK_INVENTORY_ENTRY');
    }


    processLoadedData(data: InventoryEntry[]): Observable<InventoryEntry[]> {
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
