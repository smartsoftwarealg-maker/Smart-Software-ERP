import {Component} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Formula} from './payroll-formulas-api';
import {ElementsInfoService} from '@ss/remuneration/elementsinfo';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {PayrollFormulasService} from './payroll-formulas.service';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '../../../../common/ui-lang/src/lib/translate.directive';
import { PaginationComponent } from '../../../../common/ui-pagination/src/lib/pagination.component';

@Component({
    selector: 'ss-formula-list',
    templateUrl: './formula-list.component.html',
    styleUrls: ['./formula-list.component.scss'],
    standalone: true,
    imports: [MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent]
})
export class FormulaListComponent extends BaseEntityListComponent<Formula> {
    displayedColumns = [
        'variable',
        'description',
        'base',
        'rate',
        'formula',
        'accountno',
        'followup_fld',
        'val_sign'
    ];

    constructor(
        public listSrv: PayrollFormulasService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(listSrv,
              shellSrv,
              snackBarSrv,
              route,
              router,
              confirmationSrv,
              defReportSrv,
              pagPersistSrv,
            'REMUN_FORMULAS');
        this.pagination.pageSize = 10;
    }
}
