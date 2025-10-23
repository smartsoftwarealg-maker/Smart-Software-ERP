import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import { DatePipe } from '@angular/common';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { ShellService } from '@ss/common/ui-shell';
import { ActivatedRoute} from '@angular/router';
import {LoginService, PaginationModel} from '@ss/common/api-common';
import { CrmCalendarService } from '../crm-calendar.service';
import { CRMCalendar } from './calendar-api';
import { MatSort, Sort } from '@angular/material/sort';
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";
import {HttpParams} from '@angular/common/http';

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
        MatRow,
        MatRowDef,
        MatTable,
        PaginationComponent,
        TranslateDirective,
        TranslatePipe,
        MatHeaderCellDef,
        MatButton,
        MatSort,
        MatRadioButton,
        MatRadioGroup
    ],
    templateUrl: './calendar-list.html',
    styleUrl: './calendar-list.scss',
    standalone: true
})
export class CalendarList implements OnInit {
    #shellSrv = inject(ShellService);
    #route = inject(ActivatedRoute);
    #entitySrv = inject(CrmCalendarService);
    #loginSrv = inject(LoginService);
    #companyCRM = false;

    isResponsible = signal(this.#loginSrv.appCtx.responsible);

    selectedRow: CRMCalendar | null = null;
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
        const params = this.#companyCRM? new HttpParams().set('companyCRM', 'true') : null;
        this.#entitySrv
            .getPage(this.pagination, null, null, params)
            .subscribe((res) => {
            this.data = res;
            this.loading = false;
        });
    }

    sort(event: Sort) {
        this.#entitySrv.sortColumn = event;
        this.refresh();
    }

    onRadioChange(event: MatRadioChange) {
        this.#companyCRM = +event.value === 2;
        this.refresh();
    }
}
