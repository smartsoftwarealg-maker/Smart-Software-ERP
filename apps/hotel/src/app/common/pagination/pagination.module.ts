import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { FormsModule } from '@angular/forms';
import { SmartCommonModule } from '../../smart-lib/common/smart-common.module';
import { MaterialModule } from '../../smart-lib/components/material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        SmartCommonModule,
    ],
    declarations: [PaginationComponent],
    exports: [PaginationComponent]
})
export class PaginationModule {
}
