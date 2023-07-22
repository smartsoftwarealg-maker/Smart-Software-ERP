import { Component, inject, OnInit } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { AssetTrigger } from '@ss/cmms/cmms-api';
import { AssetsService } from '@ss/assets-component';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { FormControl } from '@angular/forms';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { CMMSAssetTriggerService } from '../cmms-asset-trigger.service';

@Component({
    selector: 'ss-asset-trigger-list',
    templateUrl: './asset-trigger-list.component.html',
    styleUrls: ['./asset-trigger-list.component.css'],
})
export class AssetTriggerListComponent extends BaseEntityListComponent<AssetTrigger> implements OnInit {
    private assetSrv = inject(AssetsService);

    assetLookup = new DefaultAutoCompleteModel(this.assetSrv);
    assetCtrl = new FormControl<number>(0);

    displayedColumns = [
        'description',
        'amount'
    ];

    constructor(
        public override entitySrv: CMMSAssetTriggerService,
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
            'CMMS_TRIGGERS');
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
