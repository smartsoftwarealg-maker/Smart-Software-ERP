import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import {
    dateToYmdStr,
    MaterialModule,
    PaginatorPersistenceService,
} from '@ss/common/api-common';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';

import {
    FormBuilder,
    FormControl,
    ReactiveFormsModule,

} from '@angular/forms';
import {
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';

import { MatCheckbox } from '@angular/material/checkbox';
import { DecimalPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Turnover } from '../sales-discount-api.class';
import { SalesDiscountService } from '../sales-discount.service';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { Observable, of, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'ss-turnover-list',
    templateUrl: './sales-discount.component.html',
    styleUrls: ['./sales-discount.component.scss'],
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
        ReactiveFormsModule,
        MatCheckbox,
        DecimalPipe,
        MatButton,
        DatePickerComponent,
    ],
})
export class SalesDiscountComponent extends BaseEntityListComponent<Turnover> {
    #destroyRef = inject(DestroyRef);
    #fb = inject(FormBuilder);

    displayedColumns = [
        'year',
        'customerCode',
        'customerName',
        'amount',
        'rate',
        'generated',
        'select',
    ];
    filterForm = this.#fb.group({
        from: new FormControl<Date>(new Date()),
        to: new FormControl<Date>(new Date()),
    });
    selectedAgents = signal<number[]>([]);
    emptySelection = computed(() => this.selectedAgents().length < 1);

    constructor(
        public override entitySrv: SalesDiscountService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'SALES_REBATES',
        );
    }

    override ngOnInit() {
        super.ngOnInit();
        this.filterForm.valueChanges.pipe(
            takeUntilDestroyed(this.#destroyRef),
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(() => this.refresh());
    }

    override getPage(): Observable<Turnover[]> {
        const f: Date = this.filterForm?.value?.from;
        const t: Date = this.filterForm?.value?.to;

        if (!f || !t) {
            return of([]);
        }

        const from = dateToYmdStr(f);
        const to = dateToYmdStr(t);

        return this.entitySrv.getTurnover(from, to);
    }

    toggleSelection(row: Turnover, checked: boolean) {
        const id = row?.agentId;
        if (checked) {
            this.selectedAgents.update((ids) => [...ids, id]);
        } else {
            this.selectedAgents.update((ids) => ids.filter((i) => i !== id));
        }
    }

    toggleAll(checked: boolean) {
        if (checked) {
            this.selectedAgents.update(() => this.data.filter(d => d.generated < 0.01).map((d) => d.agentId));
        } else {
            this.selectedAgents.update(() => []);
        }
    }

    generate() {
        const filter = this.filterForm.getRawValue();
        const payload = {
            from: filter.from,
            to: filter.to,
            agents: this.selectedAgents(),
        };

        this.confirmationSrv
            .confirm('SALES_REBATES', 'SALES_GENERATE_REBATES')
            .pipe(switchMap((res) => res ? this.entitySrv.generate(payload) : of({ count: 0 })))
            .subscribe({
                next: (res) => {
                    if (res.count > 0) {
                        this.snackBarSrv.showSuccessMessage();
                    }
                    this.refresh();
                },
                error: () => {
                    this.snackBarSrv.showFailureMessage();
                },
            });
    }
}
