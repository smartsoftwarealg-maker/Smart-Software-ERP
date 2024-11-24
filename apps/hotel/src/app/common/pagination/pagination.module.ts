import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../../smart-lib/components/material.module';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    PaginationComponent,
],
    exports: [PaginationComponent]
})
export class PaginationModule {
}
