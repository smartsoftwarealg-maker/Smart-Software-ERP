import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationDialogComponent} from './confirmation-dialog.component';
import {MaterialModule} from '../material.module';
import {SmartCommonModule} from 'smart-shared';

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
