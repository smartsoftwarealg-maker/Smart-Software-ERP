import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from './pagination.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {SmartCommonModule} from 'smart-shared';

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
