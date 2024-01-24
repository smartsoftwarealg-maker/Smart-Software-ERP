import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CReport } from '@ss/costing/costing-utils';
import { CostingReportService } from '../services/costing-report.service';

@Component({
    selector: 'ss-costing-reports',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        CommonUiConfirmationDialogModule,
        UiPaginationModule,
        CommonUiLangModule
    ],
    templateUrl: './costing-reports.component.html',
    styleUrl: './costing-reports.component.css',
})
export class CostingReportsComponent implements OnInit {
    private reportSrv = inject(CostingReportService);
    report = signal<CReport|null>(null);

    ngOnInit(): void {
        this.reportSrv
            .getReport()
            .subscribe(res => this.report.set(res));
    }
}
