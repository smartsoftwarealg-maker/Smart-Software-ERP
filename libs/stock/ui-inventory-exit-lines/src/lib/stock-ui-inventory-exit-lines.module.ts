import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InventoryExitLinesListComponent} from './inventory-line-list/inventory-exit-lines-list.component';
import {InventoryExitLinesDetailComponent} from './inventory-line-detail/inventory-exit-lines-detail.component';
import {MaterialModule} from '@ss/common/api-common';


import {ReactiveFormsModule} from '@angular/forms';

import {CommonUiDatepickerModule} from '@ss/common/ui-datepicker';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';
import {RouterModule} from '@angular/router';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        RouterModule,
        ReactiveFormsModule,

        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        DocInfoComponent,
        InventoryExitLinesListComponent,
        InventoryExitLinesDetailComponent
    ],
    exports: [
        InventoryExitLinesListComponent,
        InventoryExitLinesDetailComponent
    ]
})
export class StockUiInventoryExitLinesModule {
}
