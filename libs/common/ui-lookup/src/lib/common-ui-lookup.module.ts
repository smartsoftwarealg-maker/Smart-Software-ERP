import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VatDetailComponent } from './vat/vat-detail.component';
import { VatListComponent } from './vat/vat-list.component';
import { MaterialModule } from '@ss/common/api-common';
import { RouterModule } from '@angular/router';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { PostListComponent, PostDetailComponent } from './post.component';
import { MaritalStatusListComponent, MaritalStatusDetailComponent } from './marital-status.component';
import { SubclassListComponent, SubclassDetailComponent } from './subclass.component';
import { StoreNameListComponent, StoreNameDetailComponent } from './store-name.component';
import { WilayaListComponent, WilayaDetailComponent } from './wilaya.component';
import { ServiceListComponent, ServiceDetailComponent } from './service.component';
import { DiplomaListComponent, DiplomaDetailComponent } from './diploma.component';
import { CategoryListComponent, CategoryDetailComponent } from './category.component';
import { NationalityListComponent, NationalityDetailComponent } from './nationality.component';
import { ClassListComponent, ClassDetailComponent } from './class-list.component';
import { UnitListComponent, UnitDetailComponent } from './unit.component';
import { MarkListComponent, MarkDetailComponent } from './mark.component';
import { EducationLevelListComponent, EducationLevelDetailComponent } from './education-level.component';
import { AgentTypeDetailComponent, AgentTypeListComponent } from './agent-type.component';
import { CompanyTypeListComponent, CompanyTypeDetailComponent } from './company-type.component';
import { PayModeDetailComponent, PayModeListComponent } from './pay-modes.component';
import { CityListComponent, CityDetailComponent } from './city.component';
import { CountryListComponent, CountryDetailComponent } from './country.component';
import { CurrencyListComponent, CurrencyDetailComponent } from './currency.component';
import { ActivityDetailComponent, ActivityListComponent } from './activity.component';
import { RoleDetailComponent, RoleListComponent } from './role.component';
import { EmploymentTypeListComponent, EmploymentTypeDetailComponent } from './employment-type.component';
import { SuspensionReasonListComponent, SuspensionReasonDetailComponent } from './suspension-reason.component';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import {DivisionDetailComponent, DivisionListComponent} from './division.component';
import { DepartmentDetailComponent, DepartmentListComponent } from './department.component';
import {SalesCategoryDetailComponent, SalesCategoryListComponent} from "./sales.category.component";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiAutoCompleteModule,
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
        StoreNameDetailComponent,
        AgentTypeListComponent,
        AgentTypeDetailComponent,
        CompanyTypeListComponent,
        CompanyTypeDetailComponent,
        PayModeListComponent,
        PayModeDetailComponent,
        CityListComponent,
        CityDetailComponent,
        CountryListComponent,
        CountryDetailComponent,
        CurrencyListComponent,
        CurrencyDetailComponent,
        ActivityListComponent,
        ActivityDetailComponent,
        SalesCategoryListComponent,
        SalesCategoryDetailComponent,
        RoleListComponent,
        RoleDetailComponent,
        EmploymentTypeListComponent,
        EmploymentTypeDetailComponent,
        SuspensionReasonListComponent,
        SuspensionReasonDetailComponent,
        DivisionListComponent,
        DivisionDetailComponent,
        DiplomaDetailComponent,
        DepartmentDetailComponent,
        DepartmentListComponent
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
        StoreNameDetailComponent,
        AgentTypeListComponent,
        AgentTypeDetailComponent,
        CompanyTypeListComponent,
        CompanyTypeDetailComponent,
        PayModeListComponent,
        PayModeDetailComponent,
        CityListComponent,
        CityDetailComponent,
        CountryListComponent,
        CountryDetailComponent,
        CurrencyListComponent,
        CurrencyDetailComponent,
        ActivityListComponent,
        ActivityDetailComponent,
        RoleListComponent,
        RoleDetailComponent,
        EmploymentTypeListComponent,
        EmploymentTypeDetailComponent,
        SuspensionReasonListComponent,
        SuspensionReasonDetailComponent,
        DivisionListComponent,
        DiplomaDetailComponent,
        DepartmentDetailComponent,
        DepartmentListComponent
    ]
})
export class CommonUiLookupModule { }
