import { Component } from '@angular/core';
import { RoutingDetail } from '@ss/cmms/cmms-api';
import { CMMSRoutingDetailService } from '@ss/cmms/lookups';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-routing-line-list',
    templateUrl: './cmms-routing-line-list.component.html',
    styleUrls: ['./cmms-routing-line-list.component.css'],
})
export class CMMSRoutingLineListComponent extends BaseChildEntityListComponent<RoutingDetail> {

    override displayedColumns = ['order', 'description', 'teamSize', 'hours', 'cost'];

    constructor(protected override detailSrv: CMMSRoutingDetailService) {
        super(detailSrv);
    }
}
