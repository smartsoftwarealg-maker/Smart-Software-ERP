import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VatDetailComponent} from './vat/vat-detail.component';
import {VatListComponent} from './vat/vat-list.component';
import {MaterialModule} from '@ss/common/api-common';
import {RouterModule} from '@angular/router';
import {CommonUiLangModule} from '@ss/common/ui-lang';
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
import {UnitListComponent} from './unit/unit-list.component';
import {UnitDetailComponent} from './unit/unit-detail.component';
import {MarkListComponent} from './mark/mark-list.component';
import {MarkDetailComponent} from './mark/mark-detail.component';
import {SubclassListComponent} from './subclass/subclass-list.component';
import {SubclassDetailComponent} from './subclass/subclass-detail.component';
import {ClassListComponent} from './class/class-list.component';
import {ClassDetailComponent} from './class/class-detail.component';
import {StoreNameListComponent} from './store-name/store-name-list.component';
import {StoreNameDetailComponent} from './store-name/store-name-detail.component';
import {CommonUiConfirmationDialogModule} from '@ss/common/ui-confirmation-dialog';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule
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
        ServiceDetailComponent,

        UnitListComponent,
        UnitDetailComponent,
        MarkListComponent,
        MarkDetailComponent,
        SubclassListComponent,
        SubclassDetailComponent,
        ClassListComponent,
        ClassDetailComponent,
        StoreNameListComponent,
        StoreNameDetailComponent
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
        ServiceDetailComponent,


        UnitListComponent,
        UnitDetailComponent,
        MarkListComponent,
        MarkDetailComponent,
        SubclassListComponent,
        SubclassDetailComponent,
        ClassListComponent,
        ClassDetailComponent,
        StoreNameListComponent,
        StoreNameDetailComponent
    ]
})
export class CommonUiLookupModule {
}
