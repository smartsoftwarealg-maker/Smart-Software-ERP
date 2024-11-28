import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocImportComponent } from './doc-import/doc-import.component';
import { MaterialModule } from '@ss/common/api-common';


import { ReactiveFormsModule } from '@angular/forms';
import { InventoryImportComponent } from './inventory-import/inventory-import.component';
import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,
        CommonUiAutoCompleteModule,
        DocImportComponent, InventoryImportComponent
    ],
    exports: [DocImportComponent],
})
export class LogisticsUiDocImportModule {}
