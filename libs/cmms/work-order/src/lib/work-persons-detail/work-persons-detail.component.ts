import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '@ss/common/api-common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { WorkPerson } from '@ss/cmms/cmms-api';
import { ArticleService } from '@ss/stock/api-article';
import { CMMSWorkPersonService } from '../services/c-m-m-s-work-person.service';
import { EmployeeService, PersonAutocompleteClass } from '@ss/employee-services/employee-services';

@Component({
    selector: 'ss-work-persons-detail',
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
    templateUrl: './work-persons-detail.component.html',
    styleUrls: ['./work-persons-detail.component.css'],
})
export class WorkPersonsDetailComponent extends BaseChildEntityDetailComponent<WorkPerson> {
    private articleSrv = inject(ArticleService);
    private personSrv = inject(EmployeeService);
    private fb = inject(FormBuilder);

    personLookup = new PersonAutocompleteClass(this.personSrv);

    constructor(protected override entitySrv: CMMSWorkPersonService) {
        super(entitySrv);
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

