import { Component } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { AssetInventoryDoc } from '../assets-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DefaultReportService} from '@ss/common/ui-default-report-component';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { IsParamService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { MatDialog} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { AppArchiveModule } from '@ss/common/app-archive';
import { QRCodeModule } from 'angularx-qrcode';
import { AssetInventoryDocService } from '../services/asset-inventory-doc.service';

@Component({
    selector: 'ss-assets-inventory-doc-list',
    templateUrl: './assets-inventory-doc-list.component.html',
    styleUrls: ['./assets-inventory-doc-list.component.scss'],
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
    ]
})
export class AssetsInventoryDocListComponent extends BaseEntityListComponent<AssetInventoryDoc> {

    displayedColumns = [
        'description',
        'creationDate',
        'locationDescription',
        'buildingDescription',
        'officeDescription',
        'closed'
    ];


    constructor(public listSrv: AssetInventoryDocService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override defReportSrv: DefaultReportService,
                public override confirmationSrv: ConfirmationDialogService,
                public override pagPersistSrv: PaginatorPersistenceService,
                private dialog: MatDialog,
                private isParamSrv: IsParamService) {
        super(listSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'ASSET_INVENTORY_DOCUMENT');
        this.pagination.pageSize = 10;
    }
}
