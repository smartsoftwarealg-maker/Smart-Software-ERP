import { Component } from '@angular/core';
import { RoutingPart } from '@ss/cmms/cmms-api';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { CMMSRoutingPartService } from '../services/cmms-routing-parts.service';

@Component({
    selector: 'ss-cmms-routing-parts-list',
    templateUrl: './cmms-routing-parts-list.component.html',
    styleUrls: ['./cmms-routing-parts-list.component.css'],
})
export class CMMSRoutingPartsListComponent extends BaseChildEntityListComponent<RoutingPart>{
    override displayedColumns = ['reference', 'description', 'qty'];

    constructor(protected override detailSrv: CMMSRoutingPartService) {
        super(detailSrv);
    }
}
