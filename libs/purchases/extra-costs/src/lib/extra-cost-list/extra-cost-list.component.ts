import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { ExtraCostService } from '../services/extra-cost.service';
import { PaginationModel } from '@ss/common/api-common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import {
    COST_TYPES,
    ExtraCost,
    VALUE_TYPES,
} from '@ss/logistics/api-transaction';
import { Sort, MatSort, MatSortHeader } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DecimalPipe, DatePipe } from '@angular/common';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
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
import { TranslateDirective } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-extra-costs-list',
    templateUrl: './extra-cost-list.component.html',
    styleUrls: ['./extra-cost-list.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        MatMiniFabButton,
        MatTooltip,
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        DecimalPipe,
        DatePipe,
        TranslatePipe,
    ],
})
export class ExtraCostListComponent implements OnInit {
    private snackBarSrv = inject(SnackBarService);
    private confirmationSrv = inject(ConfirmationDialogService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private entitySrv = inject(ExtraCostService);
    private shellSrv = inject(ShellService);

    selectedId = signal(0);
    paginator = PaginationModel.newInstance();
    data = signal<ExtraCost[]>([]);
    isEditable = signal(true);

    readonly displayedColumns = ([
        'reference',
        'description',
        'amount',
        'vat',
        'supplierName',
        'costName',
        'valueName',
    ]);

    constructor() {
        this.paginator.onChange = () => this.refresh();
        this.isEditable.set(this.shellSrv.getCurrentNodeRights().edit);
    }

    refresh() {
        this.entitySrv
            .getPage(this.paginator, this.shellSrv.getSearchText())
            .subscribe((next) => {
                this.data.set(next);
                next.forEach((d) => {
                    d.costName = COST_TYPES.find(
                        (t) => t.id === d.costType,
                    )?.description;
                    d.valueName = VALUE_TYPES.find(
                        (t) => t.id === d.valueType,
                    )?.description;
                });
            });
    }

    ngOnInit() {
        this.refresh();
    }

    select(id: number) {
        this.selectedId.set(id);
    }

    sort(event: Sort) {
        this.entitySrv.sortColumn = event;
        this.refresh();
    }

    edit() {
        this.showDetail(this.selectedId());
    }

    deleteSelected() {
        this.confirmationSrv.confirmDelete().subscribe((b) => {
            if (b && this.selectedId() > 0) {
                const a = this.data().filter((x) => x.id === this.selectedId())[0];
                if (a && a.id) {
                    this.shellSrv.setLoading(true);
                    this.entitySrv.remove(a.id).subscribe({
                        next: (_) => {
                            this.shellSrv.setLoading(false);
                            this.snackBarSrv.showSuccessMessage();
                        },
                        error: (err) => {
                            this.snackBarSrv.showFailureMessage();
                            this.shellSrv.setLoading(false);
                            throw err;
                        },
                    });
                }
            }
        });
    }

    showDetail(id: number) {
        this.router
            .navigate(['../costs-detail', id], { relativeTo: this.route })
            .then();
    }
}
