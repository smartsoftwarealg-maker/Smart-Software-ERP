import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '@ss/common/api-common';
import {FormsModule} from '@angular/forms';
import {ConfirmationDialogComponent} from "./confirmation-dialog.component";
import {CommonUiLangModule} from "@ss/common/ui-lang";

@NgModule({
    imports: [
        CommonModule,
        CommonUiLangModule,
        MaterialModule
    ],
    declarations: [
        ConfirmationDialogComponent
    ],
    exports: [
        ConfirmationDialogComponent,
    ],
})
export class CommonUiConfirmationDialogModule {}
