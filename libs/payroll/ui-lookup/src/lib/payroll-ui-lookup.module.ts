import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostDetailComponent} from "./post/post-detail.component";
import {MaterialModule} from "@ss/common/api-common";
import {RouterModule} from "@angular/router";
import {UiLangModule} from "@ss/common/ui-lang";
import {UiPaginationModule} from "@ss/common/ui-pagination";
import {PostListComponent} from "./post/post-list.component";
import {MaritalStatusDetailComponent} from "./marital-status/marital-status-detail.component";
import {MaritalStatusListComponent} from "./marital-status/marital-status-list.component";
import {EducationLevelListComponent} from "./education-level/education-level-list.component";
import {EducationLevelDetailComponent} from "./education-level/education-level-detail.component";
import {DiplomaListComponent} from "./diploma/diploma-list.component";
import {DiplomaDetailComponent} from "./diploma/diploma-detail.component";
import {CategoryDetailComponent} from './category/category-detail.component';
import {CategoryListComponent} from './category/category-list.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        UiLangModule,
        UiPaginationModule
    ],
    declarations: [
        PostDetailComponent,
        PostListComponent,

        MaritalStatusDetailComponent,
        MaritalStatusListComponent,

        EducationLevelListComponent,
        EducationLevelDetailComponent,

        DiplomaListComponent,
        DiplomaDetailComponent,

        CategoryDetailComponent,
        CategoryListComponent
    ],
    exports: [
        PostDetailComponent,
        PostListComponent,

        MaritalStatusDetailComponent,
        MaritalStatusListComponent,

        EducationLevelListComponent,
        EducationLevelDetailComponent,

        DiplomaListComponent,
        DiplomaDetailComponent,

        CategoryDetailComponent,
        CategoryListComponent
    ]
})
export class PayrollUiLookupModule {
}
