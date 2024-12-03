import { Component, inject, OnInit } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { CMMSAssetReadingService } from '../cmms-asset-reading.service';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { AssetsService } from '@ss/assets-component';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { AssetReading } from '@ss/cmms/cmms-api';
import { CommonModule } from "@angular/common";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-asset-reading-list',
    templateUrl: './asset-reading-list.component.html',
    styleUrls: ['./asset-reading-list.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MatSortModule,
        MatTableModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        PaginationComponent,
        UiAutoCompleteComponent
    ]
})
export class AssetReadingListComponent extends BaseEntityListComponent<AssetReading> implements OnInit {
    private assetSrv = inject(AssetsService);

    assetLookup = new DefaultAutoCompleteModel(this.assetSrv);
    assetCtrl = new FormControl<number>(0);

    displayedColumns = [
        'meterDescription',
        'date',
        'amount'
    ];

    constructor(
        public override entitySrv: CMMSAssetReadingService,
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
            'CMMS_READINGS');
        this.pagination.pageSize = 15;
    }

    override select(id: number) {
        super.select(id);
        this.editButton.visible = id > 0;
    }

    override ngOnInit() {
        this.addButton.visible = false;
        this.editButton.visible = false;
        super.ngOnInit();
        this.assetCtrl.setValue(this.entitySrv.getParentId());
        this.subscriptions
            .push(
                this.assetCtrl
                    .valueChanges
                    .subscribe(value => {
                        this.entitySrv.setParentId(value || 0);
                        this.addButton.visible = value > 0;
                        this.entitySrv.getPage(this.pagination).subscribe(res => this.data = res);
                    })
            );
    }
}
