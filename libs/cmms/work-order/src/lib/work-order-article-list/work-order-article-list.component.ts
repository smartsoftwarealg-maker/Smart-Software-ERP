import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { WorkArticle } from '@ss/cmms/cmms-api';
import { CMMSWorkOrderArticleService } from '../services/c-m-m-s-work-order-article.service';

import { MatTableModule } from '@angular/material/table';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '@ss/common/api-common';
import { MatDialog } from '@angular/material/dialog';
import {
    WorkOrderArticleReservationComponent
} from '../work-order-article-reservation/work-order-article-reservation.component';
import { TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-work-order-article-list',
    standalone: true,
    imports: [
        CommonModule,

        MatTableModule,


        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        DatePickerComponent,
        MatButtonModule,
        MaterialModule,
        TranslatePipe,
        PaginationComponent
    ],
    templateUrl: './work-order-article-list.component.html',
    styleUrls: ['./work-order-article-list.component.css'],
})
export class WorkOrderArticleListComponent extends BaseChildEntityListComponent<WorkArticle> {
    private dialog = inject(MatDialog);

    override displayedColumns = ['reference', 'description', 'qty'];

    constructor(protected override detailSrv: CMMSWorkOrderArticleService) {
        super(detailSrv, 'WorkArticle');
    }

    reserve() {
        const dialogRef = this.dialog.open(WorkOrderArticleReservationComponent, {
            width: '60em',
            height: '600px',
            data: { data: this.data$, id: this.detailSrv.getParentId() }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result && result['success']) {
                this.snackBarSrv.showSuccessMessage();
            } else {
                this.snackBarSrv.showFailureMessage();
            }
        });
    }
}
