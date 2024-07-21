import { Component, inject } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { InventoryAsset } from '../assets-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { AppArchiveModule } from '@ss/common/app-archive';
import { QRCodeModule } from 'angularx-qrcode';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { Office, OfficeService } from '@ss/common/api-lookup';
import { FormControl } from '@angular/forms';
import { AssetListInventoryService } from '../services/asset-list-inventory.service';
import { OfficeSearchComponent } from '../office-search/office-search.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'ss-asset-list-inventory',
    templateUrl: './asset-list-inventory.component.html',
    styleUrls: ['./asset-list-inventory.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        CommonUiImageInputModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,
        AppArchiveModule,
        QRCodeModule
    ],
})
export class AssetListInventoryComponent extends BaseEntityListComponent<InventoryAsset> {
    private dialog = inject(MatDialog);
    private officeSrv = inject(OfficeService);

    officeLookup      = new DefaultAutoCompleteModel(this.officeSrv);
    officeCtrl = new FormControl<number>(0);
    displayedColumns = [
        'reference',
        'description',
        'recorded'
    ];

    constructor(public listSrv: AssetListInventoryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(listSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'INVENTORY');
        this.pagination.pageSize = 10;
        this.officeLookup.onObjectSelected = e => this.refreshData(e);
    }

    private refreshData(o: Office) {
        this.listSrv.setParentId(o.id||0);
        this.refresh();
    }

    update(e: InventoryAsset) {
        this.listSrv
            .update(e)
            .subscribe(res =>  e.inventoryId = e.inventoryId? null : res  );
    }

    openSearchDlg() {
        const dialogRef = this.dialog.open(OfficeSearchComponent,
            {
                width: '600px',
                height: '540px',
                data: {id: 0, description: null, cmms: false}
            });
        dialogRef
            .afterClosed()
            .subscribe(res => {
                const id = res?.id;
                this.officeCtrl.setValue(id);
                this.listSrv.setParentId(id);
                this.refresh();
            });
    }
}
