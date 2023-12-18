import { Component } from '@angular/core';
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
import { MaterialModule } from '@ss/common/api-common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { WorkPermit } from '@ss/cmms/cmms-api';
import { CMMSWorkPermitService } from '../services/c-m-m-s-work-permit.service';

@Component({
    selector: 'ss-work-permit-list',
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
    templateUrl: './work-permit-list.component.html',
    styleUrl: './work-permit-list.component.css',
})
export class WorkPermitListComponent extends BaseChildEntityListComponent<WorkPermit> {
    override displayedColumns = ['number', 'date', 'typeDescription', 'startDate', 'dueDate'];

    constructor(protected override detailSrv: CMMSWorkPermitService) {
        super(detailSrv, 'WorkPermit');
    }

}
