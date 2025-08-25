import { Component, inject } from '@angular/core';

import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CmmsPersonService, WorkPermit } from "@ss/cmms/cmms-api";
import { CMMSWorkPermitService } from '../services/c-m-m-s-work-permit.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { MaterialModule } from '@ss/common/api-common';
import { PersonAutocompleteClass } from "@ss/employee-services/employee-services";
import { CMMSPermitTypeService } from "@ss/cmms/lookups";

@Component({
    selector: 'ss-work-permit-detail',
    standalone: true,
    imports: [
    MatTableModule,
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
    templateUrl: './work-permit-detail.component.html',
    styleUrl: './work-permit-detail.component.css'
})
export class WorkPermitDetailComponent extends BaseChildEntityDetailComponent<WorkPermit> {
    private personSrv = inject(CmmsPersonService);
    private permitTypeSrv = inject(CMMSPermitTypeService);
    private fb = inject(FormBuilder);
    personLookup = new PersonAutocompleteClass(this.personSrv);
    permitLookup = new DefaultAutoCompleteModel(this.permitTypeSrv);

    constructor(protected override entitySrv: CMMSWorkPermitService) {
        super(entitySrv, 'WorkPermit');
    }

    override setupForm(e: WorkPermit): UntypedFormGroup {
        return this.fb.group({
            id:          [e.id],
            parentId:    [e.parentId || this.entitySrv.getParentId()],
            number:      [e.number, Validators.required],
            date:        [e.date, Validators.required],
            permitType:  [e.permitType, Validators.required],
            description: [e.description, Validators.required],
            startDate:   [e.startDate, Validators.required],
            dueDate:     [e.dueDate],
            closureDate: [e.closureDate],
            requester:   [e.requester],
            authorizer:  [e.authorizer],
            closer:      [e.closer],
            safetyPrecautions: [e.safetyPrecautions],
            workDetail:  [e.workDetail],
            preWork:     [e.preWork],
            postWork:    [e.postWork],
            status:      [e.status]
        });
    }
}
