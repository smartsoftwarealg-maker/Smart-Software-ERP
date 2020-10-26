import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VatDetailComponent} from './vat/vat-detail.component';
import {VatListComponent} from './vat/vat-list.component';
import {MaterialModule} from '@ss/common/api-common';
import {RouterModule} from '@angular/router';
import {UiLangModule} from '@ss/common/ui-lang';
import {UiPaginationModule} from '@ss/common/ui-pagination';
import {WilayaDetailComponent} from './wilaya/wilaya-detail.component';
import {WilayaListComponent} from './wilaya/wilaya-list.component';
import {ServiceDetailComponent} from './service/service-detail.component';
import {ServiceListComponent} from './service/service-list.component';
import {NationalityListComponent} from './nationality/nationality-list.component';
import {NationalityDetailComponent} from './nationality/nationality-detail.component';
import {CategoryListComponent} from './category/category-list.component';
import {CategoryDetailComponent} from './category/category-detail.component';
import {EducationLevelDetailComponent} from './education-level/education-level-detail.component';
import {EducationLevelListComponent} from './education-level/education-level-list.component';
import {MaritalStatusListComponent} from './marital-status/marital-status-list.component';
import {MaritalStatusDetailComponent} from './marital-status/marital-status-detail.component';
import {DiplomaDetailComponent} from './diploma/diploma-detail.component';
import {DiplomaListComponent} from './diploma/diploma-list.component';
import {PostDetailComponent} from './post/post-detail.component';
import {PostListComponent} from './post/post-list.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        UiLangModule,
        UiPaginationModule
    ],
    declarations: [
        VatListComponent,
        VatDetailComponent,
        WilayaDetailComponent,
        WilayaListComponent,

        PostDetailComponent,
        PostListComponent,

        MaritalStatusDetailComponent,
        MaritalStatusListComponent,

        EducationLevelListComponent,
        EducationLevelDetailComponent,

        DiplomaListComponent,
        DiplomaDetailComponent,

        CategoryDetailComponent,
        CategoryListComponent,

        NationalityDetailComponent,
        NationalityListComponent,

        ServiceListComponent,
        ServiceDetailComponent
    ],
    exports: [
        VatListComponent,
        VatDetailComponent,
        WilayaDetailComponent,
        WilayaListComponent,

        PostDetailComponent,
        PostListComponent,

        MaritalStatusDetailComponent,
        MaritalStatusListComponent,

        EducationLevelListComponent,
        EducationLevelDetailComponent,

        DiplomaListComponent,
        DiplomaDetailComponent,

        CategoryDetailComponent,
        CategoryListComponent,

        NationalityDetailComponent,
        NationalityListComponent,

        ServiceListComponent,
        ServiceDetailComponent
    ]
})
export class CommonUiLookupModule {
}
