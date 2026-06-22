import { Component, signal, ChangeDetectionStrategy, inject, computed} from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Anomaly } from './anomaly.interface';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { AnomalyService } from './anomaly.service';
import { Observable, switchMap, tap } from 'rxjs';
import {LoginService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule } from '@angular/forms';

import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import {Option, OptionService} from "@ss/logistics/ui-options";

@Component({
    selector: 'ss-inventory-anomalies',
    templateUrl: './inventory-anomalies.component.html',
    styleUrls: ['./inventory-anomalies.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        RouterModule,
        PaginationComponent
    ]

})
export class InventoryAnomaliesComponent extends BaseEntityListComponent<Anomaly> {
    protected loginSrv  =  inject(LoginService);
    private optionSrv = inject(OptionService);
    private fixButton: ToolbarButton = {
        disabled: false,
        icon: 'fas fa-debug',
        label: 'STOCK_FIX',
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        visible: true,
        click: () => this.fixAnomalies()
    };

    displayedColumns = ([
        'store',
        'lot',
        'reference',
        'description',
        'computedStock',
        'actualStock',
        'diff'
    ]);
    selectedReference = computed(() => this.selectedRow()?.reference||'');

    public constructor(
        public anomalySrv: AnomalyService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(anomalySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'STOCK_ANOMALIES');
        // this.deleteButton.visible = false;
        // this.addButton.visible = false;
        // this.editButton.visible = false;
        this.pagination.pageSize = 15;
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

    protected override preInit(): Observable<unknown> {
        return super
            .preInit()
            .pipe(tap(() => {
                this.deleteButton.visible = false;
                this.editButton.visible = false;
                this.addButton.visible = false;
                this.excelButton.visible = false;
            }),
                switchMap(() => this.optionSrv.get(this.loginSrv.appCtx.center)),
                tap((res: Option) => this.displayedColumns = this.displayedColumns.filter(e => res.usesLots || e !== 'lot'))
            );
    }

    protected postInit():Observable<unknown>{
        return  super.postInit()
            .pipe(tap(() => this.shellSrv.addButton(this.fixButton)));
    }
}
