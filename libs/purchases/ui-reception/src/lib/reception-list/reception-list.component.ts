import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { Transaction } from '@ss/logistics/api-transaction';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ReceptionService } from '@ss/purchases/api-reception';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from '@ss/common/ui-datepicker';


import { UiStockInfoComponent } from '@ss/logistics/ui-stock-info';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-reception-list',
    styleUrls: ['../../../../../common/assets/src/assets/transac-list.scss'],
    templateUrl: './reception-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        DatePickerComponent,

        TranslateDirective,
        DocInfoComponent,
        PaginationComponent
    ]
})
export class ReceptionListComponent extends BaseEntityListComponent<Transaction> {

    displayedColumns = [
        'number',
        'date',
        'agent',
        'payMethod',
        'reference',
        'referenceDocDate',
        'dealer',
        'docStatus'
    ];

    constructor(
        public inventorySrv: ReceptionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(inventorySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'COMMON_RECEPTION');
    }
}
