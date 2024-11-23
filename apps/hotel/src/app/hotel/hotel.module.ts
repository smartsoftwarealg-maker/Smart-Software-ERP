import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavService } from '../common/nav.service';
import { defaultMenu, HotelComponent, routes } from './hotel.component';
import { BasicShellModule } from '../common/basic-shell/basic-shell.module';
import { CommonUiLangModule } from '@ss/common/ui-lang';

import { LoginModule } from '../smart-lib/components/login/login.module';

import { MaterialModule } from '../smart-lib/components/material.module';
import { LanguageService } from '@ss/common/api-common';
import { ReportsModule } from '../smart-lib/components/reports/reports.module'

@NgModule({
    imports: [
    CommonModule,
    MaterialModule,
    LoginModule,
    CommonUiLangModule,
    BasicShellModule,
    ReportsModule,
    RouterModule.forChild(routes),
    HotelComponent
],
    providers: [],
})
export class HotelModule {
    constructor(private navSrv: NavService,
        private langSrv: LanguageService) {
        const TAG = 'HotelModule';
        navSrv.setChildren(TAG, defaultMenu);
        langSrv.addSource('assets/locale/hotel/', 'HTL_');
    }
}
