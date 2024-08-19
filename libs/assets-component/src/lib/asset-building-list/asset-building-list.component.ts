import { Component, inject, Input, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { AssetBuilding, AssetLocation } from '../assets-api';
import { AssetsBuildingService } from '../services/assets-building.service';
import { AssetLocationService } from '../services/asset-location.service';
import { FormControl } from '@angular/forms';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { AppArchiveModule } from '@ss/common/app-archive';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
    selector: 'ss-asset-building-list',
    templateUrl: './asset-building-list.component.html',
    styleUrls: ['./asset-building-list.component.scss'],
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
export class AssetBuildingListComponent extends BaseEntityListComponent<AssetBuilding> {
    private locationSrv = inject(AssetLocationService);

    locationLookup = new DefaultAutoCompleteModel(this.locationSrv);
    locationCtrl = new FormControl<number>(0);

    displayedColumns = [
        // 'location',
        'code',
        'description'
    ];

    constructor(
        public override entitySrv: AssetsBuildingService,
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
            'ASSET_BUILDINGS');
        this.title = this.route.snapshot?.data['title'] || this.title;
        if (!this.entitySrv.getParentId()) {
            this.entitySrv.setParentId(0);
        }
        this.locationLookup.onObjectSelected = e => this.onLocation(e);
    }

    onLocation(location: AssetLocation) {
        this.entitySrv.setParentId(location?.id);
        this.refresh();
    }

    override ngOnInit() {
        super.ngOnInit();
        this.locationCtrl.setValue(this.entitySrv.getParentId());
    }
}
