import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchListComponent} from './search-list.component';
import {PaginationModule} from '../pagination/pagination.module';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        PaginationModule
    ],
    declarations: [
        SearchListComponent
    ],
    exports: [
        SearchListComponent
    ],
    providers: []
})
export class SearchListModule {
}
