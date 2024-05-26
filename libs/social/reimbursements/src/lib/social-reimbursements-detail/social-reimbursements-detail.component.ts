import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { REIMBURSEMENT, Reimbursement, ReimbursementService } from '@social/social-api';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MaterialModule } from '@ss/common/api-common';
import { Observable, of } from 'rxjs';
import { convertToParamMap, ParamMap } from '@angular/router';

@Component({
    selector: 'ss-social-reimbursements-detail',
    standalone: true,
    imports: [CommonModule,
        MatCard,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        CommonUiLangModule,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        MaterialModule,
        ReactiveFormsModule],
    templateUrl: './social-reimbursements-detail.component.html',
    styleUrl: './social-reimbursements-detail.component.scss'
})
export class SocialReimbursementsDetailComponent extends BaseChildEntityDetailComponent<Reimbursement> {
    private fb = inject(FormBuilder);

    constructor(protected override entitySrv: ReimbursementService) {
        super(entitySrv, REIMBURSEMENT);
    }

    override setupForm(e: Reimbursement): UntypedFormGroup {
        return this.fb.group({
            id:        [e.id],
            parentId:  [e.parentId || this.entitySrv.getParentId()],
            amount:    [e.amount, Validators.required],
            date:      [e.date, Validators.required],
            reference: [e.reference],
        });
    }

    override idParamMap(): Observable<ParamMap> {
        return  of(convertToParamMap({'id': this.entitySrv.getParentId()}));
    }
}
