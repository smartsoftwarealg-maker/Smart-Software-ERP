import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListToolbarComponent } from './list-toolbar.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../smart-lib/components/material.module';

@NgModule({
    imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ListToolbarComponent
],
    exports: [ListToolbarComponent]
})
export class ListToolbarModule {
}
