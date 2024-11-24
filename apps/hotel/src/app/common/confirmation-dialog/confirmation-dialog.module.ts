import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

import { MaterialModule } from '../../smart-lib/components/material.module';

@NgModule({
    imports: [
    CommonModule,
    MaterialModule,
    ConfirmationDialogComponent
],
    exports: [
        ConfirmationDialogComponent,
    ]
})
export class ConfirmationDialogModule {
}
