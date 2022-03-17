import { Component } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Anomaly} from "./anomaly.interface";
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {AnomalyService} from './anomaly.service';
import {tap} from 'rxjs';
import {PaginatorPersistenceService} from '@ss/common/api-common';

@Component({
  selector: 'ss-inventory-anomalies',
  templateUrl: './inventory-anomalies.component.html',
  styleUrls: ['./inventory-anomalies.component.scss']
})
export class InventoryAnomaliesComponent extends BaseEntityListComponent<Anomaly> {
    private fixButton: ToolbarButton = {
        disabled: false,
        icon: 'fas fa-debug',
        label: 'STOCK_FIX',
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        visible: true,
        click: () => this.fixAnomalies(),
    }

    displayedColumns = [
        'store',
        'reference',
        'description',
        'computedStock',
        'actualStock',
        'diff'
    ];

    public constructor(
        public anomalySrv: AnomalyService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(anomalySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'STOCK_ANOMALIES');
        this.deleteButton.visible = false;
        this.addButton.visible = false;
        this.editButton.visible = false;
    }

    fixAnomalies() {
        this.anomalySrv
            .fix()
            .pipe(tap(res => {
                if (res.count > 0) {
                    this.refresh();
                }
            }))
            .subscribe(res => {
                if (res.count > 0) {
                    this.snackBarSrv.showSuccessMessage();
                }
            });
    }

    ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.fixButton);
        this.deleteButton.visible = false;
        this.editButton.visible = false;
        this.addButton.visible = false;
    }
}
