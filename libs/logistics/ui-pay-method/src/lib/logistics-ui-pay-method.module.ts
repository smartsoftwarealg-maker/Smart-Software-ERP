import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PayMethodListComponent} from './pay-method-list.component';
import {PayMethodDetailComponent} from './pay-method-detail.component';
import {MaterialModule} from '@ss/common/api-common';


import {ReactiveFormsModule} from '@angular/forms';

import {CommonUiAutoCompleteModule} from '@ss/common/ui-auto-complete';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        CommonUiAutoCompleteModule,
        ReactiveFormsModule,

        PayMethodListComponent,
        PayMethodDetailComponent
    ],
    exports: [
        PayMethodListComponent,
        PayMethodDetailComponent
    ]
})
export class LogisticsUiPayMethodModule {}
