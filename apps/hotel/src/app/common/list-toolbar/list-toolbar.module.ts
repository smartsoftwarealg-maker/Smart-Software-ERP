import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListToolbarComponent } from './list-toolbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SmartCommonModule } from '../../smart-lib/common/smart-common.module';
import { MaterialModule } from '../../smart-lib/components/material.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        SmartCommonModule
    ],
    declarations: [ListToolbarComponent],
    exports: [ListToolbarComponent]
})
export class ListToolbarModule {
}
