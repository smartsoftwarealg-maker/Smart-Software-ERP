import { Component, inject } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Formula} from './payroll-formulas-api';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { HttpService, PaginatorPersistenceService } from '@ss/common/api-common';
import {PayrollFormulasService} from './payroll-formulas.service';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import {PayrollMonthService} from "@ss/remuneration/payroll-month";

@Component({
    selector: 'ss-formula-list',
    templateUrl: './formula-list.component.html',
    styleUrls: ['./formula-list.component.scss'],
    standalone: true,
    imports: [MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent]
})
export class FormulaListComponent extends BaseEntityListComponent<Formula> {
    private monthSelectorSrv  = inject(PayrollMonthService);
    private generateBtn: ToolbarButton = {
        disabled: false,
        icon: 'fa-solid fa-grid-2-plus',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'COMMON_GENERATE',
        visible: false,
        click: () => this.generate()
    };

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.generateBtn);
        this.monthSelectorSrv
            .isUpdatableMonth()
            .subscribe(upd => {
                this.deleteButton.visible = upd;
                this.addButton.visible = upd;
            });
    }

    override finishLoading(data: Formula[]) {
        super.finishLoading(data);
        this.generateBtn.visible = data.length == 0;
    }

    httpSrv = inject(HttpService)

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

    private generate(){
        this.httpSrv.post('/payroll/generate-formulas', {}).subscribe({
            next: () => {
                this.refresh()
            },
            error: error => {
                this.snackBarSrv.showFailureMessage();
                throw error;
            }
        })
    };
}
