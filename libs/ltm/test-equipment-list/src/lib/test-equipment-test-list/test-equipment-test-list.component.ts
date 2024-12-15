import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';

import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable
} from '@angular/material/table';

import { LtmEquipmentTestService } from '../services/ltm-equipment-test.service';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMiniFabButton } from '@angular/material/button';
import { LTMTestEquipmentTest } from '@ltm/ltm-api';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-test-equipment-test-list',
    standalone: true,
    imports: [
        CommonModule,
        PaginationComponent,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatTable,
        MatTooltip,
        MatHeaderCellDef,
        MatMiniFabButton,
        TranslatePipe,
        TranslateDirective
    ],
    templateUrl: './test-equipment-test-list.component.html',
    styleUrl: './test-equipment-test-list.component.scss',
})
export class TestEquipmentTestListComponent extends BaseChildEntityListComponent<LTMTestEquipmentTest> {
    override displayedColumns = ['testDescription'];


    constructor(public entitySrv: LtmEquipmentTestService) {
        super(entitySrv, 'LTMTestEquipmentTest');
    }
}
