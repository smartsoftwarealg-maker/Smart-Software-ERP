import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { Location, LocationService } from '@ss/master-data/api-article';
import { BudgetService } from '@ss/budget/budget';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LoginService, PaginatorPersistenceService } from '@ss/common/api-common';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';
import {Observable, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DOC_RECEPTION } from '@ss/logistics/api-transaction';
import { OptionService } from '@ss/logistics/ui-options';

@Component({
    selector: 'ss-price-list',
    imports: [CommonModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable, PaginationComponent, TranslateDirective, MatHeaderCellDef, MatSort],
    templateUrl: './price-list-list.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './price-list-list.component.scss',
})
export class PriceListListComponent extends BaseEntityListComponent<Location> {
    #loginSrv = inject(LoginService);
    #optionSrv = inject(OptionService);

    displayedColumns = signal(['storeName', 'lotNumber', 'reference', 'description', 'price1', 'price2', 'price3']);
    constructor(
        public override entitySrv: LocationService,
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
            'STOCK_PRICE_LIST');
        this.pagination.pageSize = 15;
    }

    override preload():Observable<Location>{
        return this.#optionSrv
            .get(this.#loginSrv.appCtx.center)
            .pipe(
                tap(res => this.displayedColumns.update(v => v.filter(c => res.usesLots || c !== 'lotNumber'))),
                switchMap(() => super.preload()));
    }

}
