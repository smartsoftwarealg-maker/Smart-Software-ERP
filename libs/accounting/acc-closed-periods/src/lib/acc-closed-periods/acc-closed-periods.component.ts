import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';

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
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true,
})
export class AccClosedPeriodsComponent implements OnInit {
    private route = inject(ActivatedRoute);
    public httpSrv = inject(HttpService);
    public shellSrv = inject(ShellService);
    public snackBarSrv = inject(SnackBarService);
    public closedPeriodSrv = inject(ClosedPeriodsService);
    public langSrv = inject(LanguageService);

    public data = signal<ClosedPeriod[]>([]);
    private selectedRow: ClosedPeriod;

    public readonly displayedColumns = (['period', 'closed']);

    ngOnInit() {
        this.shellSrv.setTitle('ACC_CLOSED_PERIODS');
        this.shellSrv.setGoBackPath('..', this.route);
        this.closedPeriodSrv
            .list()
            .subscribe({
            next: (res) => {
                this.data.set(res);
            },
        });
    }

    closePeriod(closed: boolean) {
        this.selectedRow.closed = closed;
        this.closedPeriodSrv
            .closePeriod(this.selectedRow)
            .subscribe({
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
