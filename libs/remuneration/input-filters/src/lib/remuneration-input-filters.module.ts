import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFilterListComponent } from './input-filter-list.component';
import { InputFilterDetailComponent } from './input-filter-detail.component';
import {MaterialModule} from '@ss/common/api-common';



@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        InputFilterListComponent,
        InputFilterDetailComponent
    ],
})
export class RemunerationInputFiltersModule {}
