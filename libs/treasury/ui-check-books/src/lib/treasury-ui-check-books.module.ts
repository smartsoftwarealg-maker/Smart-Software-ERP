import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { MaterialModule } from '@ss/common/api-common';

import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { BankDescriptionPipe } from '@ss/administration/api-bank';
import { CheckBookDetailComponent } from './check-book-detail/check-book-detail.component';
import { CheckBookListComponent } from './check-book-list/check-book-list.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,



        RouterModule,
        CommonUiAutoCompleteModule,
        BankDescriptionPipe, CheckBookDetailComponent, CheckBookListComponent
    ],
    exports: [CheckBookDetailComponent, CheckBookListComponent]
})
export class TreasuryUiCheckBooksModule {}
