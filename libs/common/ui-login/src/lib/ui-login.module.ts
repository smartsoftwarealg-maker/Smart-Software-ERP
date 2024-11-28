import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from '@ss/common/api-common';
import { LOGIN_URL } from '@ss/common/api-common';
import { Routes, RouterModule } from '@angular/router';

import { UiThemeModule } from '@ss/common/ui-theme';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';

const routes: Routes = [{ path: LOGIN_URL, component: LoginComponent }];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,

        UiThemeModule,
        RouterModule.forChild(routes),
        LoginComponent, EmployeeProfileComponent,
    ],
    exports: [LoginComponent],
})
export class UiLoginModule {}
