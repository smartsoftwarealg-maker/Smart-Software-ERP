import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbUpdaterComponent } from './db-updater/db-updater.component';
import {MaterialModule} from '@ss/common/api-common';


import {ReactiveFormsModule} from '@angular/forms';

import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        CommonUiAutoCompleteModule,
        DbUpdaterComponent
    ],
})
export class AdministrationDbUpdaterModule {}
