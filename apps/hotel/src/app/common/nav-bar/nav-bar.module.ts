import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SmartCommonModule } from '../../smart-lib/common/smart-common.module';
import { LanguageModule } from '../../smart-lib/components/language/language.module';
import { LoginModule } from '../../smart-lib/components/login/login.module';
import { ThemeModule } from '../../smart-lib/components/theme/theme.module';
import { MaterialModule } from '../../smart-lib/components/material.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        SmartCommonModule,
        LanguageModule,
        LoginModule,
        ThemeModule,
        RouterModule
    ],
    declarations: [
        NavBarComponent
    ],
    exports: [
        NavBarComponent
    ]
})
export class NavBarModule {
}
