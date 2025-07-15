import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpService, LanguageService } from '@ss/common/api-common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ClosedPeriod } from '@ss/accounting/accounting-api';
import { ClosedPeriodsService } from '../closed-periods.service';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
} from '@angular/material/table';
import { MatCheckbox } from '@angular/material/checkbox';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-acc-closed-periods',
    imports: [
        CommonModule,
        MatCell,
        MatCellDef,
        MatCheckbox,
        MatColumnDef,
        MatHeaderCell,
        MatTable,
        MatHeaderCellDef,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        TranslateDirective
    ],
    templateUrl: './acc-closed-periods.component.html',
    styleUrl: './acc-closed-periods.component.scss',
    standalone: true,
})
export class AccClosedPeriodsComponent implements OnInit {
    private route = inject(ActivatedRoute);
    public httpSrv = inject(HttpService);
    public shellSrv = inject(ShellService);
    public snackBarSrv = inject(SnackBarService);
    public closedPeriodSrv = inject(ClosedPeriodsService);
    public langSrv = inject(LanguageService);

    public data: ClosedPeriod[];
    private selectedRow: ClosedPeriod;

    public displayedColumns = ['period', 'closed'];

    ngOnInit() {
        this.shellSrv.setTitle('ACC_CLOSED_PERIODS');
        this.shellSrv.setGoBackPath('..', this.route);
        this.closedPeriodSrv.list().subscribe({
            next: (res) => {
                this.data = res;
            },
        });
    }

    closePeriod(closed: boolean) {
        this.selectedRow.closed = closed;
        this.closedPeriodSrv.closeP(this.selectedRow).subscribe({
            next: () => {
                this.snackBarSrv.showSuccessMessage();
            },
            error: () => {
                this.snackBarSrv.showFailureMessage();
            },
        });
    }

    selectRow(row: ClosedPeriod) {
        this.selectedRow = row;
    }
}
