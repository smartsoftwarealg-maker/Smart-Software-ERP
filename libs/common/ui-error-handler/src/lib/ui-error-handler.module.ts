import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent as ErrorMessageComponent } from './error-message.component';
import { CustomErrorHandler } from './custom-error-handler';
import {MatButtonModule} from '@angular/material/button';
import { UiLangModule } from '@ss/common/ui-lang';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        UiLangModule
    ],
    declarations: [ErrorMessageComponent],
    exports: [ErrorMessageComponent],
    providers: [
        CustomErrorHandler,
        {provide: ErrorHandler, useClass: CustomErrorHandler}
    ],
})
export class UiErrorHandlerModule { }
