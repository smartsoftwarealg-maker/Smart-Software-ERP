import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@ss/common/api-common';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {UiLangModule} from '@ss/common/ui-lang';
import {PersonListComponent} from './person-list.component';
import {PersonDetailComponent} from './person-detail.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        UiLangModule,
        UiPaginationModule
    ],
    exports: [PersonListComponent, PersonDetailComponent],
    declarations: [PersonListComponent, PersonDetailComponent]
})
export class PayrollUiPersonModule {
}
