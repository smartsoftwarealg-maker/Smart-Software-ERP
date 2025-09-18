import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { ShellService } from '@ss/common/ui-shell';
import { ActivatedRoute} from '@angular/router';
import { PaginationModel } from '@ss/common/api-common';
import { CrmCalendarService } from '../crm-calendar.service';
import { CRMCalendar } from './calendar-api';
import { MatSort, Sort } from '@angular/material/sort';


@Component({
    selector: 'ss-calendar-list',
    imports: [
        DatePipe,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatMiniFabButton,
        MatRow,
        MatRowDef,
        MatTable,
        PaginationComponent,
        TranslateDirective,
        TranslatePipe,
        MatHeaderCellDef,
        MatButton,
        MatSort
    ],
    templateUrl: './calendar-list.html',
    styleUrl: './calendar-list.scss',
    standalone: true
})
export class CalendarList implements OnInit, OnDestroy {
    #shellSrv = inject(ShellService);
    #route = inject(ActivatedRoute);
    selectedRow: CRMCalendar | null = null;
    #entitySrv = inject(CrmCalendarService);
    displayedColumns = [
        'subject',
        'activityType',
        'priority',
        'status',
        'dueDate',
        'completionDate',
        'ownerDescription'
    ];

    constructor() {
        this.pagination.onChange = () => this.refresh();
    }

    data: CRMCalendar[] = [];

    pagination = PaginationModel.newInstance({
        page: 1,
        pageSize: 15,
        elementCount: 0
    });
    loading = false;


    selectRow(row: CRMCalendar): void {
        this.selectedRow = row;
    }

    search() {

    }

    ngOnInit(): void {
        this.#shellSrv.setGoBackPath('..', this.#route);
        this.#shellSrv.setTitle('CRM_CALENDAR');
        this.refresh();
    }

    private refresh(): void {
        this.loading = true;
        this.#entitySrv.getPage(this.pagination).subscribe((res) => {
            this.data = res;
            this.loading = false;
        });
    }

    ngOnDestroy(): void {
    }

    sort(event: Sort) {
        this.#entitySrv.sortColumn = event;
        this.refresh();
    }
}
