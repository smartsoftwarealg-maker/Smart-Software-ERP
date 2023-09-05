import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VatDetailComponent } from './vat/vat-detail.component';
import { VatListComponent } from './vat/vat-list.component';
import { MaterialModule } from '@ss/common/api-common';
import { RouterModule } from '@angular/router';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { PostListComponent, PostDetailComponent } from './components/post.component';
import { MaritalStatusListComponent, MaritalStatusDetailComponent } from './components/marital-status.component';
import { SubclassListComponent, SubclassDetailComponent } from './components/subclass.component';
import { StoreNameListComponent, StoreNameDetailComponent } from './components/store-name.component';
import { WilayaListComponent, WilayaDetailComponent } from './components/wilaya.component';
import { ServiceListComponent, ServiceDetailComponent } from './components/service.component';
import { DiplomaListComponent, DiplomaDetailComponent } from './components/diploma.component';
import { CategoryListComponent, CategoryDetailComponent } from './components/category.component';
import { NationalityListComponent, NationalityDetailComponent } from './components/nationality.component';
import { ClassListComponent, ClassDetailComponent } from './components/class-list.component';
import { UnitListComponent, UnitDetailComponent } from './components/unit.component';
import { MarkListComponent, MarkDetailComponent } from './components/mark.component';
import { EducationLevelListComponent, EducationLevelDetailComponent } from './components/education-level.component';
import { AgentTypeDetailComponent, AgentTypeListComponent } from './components/agent-type.component';
import { CompanyTypeListComponent, CompanyTypeDetailComponent } from './components/company-type.component';
import { PayModeDetailComponent, PayModeListComponent } from './components/pay-modes.component';
import { CityListComponent, CityDetailComponent } from './components/city.component';
import { CountryListComponent, CountryDetailComponent } from './components/country.component';
import { CurrencyListComponent, CurrencyDetailComponent } from './components/currency.component';
import { ActivityDetailComponent, ActivityListComponent } from './components/activity.component';
import { RoleDetailComponent, RoleListComponent } from './components/role.component';
import { EmploymentTypeListComponent, EmploymentTypeDetailComponent } from './components/employment-type.component';
import { SuspensionReasonListComponent, SuspensionReasonDetailComponent } from './components/suspension-reason.component';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import {DivisionDetailComponent, DivisionListComponent} from './components/division.component';
import { DepartmentDetailComponent, DepartmentListComponent } from './components/department.component';
import {SalesCategoryDetailComponent, SalesCategoryListComponent} from './components/sales.category.component';
import {
    ProfessionalFaultDetailComponent,
    ProfessionalFaultListComponent
} from './components/professional-fault.component';
import {PunishmentTypeDetailComponent, PunishmentTypeListComponent} from './components/punishment-type.component';
import {AppArchiveDocumentDetailComponent, AppArchiveDocumentListComponent} from './components/app-archive-docs.component';
import {FurnitureStatusDetailComponent, FurnitureStatusListComponent} from './components/furniture-status.component';
import {DiscountDetailComponent, DiscountListComponent} from './components/discount.component';
import {DairaDetailComponent, DairaListComponent} from './components/daira.component';
import {JudicialFrameDetailComponent, JudicialFrameListComponent} from './components/judicial-frame.component';
import {DecisionMotiveDetailComponent, DecisionMotiveListComponent} from './components/decision-motive.component';
import {MotiveDetailComponent, MotiveListComponent} from './components/motive.component';
import {ContractMotiveDetailComponent, ContractMotiveListComponent} from './components/contract-motive.component';
import {ProjectTypeDetailComponent, ProjectTypeListComponent} from './components/project-type.component';
import {ProjectMotiveDetailComponent, ProjectMotiveListComponent} from './components/project-motive.component';
import {AwardProcedureDetailComponent, AwardProcedureListComponent} from './components/award.procedure.component';
import {TreasuryGroupDetailComponent, TreasuryGroupListComponent} from './components/treasury-group.component';
import {ArticleTypeDetailComponent, ArticleTypeListComponent} from './components/article-type.component';
import { BloodGroupDetailComponent, BloodGroupListComponent } from './components/blood-group-list.component';
import { VehicleTypeDetailComponent, VehicleTypeListComponent } from './components/vehicle-type.component';
import { FuelTypeDetailComponent, FuelTypeListComponent } from './components/fuel-type.component';
import { InsurancePolicyDetailComponent, InsurancePolicyListComponent } from './components/insurance-policy.component';
import { InsuranceAgencyDetailComponent, InsuranceAgencyListComponent } from './components/insurance-agency.component';
import { DestinationDetailComponent, DestinationListComponent } from './components/destination.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        MaterialModule,
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
        DepartmentListComponent,
        PunishmentTypeDetailComponent,
        PunishmentTypeListComponent,
        ProfessionalFaultListComponent,
        ProfessionalFaultDetailComponent,
        AppArchiveDocumentListComponent,
        AppArchiveDocumentDetailComponent,
        FurnitureStatusDetailComponent,
        FurnitureStatusListComponent,
        DiscountDetailComponent,
        DiscountListComponent,
        DairaListComponent,
        DairaDetailComponent,
        JudicialFrameDetailComponent,
        JudicialFrameListComponent,
        DecisionMotiveListComponent,
        DecisionMotiveDetailComponent,
        MotiveListComponent,
        MotiveDetailComponent,
        ContractMotiveDetailComponent,
        ContractMotiveListComponent,
        ProjectTypeDetailComponent,
        ProjectTypeListComponent,
        ProjectMotiveDetailComponent,
        ProjectMotiveListComponent,
        AwardProcedureDetailComponent,
        AwardProcedureListComponent,
        TreasuryGroupListComponent,
        TreasuryGroupDetailComponent,
        ArticleTypeListComponent,
        ArticleTypeDetailComponent,
        BloodGroupListComponent,
        BloodGroupDetailComponent,
        VehicleTypeListComponent,
        VehicleTypeDetailComponent,
        FuelTypeListComponent,
        FuelTypeDetailComponent,
        InsurancePolicyListComponent,
        InsurancePolicyDetailComponent,
        InsuranceAgencyListComponent,
        InsuranceAgencyDetailComponent,
        DestinationListComponent,
        DestinationDetailComponent
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
        DepartmentListComponent,
        PunishmentTypeDetailComponent,
        PunishmentTypeListComponent,
        ProfessionalFaultListComponent,
        ProfessionalFaultDetailComponent,
        AppArchiveDocumentListComponent,
        AppArchiveDocumentDetailComponent,
        FurnitureStatusDetailComponent,
        FurnitureStatusListComponent,
        DiscountDetailComponent,
        DiscountListComponent,
        DairaListComponent,
        DairaDetailComponent,
        JudicialFrameDetailComponent,
        JudicialFrameListComponent,
        DecisionMotiveListComponent,
        DecisionMotiveDetailComponent,
        MotiveListComponent,
        MotiveDetailComponent,
        ContractMotiveDetailComponent,
        ContractMotiveListComponent,
        ProjectTypeDetailComponent,
        ProjectTypeListComponent,
        ProjectMotiveDetailComponent,
        ProjectMotiveListComponent,
        AwardProcedureDetailComponent,
        AwardProcedureListComponent,
        CommonUiAutoCompleteModule,
        CommonUiConfirmationDialogModule,
        ArticleTypeListComponent,
        ArticleTypeDetailComponent,
        BloodGroupListComponent,
        BloodGroupDetailComponent,
        VehicleTypeListComponent,
        VehicleTypeDetailComponent,
        FuelTypeListComponent,
        FuelTypeDetailComponent,
        InsurancePolicyListComponent,
        InsurancePolicyDetailComponent,
        InsuranceAgencyListComponent,
        InsuranceAgencyDetailComponent
    ]
})
export class CommonUiLookupModule { }
