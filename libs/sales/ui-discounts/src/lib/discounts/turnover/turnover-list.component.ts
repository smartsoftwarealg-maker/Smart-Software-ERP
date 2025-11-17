import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { LoginService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';

import { FormBuilder, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';

import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { DecimalPipe, NgForOf, NgIf, PercentPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Turnover } from '../turnover-api.class';
import { TurnoverService } from '../turnover.service';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { of } from 'rxjs';



@Component({
    selector: 'ss-turnover-list',
    templateUrl: './turnover-list.component.html',
    styleUrls: ['./turnover-list.component.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MaterialModule,
        MatSortHeader,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        TranslateDirective,
        PaginationComponent,
        MatFormFieldModule,
        MatLabel,
        MatInput,
        ReactiveFormsModule,
        MatCheckbox,
        DecimalPipe,
        PercentPipe,
        MatButton,
        NgIf,
        DatePickerComponent,
        MatSelect,
        MatOption,
        NgForOf
    ]
})
export class TurnoverListComponent extends BaseEntityListComponent<Turnover> {
    displayedColumns = ['year', 'customerCode', 'customerName', 'amount', 'rate', 'generated', 'select'];
    public filterForm: UntypedFormGroup | null = null;
    agents: any[] = [];

    constructor(
        public override entitySrv: TurnoverService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService,
        private fb: FormBuilder
    ) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'ACC_TURNOVER');

        this.filterForm = this.fb.group({
            from: [null],
            to: [null],
        });
    }

    override getPage() {
        const f = this.filterForm?.value?.from;
        const t = this.filterForm?.value?.to;

        if (!f || !t) {
            return of([]);
        }

        const from = this.formatDate(f);
        const to = this.formatDate(t);

        return this.entitySrv.getTurnover(from, to);
    }
    private formatDate(d: any): string {
        const D = new Date(d);
        return D.toISOString().split('T')[0];
    }


    toggleSelection(row: any, checked: boolean) {
        // uncheck all other rows
        this.data.forEach(r => r.select = false);

        // set this one as selected
        row.select = checked;

        // update selectedRow used by Generate
        this.selectedRow = checked ? row : null;
    }

    generate() {
        if (!this.selectedRow) {
            return;
        }
        const payload = {
            from: this.filterForm?.value.from,
            to: this.filterForm?.value.to,
            agents: [this.selectedRow.agentId]
        };
        if (!payload.from || !payload.to) {
            this.snackBarSrv.showFailureMessage('Select Period First');
            return;
        }
        this.shellSrv.setLoading(true);
        this.entitySrv.generate(payload).subscribe({
            next: () => {
                this.snackBarSrv.showSuccessMessage();
                this.shellSrv.setLoading(false);
                this.refresh();
            },
            error: () => {
                this.snackBarSrv.showFailureMessage('Generation failed');
                this.shellSrv.setLoading(false);
            }
        });
    }
}
