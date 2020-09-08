import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from '@ss/common/api-common';
import { LOGIN_URL } from '@ss/common/api-common';
import { Routes, RouterModule } from '@angular/router';
import { UiLangModule } from '@ss/common/ui-lang';
import { UiThemeModule } from '@ss/common/ui-theme';

const routes: Routes = [
    { path: LOGIN_URL, component: LoginComponent }
];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        UiLangModule,
        UiThemeModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ]
})
export class UiLoginModule { }
