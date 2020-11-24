import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {CCGroup, LookupsService} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {InventoryEntry, InventoryEntryService} from "@ss/stock/api-inventory-entry";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";


@Component({
    selector: 'ss-inventory-entry-detail',
    styleUrls: ['./inventory-entry-detail.component.scss'],
    templateUrl: './inventory-entry-detail.component.html'
})
export class InventoryEntryDetailComponent extends BaseEntityDetailComponent<InventoryEntry> {

    public groups: CCGroup[];

    constructor(
        public inventoryEntryService: InventoryEntryService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(inventoryEntryService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_EDIT_AGENT_PRICE');
    }


    preload(): Observable<any> {
        return this.lookupsSrv.getCCGroups()
            .pipe(tap(x => this.groups = x))
    }

    public setupForm(b: InventoryEntry) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            date: [b.date, Validators.required],
            number: [b.number, Validators.required],
            reference: [b.reference],
            referenceDocDate: [b.referenceDocDate],
            header: [b.header],
            footer: [b.footer],
            dealer: [b.dealer]
        });
    }

}
