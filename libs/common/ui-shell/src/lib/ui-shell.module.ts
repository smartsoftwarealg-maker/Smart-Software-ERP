import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@ss/common/api-common';
import { UiLogoutModule } from '@ss/common/ui-logout';
import { UiLangModule } from '@ss/common/ui-lang';
import { UiThemeModule } from '@ss/common/ui-theme';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        UiLogoutModule,
        UiLangModule,
        UiThemeModule
    ],
    declarations: [
        ShellComponent
    ],
    exports: [
        ShellComponent
    ]
})
export class UiShellModule {
}
