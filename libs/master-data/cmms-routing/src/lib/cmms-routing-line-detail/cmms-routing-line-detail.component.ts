import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { CMMSRoutingDetailService } from '@ss/master-data/cmms-routing';
import { RoutingDetail } from '@ss/cmms/cmms-api';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '@ss/common/api-common';


@Component({
    selector: 'ss-routing-line-detail',
    templateUrl: './cmms-routing-line-detail.component.html',
    styleUrls: ['./cmms-routing-line-detail.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MatSortModule,
        MatTableModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MaterialModule,
        ReactiveFormsModule
    ],
})
export class CMMSRoutingLineDetailComponent extends BaseChildEntityDetailComponent<RoutingDetail> {
    private fb = inject(FormBuilder);

    constructor(protected override entitySrv: CMMSRoutingDetailService) {
        super(entitySrv, 'RoutingDetail');
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
