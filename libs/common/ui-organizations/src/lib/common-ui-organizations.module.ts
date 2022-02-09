import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsComponent } from './organizations.component';
import { OrgChartModule } from 'angular13-organization-chart';
import { OrganizationsDetailComponent } from './organizations-detail.component';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MaterialModule } from '@ss/common/api-common';

@NgModule({
    declarations: [
        OrganizationsComponent,
        OrganizationsDetailComponent
    ],
    imports: [
        CommonModule,
        CommonUiLangModule,
        OrgChartModule,
        MaterialModule
    ],
    exports: [OrganizationsComponent]
})
export class CommonUiOrganizationsModule { }
