import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleChartsModule } from 'angular-google-charts';
import { OrganizationsComponent } from './organizations.component';
import { OrgChartModule } from 'angular-org-chart';

@NgModule({
    declarations: [OrganizationsComponent],
    imports: [CommonModule, GoogleChartsModule, OrgChartModule],
})
export class CommonUiOrganizationsModule { }
