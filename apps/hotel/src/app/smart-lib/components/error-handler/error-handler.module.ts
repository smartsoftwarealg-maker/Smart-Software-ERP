import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageComponent} from './message.component';
import {CustomErrorHandler} from './custom-error-handler';
import {MaterialModule} from '../material.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [MessageComponent,],
    exports: [MessageComponent,],
    providers: [CustomErrorHandler]
})
export class ErrorHandlerModule {
}
