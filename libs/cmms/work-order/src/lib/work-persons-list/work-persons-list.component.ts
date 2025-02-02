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
import { WorkPerson } from '@ss/cmms/cmms-api';
import { CMMSWorkPersonService } from '../services/c-m-m-s-work-person.service';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-work-persons-list',
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
        TranslatePipe,
        TranslateDirective
    ],
    templateUrl: './work-persons-list.component.html',
    styleUrls: ['./work-persons-list.component.css'],
})
export class WorkPersonsListComponent extends BaseChildEntityListComponent<WorkPerson> {
    override displayedColumns = ['firstName', 'lastName', 'description', 'from', 'to'];

    constructor(protected override detailSrv: CMMSWorkPersonService) {
        super(detailSrv, 'WorkPerson');
    }
}
