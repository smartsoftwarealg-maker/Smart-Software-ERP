import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocImportService, Lookup } from '@ss/logistics/ui-doc-import';
import { MaterialModule, PaginationModel } from '@ss/common/api-common';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { FormControl } from '@angular/forms';
import { Work, WORK_TYPES } from '@ss/cmms/cmms-api';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { Sort } from '@angular/material/sort';
import {
    CMMSPendingServiceRequestService
} from '@ss/cmms/service-request';

@Component({
    selector: 'ss-request-import',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatButtonModule, MaterialModule, CommonUiDatepickerModule, UiPaginationModule],
    templateUrl: './request-import.component.html',
    styleUrls: ['./request-import.component.css'],
})
export class RequestImportComponent implements OnInit {
    private LAST_YEAR = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    private entitySrv = inject(CMMSPendingServiceRequestService);
    private subscriptions: Subscription[] = [];

    pagination = PaginationModel.newInstance();
    workData: Work[] = [];
    displayedColumns = [
        'description',
        'assetDescription',
        'plannedStart',
        'plannedDue',
    ];

    public Types = WORK_TYPES;
    dateControl = new FormControl<Date>(this.LAST_YEAR);
    filter = new FormControl<string>('');
    selectedItem: Work = null;

    constructor(private dialogRef: MatDialogRef<RequestImportComponent>,
        private docImportService: DocImportService,
        @Inject(MAT_DIALOG_DATA) private data: { documentList: Lookup[], agentId?: number }) {
        this.pagination.onChange = () => this.refresh();
    }

    close() {
        this.subscriptions.forEach(s => s.unsubscribe());
        this.dialogRef.close({ work: this.selectedItem });
    }

    cancel() {
        this.selectedItem = null;
        this.close();
    }

    sort(event: Sort) {
        // console.log(event);
        this.entitySrv.sortColumn = event;
        this.refresh();
    }

    refresh() {
        this.entitySrv
            .getPage(this.pagination)
            .subscribe(res => this.workData = res);
    }

    select(work: Work) {
        this.selectedItem = work;
    }

    ngOnInit() {
        this.refresh();
        this.subscriptions.push(
            this.dateControl
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged())
                .subscribe(res => this.entitySrv.date = res)
        );
        this.subscriptions.push(
            this.filter
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged())
                .subscribe(res => this.entitySrv.filter = res)
        );
    }
}
