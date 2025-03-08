import {Component, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {ShiftTimingService} from '../shift-timing.service';
import {Timing} from '../attendance-api';
import { map, of, switchMap } from 'rxjs';
import { MatMiniFabButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { AsyncPipe, DatePipe } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { toSignal } from '@angular/core/rxjs-interop';

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
        AsyncPipe
    ]
})
export class ShiftTimingListComponent extends BaseChildEntityListComponent<Timing> {
    selected: Timing = null;
    data: Timing[] = [];

    periodExhausted = toSignal(this.data$.pipe(map(res => res.length)));

    override displayedColumns = [
        'date',
        'from',
        'to',
        'breakFrom',
        'breakTo'
    ];

    constructor(public entitySrv: ShiftTimingService) {
        super(entitySrv, 'Timing');
        this.paginator.pageSize = 100;
    }

    override refresh() {
        super.refresh();
    }

    //
    // ngOnInit(): void {
    //     this.entitySrv
    //         .getList(0, 50)
    //         .subscribe(res => {
    //             this.data = res.body;
    //             console.log('data', this.data);
    //             if (this.entitySrv.startDate) {
    //                 const start = new Date(this.entitySrv.startDate);
    //                 this.data.forEach((e, i, t) => {
    //                     e.date = new Date(start.getTime());
    //                     e.date.setHours(0, 0, 0);
    //                     e.date.setDate(start.getDate() + i);
    //                     e.from = this.addOffset(e.from, e.date);
    //                     e.to   = this.addOffset(e.to, e.date);
    //                     e.breakFrom = this.addOffset(e.breakFrom, e.date);
    //                     e.breakTo   = this.addOffset(e.breakTo, e.date);
    //                 });
    //             }
    //
    //         });
    // }
    //
    // select(item: Timing) {
    //     this.selected = item;
    // }
    //
    // showDetail(id: number) {
    //     this.router.navigate(['detail', id], {relativeTo: this.route}).then();
    // }
    // edit() {
    //     if (this.selected?.id > 0) {
    //         this.showDetail(this.selected?.id || 0);
    //     }
    // }
    //
    // deleteSelected() {
    //     this.confirmationSrv
    //         .confirmDelete()
    //         .pipe(switchMap(res => res ? this.entitySrv.remove(this.selected?.id) : of({count: -1})),
    //             switchMap(res => res.count > 0 ? this.entitySrv.getList(0, 50) : of(null)))
    //         .subscribe(res => {
    //             if (res && res.itemCount != null) {
    //                 this.data = res.body;
    //                 this.snackBarSrv.showSuccessMessage();
    //                 this.selected = null;
    //             }
    //         });
    // }

}
