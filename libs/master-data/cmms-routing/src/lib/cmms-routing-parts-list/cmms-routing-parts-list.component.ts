import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CMMSRoutingPartService } from '@ss/cmms/lookups';
import { CommonModule } from "@angular/common";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import {MatTooltip} from "@angular/material/tooltip";
import {BaseChildEntityListComponent} from "@ss/common/ui-base-entity";
import {RoutingPart} from "@ss/cmms/cmms-api";

@Component({
    selector: 'ss-cmms-routing-parts-list',
    templateUrl: './cmms-routing-parts-list.component.html',
    styleUrls: ['./cmms-routing-parts-list.component.css'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        MatSortModule,
        MatTableModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        TranslateDirective,
        TranslatePipe,
        PaginationComponent,
        MatTooltip
    ]
})
export class CMMSRoutingPartsListComponent extends BaseChildEntityListComponent<RoutingPart>{
    readonly displayedColumns = (['reference', 'description', 'qty']);

    constructor(protected detailSrv: CMMSRoutingPartService) {
        super(detailSrv, 'RoutingPart');
    }
}
