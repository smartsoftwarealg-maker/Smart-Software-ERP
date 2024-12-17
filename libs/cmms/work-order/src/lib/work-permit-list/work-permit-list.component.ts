import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '@ss/common/api-common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { WorkPermit } from '@ss/cmms/cmms-api';
import { CMMSWorkPermitService } from '../services/c-m-m-s-work-permit.service';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-work-permit-list',
    standalone: true,
    imports: [
        CommonModule,
        PaginationComponent,
        MatTableModule,

        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
       
        MatButtonModule,
        MaterialModule,
        TranslatePipe
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
