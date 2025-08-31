import {Component} from '@angular/core';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { Transaction } from '@ss/logistics/api-transaction';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { DatePipe } from '@angular/common';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { ProductionService } from '../production-services/production.service';

@Component({
    selector: 'ss-production-list',
    templateUrl: './production-list.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-list.scss'],
    standalone: true,
    imports: [
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    TranslateDirective,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    PaginationComponent,
    DocInfoComponent,
    DatePipe,
    TranslateDirective
],
})
export class ProductionListComponent extends BaseEntityListComponent<Transaction> {
    // private doubleCheckBtn: ToolbarButton = {
    //     disabled: true,
    //     icon: 'fa-solid fa-check-double',
    //     keepOnToolbar: KeepOnToolbar.DYNAMIC,
    //     label: 'PROD_PRODUCE_ALL',
    //     visible: true,
    //     click: () => this.produceAll()
    // };
    //
    // private doubleCancelBtn: ToolbarButton = {
    //     disabled: true,
    //     icon: 'fa-solid fa-xmark-large',
    //     keepOnToolbar: KeepOnToolbar.DYNAMIC,
    //     label: 'PROD_CANCEL_ALL',
    //     visible: true,
    //     click: () => this.cancelAll()
    // };
    //
    displayedColumns = [
        'number',
        'date',
        'dealer',
        'reference',
        'referenceDocDate',
        'docStatus'
    ];

    constructor(
        public override entitySrv: ProductionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'PROD_PRODUCTIONS');
    }

    // override ngOnInit() {
    //     super.ngOnInit();
    //     this.shellSrv.addButton(this.doubleCheckBtn)
    //     this.shellSrv.addButton(this.doubleCancelBtn)
    // }

    // private produceAll() {
    //     this.entitySrv
    //         .produceAll(this.selected)
    //         .subscribe(res => {
    //             if (res.count > 0) {
    //                 this.snackBarSrv.showSuccessMessage();
    //             }
    //         });
    // }
    //
    // private cancelAll() {
    //     this.entitySrv
    //         .cancelAll(this.selected)
    //         .subscribe(res => {
    //             if (res.count > 0) {
    //                 this.snackBarSrv.showSuccessMessage();
    //             }
    //         });
    // }

    // override selectRow(row: Transaction) {
    //     super.selectRow(row);
    //     this.doubleCancelBtn.disabled = this.doubleCheckBtn.disabled = row?.id == null;
    // }
}
