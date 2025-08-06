import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { MaterialModule } from '@ss/common/api-common';
import { MissionElementPricing } from '../mission-elements-api.class';
import { MissionsElementPricingService } from '../mission-elementPricing.service';

@Component({
    selector: 'ss-mission-elements-lines-list',
    imports: [CommonModule, PaginationComponent, TranslateDirective,  MaterialModule, TranslatePipe],
    templateUrl: './mission-elements-lines-list.component.html',
    styleUrl: './mission-elements-lines-list.component.scss',
    standalone: true
})
export class MissionElementsLinesListComponent extends BaseChildEntityListComponent<MissionElementPricing> {

    override displayedColumns = ['zoneDescription','categoryDescription', 'amount'];

    constructor(protected override detailSrv: MissionsElementPricingService) {
        super(detailSrv, 'MISSION_MISSION_ELEMENT_DETAIL');
        this.paginator.pageSize = 10;
    }
}
