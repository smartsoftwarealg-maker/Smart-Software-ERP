import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, of, switchMap, tap } from 'rxjs';
import { WorkArticle } from '@ss/cmms/cmms-api';

import { MatTableModule } from '@angular/material/table';

import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '@ss/common/api-common';
import { MatSelectionList } from '@angular/material/list';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CMMSWorkOrderArticleService } from '@ss/cmms/work-order';

@Component({
    selector: 'ss-work-order-article-reservation',
    standalone: true,
    imports: [
        CommonModule,

        MatTableModule,

        CommonUiAutoCompleteModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        CommonUiDatepickerModule,
        MatButtonModule,
        MaterialModule
    ],
    templateUrl: './work-order-article-reservation.component.html',
    styleUrl: './work-order-article-reservation.component.css',
})
export class WorkOrderArticleReservationComponent {
    private confirmationSrv = inject(ConfirmationDialogService);
    private dialogRef = inject(MatDialogRef<WorkOrderArticleReservationComponent>);
    private workOrderArticleSrv = inject(CMMSWorkOrderArticleService);
    articles$: Observable<WorkArticle[]> = of([]);
    id = 0;
    processing = false;

    constructor(@Inject(MAT_DIALOG_DATA) private data: { id: number, data: Observable<WorkArticle[]> }) {
        this.articles$ = this.data.data;
        this.id = data.id;
    }

    public close(list: MatSelectionList) {
        const reservations = list.selectedOptions.selected.filter(v => v.value > 0);
        if (reservations.length > 0) {
            this.confirmationSrv
                .confirm('CONFIRMATION', 'CMMS_RESERVE')
                .pipe(
                    tap(ans => this.processing = ans),
                    switchMap(ans => ans ?
                        this.workOrderArticleSrv.reserve(this.id, reservations.map(o => o.value)) :
                        of({ count: 0 }))
                ).subscribe({
                    next: res => {
                        this.dialogRef.close({ success: res.count > 0 });
                    }, error: err => {
                        this.dialogRef.close({ success: false });
                        throw err;
                    }
                });
        }
    }

    public cancel() {
        this.dialogRef.close({ success: false });
    }
}
