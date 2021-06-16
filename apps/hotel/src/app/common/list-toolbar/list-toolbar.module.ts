import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {ListToolbarComponent} from './list-toolbar.component';
import {SmartCommonModule} from 'smart-shared';
import {ReactiveFormsModule} from '@angular/forms';

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
