import { Component } from '@angular/core';
import { RoutingPart } from '@ss/cmms/cmms-api';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { CMMSRoutingPartService } from '../services/cmms-routing-parts.service';
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MaterialModule } from "@ss/common/api-common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";

@Component({
    selector: 'ss-cmms-routing-parts-list',
    templateUrl: './cmms-routing-parts-list.component.html',
    styleUrls: ['./cmms-routing-parts-list.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        CommonUiLangModule,
        MatSortModule,
        MatTableModule,
        UiPaginationModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterOutlet,
        CommonUiAutoCompleteModule
    ],
})
export class CMMSRoutingPartsListComponent extends BaseChildEntityListComponent<RoutingPart>{
    override displayedColumns = ['reference', 'description', 'qty'];

    constructor(protected override detailSrv: CMMSRoutingPartService) {
        super(detailSrv, 'RoutingPart');
    }
}
