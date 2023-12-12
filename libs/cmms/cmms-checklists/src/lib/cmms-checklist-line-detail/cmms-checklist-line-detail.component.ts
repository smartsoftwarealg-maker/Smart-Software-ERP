import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ChecklistDetail, RoutingDetail } from '@ss/cmms/cmms-api';
import { CMMSRoutingDetailService } from '@ss/cmms/lookups';

@Component({
    imports: [CommonModule,
        CommonUiLangModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule],
    selector: 'ss-cmms-checklist-line-detail',
    standalone: true,
    styleUrls: ['./cmms-checklist-line-detail.component.css'],
    templateUrl: './cmms-checklist-line-detail.component.html'
})
export class CmmsChecklistLineDetailComponent extends BaseChildEntityDetailComponent<RoutingDetail> {
    private fb = inject(FormBuilder);

    constructor(protected override entitySrv: CMMSRoutingDetailService) {
        super(entitySrv, 'PM');
    }

    override setupForm(e: RoutingDetail): UntypedFormGroup {
        return this.fb.group({
            id:          [e.id],
            parentId:    [e.parentId],
            order:       [e.order || 10, Validators.required],
            description: [e.description, Validators.required],
            teamSize:    [e.teamSize || 1],
            hours:       [e.hours],
            cost:        [e.cost]
        });
    }
}
