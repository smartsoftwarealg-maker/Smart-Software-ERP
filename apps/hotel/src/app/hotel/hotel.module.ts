import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LoginModule, SmartCommonModule} from 'smart-shared';
import {MaterialModule} from '../common/material.module';
import {defaultMenu, HotelComponent, routes} from './hotel.component';
import {
    LanguageService,
    FatalErrorModule,
} from 'smart-shared';
import {BasicShellModule} from '../common/basic-shell/basic-shell.module';

@NgModule({
    imports:
        [
            CommonModule,
            MaterialModule,
            LoginModule,
            FatalErrorModule,
            SmartCommonModule,
            BasicShellModule,
            RouterModule.forChild(routes)
        ],
    declarations:
        [
            HotelComponent
        ],
    providers: [],
})
export class HotelModule {
    constructor(private langSrv: LanguageService) {
        langSrv.addSource('/assets/locale/hotel/', 'HTL_');
    }
}
