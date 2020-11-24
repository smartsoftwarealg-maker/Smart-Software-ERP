import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {InventoryEntry, InventoryEntryService} from "@ss/stock/api-inventory-entry";
import {Observable} from "rxjs";
import {CCGroup, LookupsService} from "@ss/common/api-lookup";
import {tap} from "rxjs/operators";

@Component({
    selector: 'ss-inventory-entry-list',
    styleUrls: ['./inventory-entry-list.component.scss'],
    templateUrl: './inventory-entry-list.component.html'
})
export class InventoryEntryListComponent extends BaseEntityListComponent<InventoryEntry> {


    public ccGroups: { [id: number]: string; };

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
        public lookupSrv: LookupsService,
        public confirmationSrv: ConfirmationDialogService) {
        super(inventoryEntrySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'STOCK_INVENTORY_ENTRY');
    }



    preload(): Observable<any> {
        return this.lookupSrv.getCCGroups()
            .pipe(
                tap(x => this.onCCGroupsLoaded(x)),
            );
    }

    onCCGroupsLoaded(data: CCGroup[]): void {
        this.ccGroups = {};
        data.forEach(m => this.ccGroups[m.id] = m.description);
    }
}
