import {Component, OnInit} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {AssetInventory} from '../assets-api';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LoginService, PaginatorPersistenceService} from '@ss/common/api-common';
import {AssetInventoryService} from '../services/asset-inventory.service';
import {AccPoliciesService} from '@ss/accounting/accounting-api';
import {Observable, switchMap} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {InventoryImportComponent} from '../inventory-import/inventory-import.component';

@Component({
  selector: 'ss-asset-inventory-list',
  templateUrl: './asset-inventory-list.component.html',
  styleUrls: ['./asset-inventory-list.component.scss']
})
export class AssetInventoryListComponent extends BaseEntityListComponent<AssetInventory> implements OnInit {
    private importBtn: ToolbarButton = {
        disabled: false,
        icon: 'fa-solid fa-syringe',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_DOCUMENT',
        visible: true,
        click: () => this.importDocument(),
    }


    displayedColumns = [
        'officeDescription',
        'assetDescription',
        'date',
        'statusDescription'
    ];

    constructor(
        public override entitySrv: AssetInventoryService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService,
        private loginSrv: LoginService,
        private policySrv: AccPoliciesService,
        private dialog: MatDialog) {
        super(entitySrv,
              shellSrv,
              snackBarSrv,
              route,
              router,
              confirmationSrv,
              defReportSrv,
              pagPersistSrv,
              'INVENTORY');
    }

    override preload(): Observable<any> {
        return this.loginSrv
            .loadContext()
            .pipe(switchMap(_ => this.policySrv.get(this.loginSrv.appCtx.center)),
                  tap(res => this.entitySrv.setParentId(res.inventoryYear)));
    }

    private importDocument() {
        if (!this.importBtn.disabled) {
            const dialogRef = this.dialog.open(InventoryImportComponent, {
                width: '600px',
                height: '420px',
                disableClose: true,
            });

            dialogRef
                .afterClosed()
                .subscribe(result => {
                    if (result && result['count']) {
                        this.refresh();
                        this.snackBarSrv.showMessage('COMMON_SUCCESS');
                    } else {
                        this.snackBarSrv.showFailureMessage();
                    }

                    this.shellSrv.setLoading(false);
                });
        }
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.importBtn);
    }
}
