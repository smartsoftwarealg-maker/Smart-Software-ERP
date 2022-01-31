import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleChartsModule } from 'angular-google-charts';
import { OrganizationsComponent } from './organizations.component';

@NgModule({
    declarations: [OrganizationsComponent],
    imports: [CommonModule, GoogleChartsModule],
})
export class CommonUiOrganizationsModule { }
