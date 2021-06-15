import {NgModule} from '@angular/core';
import {IndexComponent} from './index.component';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LoginModule, SmartCommonModule} from 'smart-shared';
import {NavService} from '../common/nav.service';
import {MaterialModule} from '../common/material.module';
import {BasicShellModule} from '../common/basic-shell/basic-shell.module';

const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports:
        [
            CommonModule,
            MaterialModule,
            LoginModule,
            BasicShellModule,
            SmartCommonModule,
            RouterModule.forChild(routes),
        ],
    declarations:
        [
            IndexComponent
        ],
    providers: [],
})
export class IndexModule {
    constructor(private navSrv: NavService) {
        const TAG = 'IndexModule';
        navSrv.setChildren(TAG, routes);
    }
}
