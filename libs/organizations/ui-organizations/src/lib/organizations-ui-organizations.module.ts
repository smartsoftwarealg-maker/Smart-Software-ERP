import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsComponent } from './organizations/organizations.component';
import { OrgChartModule } from 'angular13-organization-chart';
import { OrganizationsDetailComponent } from './organizations/organizations-detail.component';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { DivisionsListComponent } from './divisions/divisions-list.component';
import { UiPaginationModule } from '@ss/common/ui-pagination';

@NgModule({
    declarations: [
        OrganizationsComponent,
        OrganizationsDetailComponent,
        DivisionsListComponent,
    ],
    imports: [
        CommonModule,
        CommonUiLangModule,
        OrgChartModule,
        MaterialModule,
        CommonUiImageInputModule,
        UiPaginationModule
    ],
    exports: [
        OrganizationsComponent,
        DivisionsListComponent
    ]
})
export class CommonUiOrganizationsModule { }
