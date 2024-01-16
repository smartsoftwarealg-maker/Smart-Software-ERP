import { Component } from '@angular/core';
import { RoutingPart } from 'libs/cmms/cmms-api/src';
import { BaseChildEntityListComponent } from 'libs/common/ui-base-entity/src';
import { CMMSRoutingPartService } from '../../../../../cmms/lookups/src/lib/services/cmms-routing-parts.service';
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "libs/common/ui-lang/src";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { UiPaginationModule } from "libs/common/ui-pagination/src";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MaterialModule } from "libs/common/api-common/src";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { CommonUiAutoCompleteModule } from "libs/common/ui-auto-complete/src";

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
