import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementsInfoComponent } from './elements-info.component';
import { ElementsInfoDetailComponent } from './elements-info-detail.component';
import {MaterialModule} from '@ss/common/api-common';
import {CommonUiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        UiPaginationModule,
        CommonUiLangModule,
        ElementsInfoComponent,
        ElementsInfoDetailComponent
    ],
})
export class RemunerationElementsinfoModule {}
