import { Component, inject } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CMMSRoutingDetailService } from '@ss/cmms/lookups';
import { RoutingDetail } from '@ss/cmms/cmms-api';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-routing-line-detail',
    templateUrl: './cmms-routing-line-detail.component.html',
    styleUrls: ['./cmms-routing-line-detail.component.css'],
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
