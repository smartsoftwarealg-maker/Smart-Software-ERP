import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelInjectionComponent } from './excel-injection.component';
import {MaterialModule} from '@ss/common/api-common';



@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ExcelInjectionComponent
    ],
})
export class RemunerationExcelInjectionModule {}
