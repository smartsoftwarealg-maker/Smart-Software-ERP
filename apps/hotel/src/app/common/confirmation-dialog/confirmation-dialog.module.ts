import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { SmartCommonModule } from '../../smart-lib/common/smart-common.module';
import { MaterialModule } from '../../smart-lib/components/material.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        SmartCommonModule
    ],
    declarations: [
        ConfirmationDialogComponent
    ],
    exports: [
        ConfirmationDialogComponent,
    ],
    entryComponents: [
        ConfirmationDialogComponent
    ]
})
export class ConfirmationDialogModule {
}
