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
import { DivisionDetailComponent } from './divisions/division-detail.component';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { RouterModule } from '@angular/router';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';

@NgModule({
    declarations: [
        OrganizationsComponent,
        OrganizationsDetailComponent,
        DivisionsListComponent,
        DivisionDetailComponent
    ],
    imports: [
        CommonModule,
        CommonUiLangModule,
        OrgChartModule,
        MaterialModule,
        CommonUiImageInputModule,
        CommonUiAutoCompleteModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        RouterModule
    ],
    exports: [
        OrganizationsComponent,
        DivisionsListComponent,
        DivisionDetailComponent
    ]
})
export class CommonUiOrganizationsModule { }
