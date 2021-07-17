import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { LanguageModule } from '../language/language.module';
import { CanActivateService } from './can-activte.service';
import { MaterialModule } from '../material.module';
import { ThemeModule } from '../theme/theme.module';
import { SmartCommonModule } from '../../common/smart-common.module';
import { RouterModule, Routes } from '@angular/router';
import { LOGIN_URL } from './login-constants';
import { DecService } from './dec.service';
import { LogoutComponent } from './logout.component';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { HttpClientModule } from '@angular/common/http';
import { LanguageService } from '@ss/common/api-common';

const routes: Routes = [
    { path: LOGIN_URL, component: LoginComponent }
];

@NgModule({
    imports:
        [
            CommonModule,
            FormsModule,
            MaterialModule,
            HttpClientModule,
            ThemeModule,
            LanguageModule,
            SmartCommonModule,
            RouterModule.forChild(routes),
            LoadingSpinnerModule
        ],
    declarations:
        [
            LoginComponent,
            LogoutComponent
        ],
    exports:
        [
            LoginComponent,
            LogoutComponent
        ],
    providers:
        [
            LoginService,
            CanActivateService,
            DecService
        ]
})

export class LoginModule {
    constructor(private langSrv: LanguageService) {
        langSrv.addSource('/assets/locale/lib/login/', 'LOGIN_');
    }
}
