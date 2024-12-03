import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from '@ss/common/api-common';
import { LOGIN_URL } from '@ss/common/api-common';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeProfileComponent } from '@ss/common/ui-login';

const routes: Routes = [{ path: LOGIN_URL, component: LoginComponent }];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),
        LoginComponent, EmployeeProfileComponent,
    ],
    exports: [LoginComponent],
})
export class UiLoginModule {}
