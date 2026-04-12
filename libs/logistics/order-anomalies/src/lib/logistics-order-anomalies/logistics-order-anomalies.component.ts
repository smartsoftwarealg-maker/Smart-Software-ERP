import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { OrderAnomaly } from './api-order-anomalies';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { OrderAnomaliesService } from './order-anomalies.service';


import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import { Observable, tap } from 'rxjs';

@Component({
    selector: 'ss-logistics-order-anomalies',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,

        ReactiveFormsModule,
        PaginationComponent,
    ],
    templateUrl: './logistics-order-anomalies.component.html',
    styleUrl: './logistics-order-anomalies.component.css',
})
export class LogisticsOrderAnomaliesComponent
    extends BaseEntityListComponent<OrderAnomaly>
    implements OnInit
{
    public fixButton: ToolbarButton = {
        icon: 'fa-solid fa-check-double',
        label: 'STOCK_FIX',
        disabled: false,
        visible: false,
        keepOnToolbar: KeepOnToolbar.ALWAYS,
        click: () => this.fix(),
    };

    displayedColumns = [
        'reference',
        'description',
        'qtyOrdered',
        'qtySatisfied',
    ];

    constructor(
        public override entitySrv: OrderAnomaliesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'LOGISTICS_ORDER_ANOMALIES',
        );
    }

    protected override preInit(): Observable<unknown> {
        return super.preInit().pipe(
            tap(() => {
                this.addButton.visible = false;
                this.editButton.visible = false;
                this.deleteButton.visible = false;
            }),
        );
    }

    protected override postInit(): Observable<unknown> {
        return super
            .postInit()
            .pipe(tap(() => this.shellSrv.addButton(this.fixButton)));
    }

    private fix() {
        this.entitySrv.fix().subscribe((res) => {
            if (res.count) {
                this.snackBarSrv.showSuccessMessage();
                this.refresh();
            }
        });
    }

    override refresh() {
        super.refresh(() => (this.fixButton.visible = this.data.length > 0));
    }
}
