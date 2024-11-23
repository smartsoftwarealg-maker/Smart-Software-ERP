import {Component, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {ShiftTimingService} from '../shift-timing.service';
import {Timing} from '../attendance-api';
import {of, switchMap} from 'rxjs';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '../../../../common/ui-lang/src/lib/translate.directive';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'ss-shift-timing-list',
    templateUrl: './shift-timing-list.component.html',
    styleUrls: ['./shift-timing-list.component.scss'],
    standalone: true,
    imports: [
        MatMiniFabButton,
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        DatePipe,
    ],
})
export class ShiftTimingListComponent implements OnInit {
    selected: Timing = null;
    data: Timing[] = [];

    displayedColumns = [
        'date',
        'from',
        'to',
        'breakFrom',
        'breakTo'
    ];

    constructor(
        public entitySrv: ShiftTimingService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public defReportSrv: DefaultReportService,
        public confirmationSrv: ConfirmationDialogService,
        public pagPersistSrv: PaginatorPersistenceService) {
    }

    private addOffset(date: Date, offset: Date): Date {
        return date? new Date(new Date(date).getTime() + offset.getTime()) : null;
    }

    ngOnInit(): void {
        this.entitySrv
            .getList(0, 50)
            .subscribe(res => {
                this.data = res.body;
                if (this.entitySrv.startDate) {
                    const start = new Date(this.entitySrv.startDate);
                    this.data.forEach((e, i, t) => {
                        e.date = new Date(start.getTime());
                        e.date.setHours(0, 0, 0);
                        e.date.setDate(start.getDate() + i);
                        e.from = this.addOffset(e.from, e.date);
                        e.to   = this.addOffset(e.to, e.date);
                        e.breakFrom = this.addOffset(e.breakFrom, e.date);
                        e.breakTo   = this.addOffset(e.breakTo, e.date);
                    });

                }

            });
    }

    select(item: Timing) {
        this.selected = item;
    }

    showDetail(id: number) {
        this.router.navigate(['detail', id], {relativeTo: this.route}).then();
    }
    edit() {
        if (this.selected?.id > 0) {
            this.showDetail(this.selected?.id || 0);
        }
    }

    deleteSelected() {
        this.confirmationSrv
            .confirmDelete()
            .pipe(switchMap(res => res ? this.entitySrv.remove(this.selected?.id) : of({count: -1})),
                switchMap(res => res.count > 0 ? this.entitySrv.getList(0, 50) : of(null)))
            .subscribe(res => {
                if (res && res.itemCount != null) {
                    this.data = res.body;
                    this.snackBarSrv.showSuccessMessage();
                    this.selected = null;
                }
            });
    }

}
