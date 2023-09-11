import { Component } from '@angular/core';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { Inspection, WORK_TYPES } from '@ss/cmms/cmms-api';
import { MaterialModule } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CMMSInspectionService } from '../services/c-m-m-s-inspection.service';

@Component({
    selector: 'ss-inspection-detail-list',
    templateUrl: './inspection-detail-list.component.html',
    styleUrls: ['./inspection-detail-list.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        CommonUiLangModule,
        MatTableModule,
        UiPaginationModule,
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
})
export class InspectionDetailListComponent extends BaseChildEntityListComponent<Inspection> {
    public types = WORK_TYPES;
    override displayedColumns = [
        'description',
        'fail',
        'pass'
    ];

    constructor(public override detailSrv: CMMSInspectionService) {
        super(detailSrv);
    }

    pass(i: Inspection, checked: boolean) {
        i.status = checked? 1 : 0;
        this.save(i);
    }

    fail(i: Inspection, checked: boolean) {
        i.status = checked? 2 : 0;
        this.save(i);
    }

    private save(i: Inspection) {
        this.detailSrv
            .save(i)
            .subscribe(res => {
                if (res > 0) {
                    this.snackBarSrv.showSuccessMessage();
                }
            });
    }

    loadChecklist() {
        this.detailSrv
            .loadChecklist()
            .subscribe(res => {
                this.refresh();
                if (res.count > 0) {
                    this.snackBarSrv.showSuccessMessage();
                }
            });
    }
}
