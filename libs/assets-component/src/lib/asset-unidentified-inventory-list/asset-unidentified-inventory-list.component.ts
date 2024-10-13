import { Component, inject, OnInit } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { AssetInventory, AssetInventoryDoc, UnidentifiedInventory } from '../assets-api';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { AssetInventoryService } from '../services/asset-inventory.service';
import { AccPoliciesService } from '@ss/accounting/accounting-api';
import { Observable, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { InventoryImportComponent } from '../inventory-import/inventory-import.component';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';

import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { AppArchiveModule } from '@ss/common/app-archive';
import { QRCodeModule } from 'angularx-qrcode';
import { AssetUnidentifiedInventoryService } from '../services/asset-unidentified-inventory.service';
import { AssetInventoryDocService } from '../services/asset-inventory-doc.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'ss-asset-unidentified-inventory-list',
    templateUrl: './asset-unidentified-inventory-list.component.html',
    styleUrls: ['./asset-unidentified-inventory-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,

        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,
        AppArchiveModule,
        QRCodeModule
    ]

})
export class AssetUnidentifiedInventoryListComponent extends BaseEntityListComponent<UnidentifiedInventory> implements OnInit {
    #inventoryDocSrv = inject(AssetInventoryDocService);

    inventoryDocLookup = new DefaultAutoCompleteModel(this.#inventoryDocSrv);
    inventoryDocCtrl = new FormControl<number>(0);

    displayedColumns = [
        'creationDate',
        'buildingDescription',
        'classDescription',
        'count'
    ];

    constructor(
        public override entitySrv: AssetUnidentifiedInventoryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'ASSET_UNIDENTIFIED_INVENTORY');
        this.inventoryDocLookup.onObjectSelected = o => this.onDocument(o);
        this.inventoryDocCtrl.setValue(entitySrv.getParentId()||0);
    }

    private onDocument(o: AssetInventoryDoc) {
        this.entitySrv.setParentId(o?.id||0);
        this.refresh();
    }
}
