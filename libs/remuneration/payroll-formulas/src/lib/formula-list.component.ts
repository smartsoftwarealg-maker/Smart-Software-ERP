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

@Component({
  selector: 'ss-formula-list',
  templateUrl: './formula-list.component.html',
  styleUrls: ['./formula-list.component.scss']
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
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public confirmationSrv: ConfirmationDialogService,
        public defReportSrv: DefaultReportService,
        public router: Router,
        public pagPersistSrv: PaginatorPersistenceService) {
        super(listSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'REMUN_ELEMETSINFO');
        this.pagination.pageSize = 15;
    }
}
