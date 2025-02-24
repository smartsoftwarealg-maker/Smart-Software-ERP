import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';


import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '@ss/common/api-common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { WorkPerson } from '@ss/cmms/cmms-api';
import { CMMSWorkPersonService } from '../services/c-m-m-s-work-person.service';
import { PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import { CmmsPersonService } from '@ss/cmms/cmms-api';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-work-persons-detail',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        TranslateDirective,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        DatePickerComponent,
        MatButtonModule,
        MaterialModule,
        UiAutoCompleteComponent
    ],
    templateUrl: './work-persons-detail.component.html',
    styleUrls: ['./work-persons-detail.component.css'],
})
export class WorkPersonsDetailComponent extends BaseChildEntityDetailComponent<WorkPerson> {
    private personSrv = inject(CmmsPersonService);
    private fb = inject(FormBuilder);

    personLookup = new PersonAutocompleteClass(this.personSrv);

    constructor(protected override entitySrv: CMMSWorkPersonService) {
        super(entitySrv, 'WorkPerson');
    }

    setupForm(e: WorkPerson): UntypedFormGroup {
        return this.fb.group({
            id:          [e.id],
            parentId:    [e.parentId || this.entitySrv.getParentId()],
            personId:    [e.personId],
            from:        [e.from, Validators.required],
            to:          [e.to, Validators.required],
            description: [e.description]
        });
    }
}

