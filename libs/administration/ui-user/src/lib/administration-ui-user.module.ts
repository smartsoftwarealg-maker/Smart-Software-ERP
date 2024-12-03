import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '@ss/common/api-common';


import {ReactiveFormsModule} from '@angular/forms';

import {UserListComponent} from './user-list.component';
import {UserDetailComponent} from './user-detail.component';
import {UiAutoCompleteComponent} from '@ss/common/ui-auto-complete';
import { MatCardModule } from '@angular/material/card';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,

        ReactiveFormsModule,
        MatCardModule,
        UserListComponent,
        UserDetailComponent
    ]
})
export class AdministrationUiUserModule {}
