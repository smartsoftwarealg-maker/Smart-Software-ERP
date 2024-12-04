import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "@ss/common/api-common";
import {ReactiveFormsModule} from "@angular/forms";
import {CompanyDetailComponent} from "./company-detail.component";
import {CompanyListComponent} from "./company-list.component";


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        CompanyListComponent,
        CompanyDetailComponent
    ],
    exports: []
})
export class AdministrationUiCompanyModule {}
