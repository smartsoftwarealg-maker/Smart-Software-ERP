import {NgModule} from '@angular/core';
import {NavBarComponent} from './nav-bar.component';
import {MaterialModule} from '../material.module';
import {CommonModule} from '@angular/common';
import {LanguageModule, LoginModule, ThemeModule, SmartCommonModule} from 'smart-shared';
import {RouterModule} from '@angular/router';

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
