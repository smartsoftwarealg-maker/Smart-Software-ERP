import { Component, inject } from '@angular/core';

import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { PersonFault } from '../employee-api';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CMMSFaultService } from '@ss/cmms/lookups';
import { PersonFaultService } from '../services/person-fault.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-person-fault-detail',
    standalone: true,
    imports: [FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, ReactiveFormsModule, UiAutoCompleteComponent, TranslateDirective],
    templateUrl: './person-fault-detail.component.html',
    styleUrls: ['./person-fault-detail.component.css'],
})
export class PersonFaultDetailComponent extends BaseChildEntityDetailComponent<PersonFault>{
    private faultSrv = inject(CMMSFaultService);
    private fb = inject(FormBuilder);

    faultLookup = new DefaultAutoCompleteModel(this.faultSrv);

    constructor(protected override entitySrv: PersonFaultService) {
        super(entitySrv, 'PersonFault');
    }

    setupForm(e: PersonFault): UntypedFormGroup {
        return this.fb.group({
            id: [e.id],
            parentId: [e.parentId || this.entitySrv.getParentId()],
            faultId:  [e.faultId, Validators.required]
        });
    }
}
