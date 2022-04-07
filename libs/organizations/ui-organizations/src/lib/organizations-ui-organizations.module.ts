import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsComponent } from './organizations/organizations.component';
import { OrgChartModule } from 'angular13-organization-chart';
import { OrganizationsDetailComponent } from './organizations/organizations-detail.component';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';

@NgModule({
    declarations: [
        OrganizationsComponent,
        OrganizationsDetailComponent
    ],
    imports: [
        CommonModule,
        CommonUiLangModule,
        OrgChartModule,
        MaterialModule,
        CommonUiImageInputModule
    ],
    exports: [OrganizationsComponent]
})
export class CommonUiOrganizationsModule { }
