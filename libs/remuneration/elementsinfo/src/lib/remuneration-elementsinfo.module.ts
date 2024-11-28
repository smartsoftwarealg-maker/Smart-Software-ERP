import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementsInfoComponent } from './elements-info.component';
import { ElementsInfoDetailComponent } from './elements-info-detail.component';
import {MaterialModule} from '@ss/common/api-common';



@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ElementsInfoComponent,
        ElementsInfoDetailComponent
    ],
})
export class RemunerationElementsinfoModule {}
